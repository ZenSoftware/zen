import { exec } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import * as path from 'node:path';
import { promisify } from 'node:util';

import { Generator as PalGenerator } from '@paljs/generator';
import { Config as PalConfig } from '@paljs/types';
import { glob } from 'glob';

import {
  CaslPrismaSubjectsTemplate,
  ClientFieldsTemplate,
  ClientQueriesTemplate,
  DefaultFieldsTemplate,
  GraphQLApiIndexTemplate,
  GraphQLPrismaIndexTemplate,
  GraphQLResolversABACTemplate,
  GraphQLResolversRBACTemplate,
  GraphQLSchemaExtensionsTemplate,
  PaljsTypeDefsTemplate,
} from './templates';

const execAsync = promisify(exec);

export type ZenGeneratorConfig = {
  palConfig: PalConfig;
  prismaClientPath: string;
  /** [GitHub Issue: createManyAndReturn types not what Pal.js is expecting](https://github.com/paljs/prisma-tools/issues/335#issuecomment-2155972868) */
  pal7Fix?: boolean;
  apiOutPath: string;
  auth?: {
    /**
     * The authorization scheme to utilize for the generated GraphQL resolvers.
     * 'ABAC' is experimental due to requiring a way to recursively validate dynamic Prisma queries with nested get & create operations.
     * The industry does not have a solution to authorize dynamic queries with nested operations yet and thus `'RBAC'` is the default.
     * With `'RBAC'`, users will require the `defaultRBACRole` role for access to any of the generated Prisma GraphQL resolvers.
     * The generated GraphQL resolvers do not overwrite if the file already exists, thus further customization can be applied to the GraphQL resolvers.
     *
     * @default 'RBAC'
     */
    scheme: 'RBAC' | 'ABAC';

    /** @default 'Prisma' */
    defaultRBACRole?: string;
  };
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
    const palConfig = this.config.palConfig;
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

    const schemaExtensionsPath = path.join(palOutPath, 'SchemaExtensions.ts');
    await writeFile(schemaExtensionsPath, GraphQLSchemaExtensionsTemplate(prismaNames));
    console.log(`- Wrote: ${schemaExtensionsPath}`);

    if (this.config.pal7Fix) {
      /** Fix for missing `createManyAndReturn` type */
      const prismaTypeFilePath = this.config.prismaClientPath + '/index.d.ts';
      const prismaTypeFile = (await readFile(prismaTypeFilePath)).toString();
      const prismaNamespaceTemplate = 'export namespace Prisma {';
      const prismaNamespaceIndex =
        prismaTypeFile.indexOf(prismaNamespaceTemplate) + prismaNamespaceTemplate.length;
      let prismaTypeFileFirstHalf = prismaTypeFile.slice(0, prismaNamespaceIndex);
      let prismaTypeFileSecondHalf = prismaTypeFile.slice(prismaNamespaceIndex);

      prismaTypeFileFirstHalf += '\n';

      for (const typeName of prismaNames) {
        const createManyTemplate = `  export type CreateMany${typeName}AndReturnOutputType = Prisma.PrismaPromise<$Result.GetResult<Prisma.$${typeName}Payload<ExtArgs>, T, 'createManyAndReturn'>>;\n`;
        prismaTypeFileFirstHalf += createManyTemplate;
      }

      const prismaTypeFileReConcatenated = prismaTypeFileFirstHalf + prismaTypeFileSecondHalf;
      await writeFile(prismaTypeFilePath, prismaTypeFileReConcatenated);
      console.log(`- Wrote fix for createManyAndReturn in: ${prismaTypeFilePath}`);
    }
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
    if (this.config.auth.scheme === 'ABAC') {
      for (const prismaName of prismaNames) {
        const outFile = path.join(prismaResolversPath, `${prismaName}.ts`);

        if (!existsSync(outFile)) {
          await writeFile(outFile, GraphQLResolversABACTemplate(prismaName));
          console.log(`- Wrote: ${outFile}`);
          wroteCount++;
        }
      }
    } else {
      for (const prismaName of prismaNames) {
        const outFile = path.join(prismaResolversPath, `${prismaName}.ts`);

        if (!existsSync(outFile)) {
          await writeFile(
            outFile,
            GraphQLResolversRBACTemplate(prismaName, this.config.auth?.defaultRBACRole ?? 'Prisma')
          );
          console.log(`- Wrote: ${outFile}`);
          wroteCount++;
        }
      }
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

      for (const prismaName of prismaNames) {
        const fieldsOutPath = path.join(fieldsPath, `${prismaName}.gql.ts`);
        const queriesOutPath = path.join(queriesPath, `${prismaName}.gql.ts`);

        if (!existsSync(fieldsOutPath)) {
          await writeFile(fieldsOutPath, ClientFieldsTemplate(prismaName));
          console.log(`- Wrote: ${fieldsOutPath}`);
        }

        await writeFile(
          queriesOutPath,
          ClientQueriesTemplate(prismaName, this.config.frontend.fieldsFolderName)
        );
        console.log(`- Wrote: ${queriesOutPath}`);
      }

      // Build frontend fields index.ts file
      let fieldsIndexSource = '';
      let fieldsFileNames = await this.getFileNames(fieldsPath);
      fieldsFileNames = fieldsFileNames.sort();
      for (let fileName of fieldsFileNames) {
        fieldsIndexSource += `export * from './${fileName}';\n`;
      }
      const fieldsIndexPath = path.join(fieldsPath, `index.ts`);
      await writeFile(fieldsIndexPath, fieldsIndexSource);
      console.log(`- Wrote: ${fieldsIndexPath}`);
    }
  }

  /**
   * Get the type names via the filename of the `resolvers` directory
   */
  async getFileNames(directory: string) {
    return (await readdir(directory, { withFileTypes: true }))
      .filter(dirent => dirent.isFile())
      .filter(f => {
        const fileName = path.basename(f.name);
        return (
          fileName !== 'index.ts' &&
          !fileName.endsWith('.spec.ts') &&
          !fileName.endsWith('.test.ts')
        );
      })
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
