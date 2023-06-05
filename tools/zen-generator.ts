import { exec } from 'node:child_process';
import { existsSync } from 'node:fs';
import { appendFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import * as path from 'node:path';
import { promisify } from 'node:util';

import { Generator as PalGenerator } from '@paljs/generator';
import { Config as PalConfig } from '@paljs/types';
import glob from 'glob-promise';

import {
  CaslPrismaSubjectsTemplate,
  ClientFieldsTemplate,
  ClientQueriesTemplate,
  DefaultFieldsTemplate,
  GraphQLApiIndexTemplate,
  GraphQLPrismaIndexTemplate,
  GraphQLResolversABACTemplate,
  GraphQLResolversRBACTemplate,
  PaljsTypeDefsTemplate,
} from './templates';

const execAsync = promisify(exec);

export type ZenGeneratorConfig = {
  palConfig: PalConfig;
  apiOutPath: string;
  /**
   * The authorization scheme to utilize for the generated resolvers.
   * 'ABAC' is experimental due to requiring a way to recursively validate dynamic Prisma queries with nested get & create operations.
   * The industry does not have a solution to authorize dynamic queries with nested get & create operations yet and thus `'RBAC'` is the default.
   * With `'RBAC'`, users will require the `'Prisma'` role for access to any of the generated Prisma GraphQL resolvers.
   * This makes the API clear for what is accessible and what is not.
   * The Prisma resolvers are endpoints into your database and generally should not be exposed to the public.
   * Though, there are applications for trusted internal services and end-to-end type generation.
   *
   * @default 'RBAC'
   */
  authScheme?: 'RBAC' | 'ABAC';
  caslSubjectsOutFile?: string;
  defaultFieldsOutFile?: string;
  frontend?: {
    outPath: string;
    /** @default 'fields' */
    fieldsFolderName?: string;
    /** @default 'prisma' */
    queriesFolderName?: string;
  };
};

export class ZenGenerator {
  constructor(public config: ZenGeneratorConfig) {}

  async run() {
    console.log(`------------------------ @paljs/generator ------------------------`);
    const palConfig = this.config.palConfig as any;
    const palOutPath = palConfig.backend.output
      ? palConfig.backend.output
      : path.join(this.config.apiOutPath, 'paljs');

    if (existsSync(palOutPath)) {
      await rm(palOutPath, { recursive: true });
    }

    const pal = new PalGenerator(
      { name: palConfig.backend.generator, schemaPath: palConfig.schema },
      palConfig.backend
    );
    await pal.run();

    // Remove the `resolvers.ts` files
    const resolversGlob = path.join(palOutPath, '**/resolvers.ts').replaceAll('\\', '/');
    const resolversFiles = await glob(resolversGlob);
    for (const file of resolversFiles) {
      await rm(file);
    }

    console.log(`- Wrote: ${palOutPath}`);

    // Replace '@prisma/client' path with '../prisma'
    const resolverTypesPath = path.join(palOutPath, '../resolversTypes.ts');
    const resolverTypesOriginal = (await readFile(resolverTypesPath)).toString();
    const resolverTypesUpdated =
      resolverTypesOriginal.slice(0, 25) + '../prisma' + resolverTypesOriginal.slice(39);
    await writeFile(resolverTypesPath, resolverTypesUpdated);
    console.log(`- Wrote: ${resolverTypesPath}`);

    // Get Prisma type names via the directory names under the 'paljs' folder;
    const dirents = await readdir(palOutPath, { withFileTypes: true });
    let prismaNames = dirents.filter(d => d.isDirectory()).map(d => d.name);
    prismaNames = prismaNames.sort();

    const palTypeDefsFilePath = path.join(palOutPath, 'typeDefs.ts');
    await writeFile(palTypeDefsFilePath, PaljsTypeDefsTemplate(prismaNames));
    console.log(`- Wrote: ${palTypeDefsFilePath}`);

    console.log(`---------------- Nest GraphQL resolvers generated ----------------`);
    const apiResolversPath = path.join(this.config.apiOutPath, 'resolvers');
    if (!existsSync(apiResolversPath)) {
      await mkdir(apiResolversPath);
    }

    const prismaResolversPath = path.join(apiResolversPath, 'prisma');
    if (!existsSync(prismaResolversPath)) {
      await mkdir(prismaResolversPath);
    }

    let wroteCount = 0;
    if (this.config.authScheme === 'ABAC') {
      wroteCount = await this.prismaResolvers(
        prismaNames,
        prismaResolversPath,
        GraphQLResolversABACTemplate
      );
    } else {
      wroteCount = await this.prismaResolvers(
        prismaNames,
        prismaResolversPath,
        GraphQLResolversRBACTemplate
      );
    }
    console.log(`* Total resolver files wrote: ${wroteCount}`);

    let prismaIndexFileNames = await this.getFileNames(prismaResolversPath);
    const prismaIndexPath = path.join(prismaResolversPath, 'index.ts');
    await writeFile(prismaIndexPath, GraphQLPrismaIndexTemplate(prismaIndexFileNames));
    console.log(`- Wrote: ${prismaIndexPath}`);

    let apiIndexFileNames = await this.getFileNames(apiResolversPath);
    const apiIndexPath = path.join(apiResolversPath, 'index.ts');
    await writeFile(apiIndexPath, GraphQLApiIndexTemplate(apiIndexFileNames));
    console.log(`- Wrote: ${apiIndexPath}`);

    if (this.config.caslSubjectsOutFile) {
      await writeFile(this.config.caslSubjectsOutFile, CaslPrismaSubjectsTemplate(prismaNames));
      console.log(`- Wrote: ${this.config.caslSubjectsOutFile}`);
    }

    if (this.config.defaultFieldsOutFile) {
      await writeFile(this.config.defaultFieldsOutFile, DefaultFieldsTemplate(prismaNames));
      console.log(`- Wrote: ${this.config.defaultFieldsOutFile}`);
    }

    await this.execLocal(`prettier --loglevel warn --write "${this.config.apiOutPath}/**/*.ts"`);

    await this.generateFrontend(prismaNames);
  }

  async generateFrontend(prismaNames: string[]) {
    if (this.config.frontend) {
      console.log(`----------------------- Frontend generated -----------------------`);
      if (!this.config.frontend.fieldsFolderName) {
        this.config.frontend.fieldsFolderName = 'fields';
      }

      if (!this.config.frontend.queriesFolderName) {
        this.config.frontend.queriesFolderName = 'prisma';
      }

      const fieldsPath = path.join(
        this.config.frontend.outPath,
        this.config.frontend.fieldsFolderName
      );

      const queriesPath = path.join(
        this.config.frontend.outPath,
        this.config.frontend.queriesFolderName
      );

      if (!existsSync(fieldsPath)) await mkdir(fieldsPath);
      if (!existsSync(queriesPath)) await mkdir(queriesPath);

      const fieldsIndexPath = path.join(fieldsPath, `index.ts`);

      if (!existsSync(fieldsIndexPath)) {
        await writeFile(fieldsIndexPath, '');
        console.log(`- Wrote: ${fieldsIndexPath}`);
      }

      let fieldsIndexSource = (await readFile(fieldsIndexPath)).toString();

      for (const prismaName of prismaNames) {
        const fieldsOutPath = path.join(fieldsPath, `${prismaName}.gql.ts`);
        const queriesOutPath = path.join(queriesPath, `${prismaName}.gql.ts`);

        if (!existsSync(fieldsOutPath)) {
          await writeFile(fieldsOutPath, ClientFieldsTemplate(prismaName));
          console.log(`- Wrote: ${fieldsOutPath}`);
        }

        const exportScript = `export * from './${prismaName}.gql';`;
        if (!fieldsIndexSource.includes(exportScript)) {
          await appendFile(fieldsIndexPath, exportScript + '/n');
          fieldsIndexSource += exportScript + '/n';
        }

        await writeFile(
          queriesOutPath,
          ClientQueriesTemplate(prismaName, this.config.frontend.fieldsFolderName)
        );
        console.log(`- Wrote: ${queriesOutPath}`);
      }
    }
  }

  async prismaResolvers(
    prismaNames: string[],
    outPath: string,
    template: (prismaName: string) => string
  ) {
    let wroteCount = 0;
    for (const prismaName of prismaNames) {
      const outFile = path.join(outPath, `${prismaName}.ts`);

      if (!existsSync(outFile)) {
        await writeFile(outFile, template(prismaName));
        console.log(`- Wrote: ${outFile}`);
        wroteCount++;
      }
    }

    return wroteCount;
  }

  /**
   * Get the type names via the filename of the `resolvers` directory
   */
  async getFileNames(directory: string) {
    return (await readdir(directory, { withFileTypes: true }))
      .filter(dirent => dirent.isFile())
      .filter(
        f =>
          path.basename(f.name) !== 'index.ts' &&
          !path.basename(f.name).endsWith('.spec.ts') &&
          !path.basename(f.name).endsWith('.test.ts')
      )
      .map(f => path.basename(f.name, '.ts')); // Remove `.ts` extension
  }

  private execLocal(command: string) {
    console.log(command);
    return execAsync('npx ' + command).then(({ stdout, stderr }) => {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
    });
  }
}
