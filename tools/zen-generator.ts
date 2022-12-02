import { exec } from 'child_process';
import * as fs from 'fs';
import { appendFile, mkdir, readFile, readdir, rm, writeFile } from 'fs/promises';
import * as path from 'path';
import { promisify } from 'util';

import { Generator as PalGenerator } from '@paljs/generator';
import { Config as PalConfig } from '@paljs/types';

import {
  ClientFieldsTemplate,
  ClientQueriesTemplate,
  NestCaslTemplate,
  NestResolversABACTemplate,
  NestResolversIndexTemplate,
  NestResolversRBACTemplate,
  TypeDefsTemplate,
} from './templates';

const execAsync = promisify(exec);

export type ZenGeneratorConfig = {
  palConfig: PalConfig;
  apiOutPath: string;
  caslOutFile?: string;
  authScheme?: 'ABAC' | 'RBAC';
  frontend?: {
    outPath: string;
    /** Defaults to 'fields' */
    fieldsFolderName?: string;
    /** Defaults to 'prisma' */
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
    palConfig.backend.output = palOutPath;

    if (fs.existsSync(palOutPath)) {
      await rm(palOutPath, { recursive: true });
      await mkdir(palOutPath);
    }

    const pal = new PalGenerator(
      { name: palConfig.backend.generator, schemaPath: palConfig.schema },
      palConfig.backend
    );
    await pal.run();
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
    await writeFile(palTypeDefsFilePath, TypeDefsTemplate(prismaNames));
    console.log(`- Wrote: ${palTypeDefsFilePath}`);

    console.log(`---------------- Nest GraphQL resolvers generated ----------------`);
    const nestResolversPath = path.join(this.config.apiOutPath, 'resolvers');

    if (!fs.existsSync(nestResolversPath)) {
      await mkdir(nestResolversPath);
    }

    let wroteCount = 0;
    if (!this.config.authScheme || this.config.authScheme === 'ABAC') {
      if (this.config.caslOutFile) {
        await writeFile(this.config.caslOutFile, NestCaslTemplate(prismaNames));
        console.log(`- Wrote: ${this.config.caslOutFile}`);
      }

      wroteCount = await this.nestAbacResolvers(prismaNames);
    } else if (this.config.authScheme === 'RBAC') {
      wroteCount = await this.nestRbacResolvers(prismaNames);
    }

    console.log(`* Total resolver files wrote: ${wroteCount}`);

    // Get the data type names via the filename of the "resolvers" directory
    let dataTypeNames = (await readdir(nestResolversPath))
      .filter(f => path.basename(f) !== 'index.ts')
      .map(f => path.basename(f, '.ts')); // Remove ".ts" extension from all names

    const indexPath = path.join(nestResolversPath, 'index.ts');
    await writeFile(indexPath, NestResolversIndexTemplate(dataTypeNames));
    console.log(`- Wrote: ${indexPath}`);

    await this.execLocal(`prettier --loglevel warn --write "${this.config.apiOutPath}/**/*.ts"`);

    await this.generateFrontend(prismaNames);
  }

  async generateFrontend(prismaNames: string[]) {
    if (this.config.frontend) {
      console.log(`----------------------- Front end generated ----------------------`);
      const fieldsPath = this.config.frontend.fieldsFolderName
        ? path.join(this.config.frontend.outPath, this.config.frontend.fieldsFolderName)
        : path.join(this.config.frontend.outPath, 'fields');

      const queriesPath = this.config.frontend.queriesFolderName
        ? path.join(this.config.frontend.outPath, this.config.frontend.queriesFolderName)
        : path.join(this.config.frontend.outPath, 'prisma');

      if (!fs.existsSync(fieldsPath)) await mkdir(fieldsPath);
      if (!fs.existsSync(queriesPath)) await mkdir(queriesPath);

      const fieldsIndexPath = path.join(fieldsPath, `index.ts`);

      if (!fs.existsSync(fieldsIndexPath)) {
        await writeFile(fieldsIndexPath, '');
        console.log(`- Wrote: ${fieldsIndexPath}`);
      }

      let fieldsIndexSource = (await readFile(fieldsIndexPath)).toString();

      for (const prismaName of prismaNames) {
        const fieldsOutPath = path.join(fieldsPath, `${prismaName}.gql.ts`);
        const queriesOutPath = path.join(queriesPath, `${prismaName}.gql.ts`);

        if (!fs.existsSync(fieldsOutPath)) {
          await writeFile(fieldsOutPath, ClientFieldsTemplate(prismaName));
          console.log(`- Wrote: ${fieldsOutPath}`);
        }

        const exportScript = `export * from './${prismaName}.gql';`;
        if (!fieldsIndexSource.includes(exportScript)) {
          await appendFile(fieldsIndexPath, exportScript + '\n');
          fieldsIndexSource += exportScript + '\n';
        }

        const fieldsFolderName = this.config.frontend.fieldsFolderName
          ? this.config.frontend.fieldsFolderName
          : 'fields';
        await writeFile(queriesOutPath, ClientQueriesTemplate(prismaName, fieldsFolderName));
        console.log(`- Wrote: ${queriesOutPath}`);
      }
    }
  }

  async nestAbacResolvers(prismaNames: string[]) {
    let wroteCount = 0;
    for (const prismaName of prismaNames) {
      const outPath = path.join(this.config.apiOutPath, 'resolvers', `${prismaName}.ts`);

      if (!fs.existsSync(outPath)) {
        await writeFile(outPath, NestResolversABACTemplate(prismaName));
        console.log(`- Wrote: ${outPath}`);
        wroteCount++;
      }
    }

    return wroteCount;
  }

  async nestRbacResolvers(prismaNames: string[]) {
    let wroteCount = 0;
    for (const prismaName of prismaNames) {
      const outPath = path.join(this.config.apiOutPath, 'resolvers', `${prismaName}.ts`);

      if (!fs.existsSync(outPath)) {
        await writeFile(outPath, NestResolversRBACTemplate(prismaName));
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
