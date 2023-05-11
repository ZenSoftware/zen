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
  GraphQLIndexTemplate,
  GraphQLResolversTemplate,
  PaljsTypeDefsTemplate,
} from './templates';

const execAsync = promisify(exec);

export type ZenGeneratorConfig = {
  palConfig: PalConfig;
  apiOutPath: string;
  caslSubjectsOutFile?: string;
  defaultFieldsOutFile?: string;
  frontend?: {
    outPath: string;
    /** @defaults 'fields' */
    fieldsFolderName?: string;
    /** @defaults 'prisma' */
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
    const nestResolversPath = path.join(this.config.apiOutPath, 'resolvers');

    if (!existsSync(nestResolversPath)) {
      await mkdir(nestResolversPath);
    }

    if (this.config.caslSubjectsOutFile) {
      await writeFile(this.config.caslSubjectsOutFile, CaslPrismaSubjectsTemplate(prismaNames));
      console.log(`- Wrote: ${this.config.caslSubjectsOutFile}`);
    }

    if (this.config.defaultFieldsOutFile) {
      await writeFile(this.config.defaultFieldsOutFile, DefaultFieldsTemplate(prismaNames));
      console.log(`- Wrote: ${this.config.defaultFieldsOutFile}`);
    }

    const wroteCount = await this.nestAbacResolvers(prismaNames);

    // Get the type names via the filename of the `resolvers` directory
    let indexTypeNames = (await readdir(nestResolversPath))
      .filter(
        f =>
          path.basename(f) !== 'index.ts' &&
          !path.basename(f).endsWith('.spec.ts') &&
          !path.basename(f).endsWith('.test.ts')
      )
      .map(f => path.basename(f, '.ts')); // Remove `.ts` extension

    const indexPath = path.join(nestResolversPath, 'index.ts');
    await writeFile(indexPath, GraphQLIndexTemplate(indexTypeNames));
    console.log(`- Wrote: ${indexPath}`);
    console.log(`* Total resolver files wrote: ${wroteCount}`);

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

  async nestAbacResolvers(prismaNames: string[]) {
    let wroteCount = 0;
    for (const prismaName of prismaNames) {
      const outPath = path.join(this.config.apiOutPath, 'resolvers', `${prismaName}.ts`);

      if (!existsSync(outPath)) {
        await writeFile(outPath, GraphQLResolversTemplate(prismaName));
        console.log(`- Wrote: ${outPath}`);
        wroteCount++;
      }
    }

    return wroteCount;
  }

  private execLocal(command: string) {
    console.log(command);
    return execAsync('npx ' + command).then(({ stdout, stderr }) => {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
    });
  }
}
