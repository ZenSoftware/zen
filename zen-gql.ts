import { exec } from 'child_process';
import * as fs from 'fs';
import { appendFile, mkdir, readFile, readdir, rm, writeFile } from 'fs/promises';
import * as path from 'path';
import { promisify } from 'util';

import { Generator as PalGenerator } from '@paljs/generator';

import {
  ClientFieldsTemplate,
  ClientQueriesTemplate,
  NestCaslTemplate,
  NestResolversABACTemplate,
  NestResolversIndexTemplate,
  NestResolversRBACTemplate,
} from './tools/codegen-templates';

const paljsConfig = require('./pal.js');

const execAsync = promisify(exec);

type AuthScheme = 'ABAC' | 'RBAC';

//=============================================================================
/**
 * Configuration
 **/
const CONFIG = {
  gql: {
    authScheme: <AuthScheme>'ABAC',
    apiPath: 'apps/api/src/app/graphql',
    clientPrismaPath: 'libs/graphql/src/lib/prisma',
    clientFieldsPath: 'libs/graphql/src/lib/fields',
  },

  caslPath: 'apps/api/src/app/auth/casl/generated.ts',
};

export class Generator {
  constructor(public config: any) {}

  //---------------------------------------------------------------------------
  async createApolloAngularPrismaFile(prismaNames: string[]) {
    console.log(`------------ Apollo client queries & fields generated ------------`);

    const fieldsIndexPath = path.join(this.config.gql.clientFieldsPath, `index.ts`);

    if (!fs.existsSync(fieldsIndexPath)) {
      await writeFile(fieldsIndexPath, '');
      console.log(`- Wrote: ${fieldsIndexPath}`);
    }

    let fieldsIndexSource = (await readFile(fieldsIndexPath)).toString();

    for (const prismaName of prismaNames) {
      const prismaPath = path.join(this.config.gql.clientPrismaPath, `${prismaName}.gql.ts`);
      const fieldsPath = path.join(this.config.gql.clientFieldsPath, `${prismaName}.gql.ts`);

      if (!fs.existsSync(fieldsPath)) {
        await writeFile(fieldsPath, ClientFieldsTemplate(prismaName));
        console.log(`- Wrote: ${fieldsPath}`);
      }

      const exportScript = `export * from './${prismaName}.gql';`;
      if (!fieldsIndexSource.includes(exportScript)) {
        await appendFile(fieldsIndexPath, exportScript + '\n');
        fieldsIndexSource += exportScript + '\n';
      }

      if (!fs.existsSync(prismaPath)) {
        await writeFile(prismaPath, ClientQueriesTemplate(prismaName));
        console.log(`- Wrote: ${prismaPath}`);
      }
    }
  }
  //---------------------------------------------------------------------------
  async generate() {
    const PALJS_PATH = paljsConfig.backend.output;
    const RESOLVERS_PATH = `${this.config.gql.apiPath}/resolvers`;

    console.log(`---------------------- @paljs/cli generated ----------------------`);
    if (fs.existsSync(PALJS_PATH)) {
      await rm(PALJS_PATH, { recursive: true });
      await mkdir(PALJS_PATH);
    }

    const pal = new PalGenerator(
      { name: paljsConfig.backend.generator, schemaPath: paljsConfig.schema },
      paljsConfig.backend
    );
    await pal.run();

    /**
     * Insert `doNotUseFieldUpdateOperationsInput: true` into generated PalJS `typeDefs.ts` file
     * Refer to: [PalJS GraphQL SDL inputs](https://paljs.com/plugins/sdl-inputs/)
     */
    if (paljsConfig.backend.doNotUseFieldUpdateOperationsInput) {
      const paljsTypeDefsFilePath = path.join(PALJS_PATH, 'typeDefs.ts');
      const palTypeDefsFile = await readFile(paljsTypeDefsFilePath);
      const palTypeDefsFileUpdated = palTypeDefsFile
        .toString()
        .replace('sdlInputs()', 'sdlInputs({ doNotUseFieldUpdateOperationsInput: true })');
      await writeFile(paljsTypeDefsFilePath, palTypeDefsFileUpdated);
    }

    console.log(`---------------- Nest GraphQL resolvers generated ----------------`);
    if (!fs.existsSync(RESOLVERS_PATH)) {
      await mkdir(RESOLVERS_PATH);
    }
    if (!fs.existsSync(this.config.gql.clientFieldsPath)) {
      await mkdir(this.config.gql.clientFieldsPath);
    }
    if (!fs.existsSync(this.config.gql.clientPrismaPath)) {
      await mkdir(this.config.gql.clientPrismaPath);
    }

    // Get Prisma type names via the directory names under the 'prisma' folder;
    const dirents = await readdir(PALJS_PATH, { withFileTypes: true });
    let prismaNames = dirents.filter(d => d.isDirectory()).map(d => d.name);
    prismaNames = prismaNames.sort();

    let wroteCount = 0;
    if (this.config.gql.authScheme === 'ABAC') {
      // Generate Casl Subject types
      await writeFile(this.config.caslPath, NestCaslTemplate(prismaNames));
      console.log(`- Wrote: ${this.config.caslPath}`);

      wroteCount = await this.nestAbacResolvers(prismaNames);
    } else if (this.config.gql.authScheme === 'RBAC') {
      wroteCount = await this.nestRbacResolvers(prismaNames);
    }

    console.log(`* Total resolver files wrote: ${wroteCount}`);

    // Get the data type names via the filename of the "resolvers" directory
    let dataTypeNames = (await readdir(RESOLVERS_PATH))
      .filter(f => path.basename(f) !== 'index.ts')
      .map(f => path.basename(f, '.ts')); // Remove ".ts" extension from all names

    const indexPath = `${RESOLVERS_PATH}/index.ts`;
    await writeFile(indexPath, NestResolversIndexTemplate(dataTypeNames));
    console.log(`- Wrote: ${indexPath}\n`);

    await this.execLocal(`prettier --loglevel warn --write "${this.config.gql.apiPath}/**/*.ts"\n`);

    await this.createApolloAngularPrismaFile(prismaNames);
  }
  //---------------------------------------------------------------------------
  async nestAbacResolvers(prismaNames: string[]) {
    let wroteCount = 0;
    for (const prismaName of prismaNames) {
      const outPath = path.join(
        __dirname,
        this.config.gql.apiPath,
        'resolvers',
        `${prismaName}.ts`
      );

      // Guard to prevent the overwriting of existing files
      if (!fs.existsSync(outPath)) {
        await writeFile(outPath, NestResolversABACTemplate(prismaName));
        console.log(`- Wrote: ${outPath}`);
        wroteCount++;
      }
    }

    return wroteCount;
  }
  //---------------------------------------------------------------------------
  async nestRbacResolvers(prismaNames: string[]) {
    let wroteCount = 0;
    for (const prismaName of prismaNames) {
      const outPath = path.join(
        __dirname,
        this.config.gql.apiPath,
        'resolvers',
        `${prismaName}.ts`
      );

      // Guard to prevent the overwriting of existing files
      if (!fs.existsSync(outPath)) {
        await writeFile(outPath, NestResolversRBACTemplate(prismaName));
        console.log(`- Wrote: ${outPath}`);
        wroteCount++;
      }
    }

    return wroteCount;
  }
  //---------------------------------------------------------------------------
  private execLocal(command: string) {
    console.log(command);
    return execAsync('npx --no-install ' + command).then(({ stdout, stderr }) => {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
    });
  }
}

//=============================================================================
/**
 * Main
 **/
async function main() {
  const generator = new Generator(CONFIG);
  generator.generate();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
