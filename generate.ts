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
} from './tools/codegen-templates';

const execAsync = promisify(exec);

/**
 * Configuration
 **/
export type GeneratorConfig = {
  palConfig: PalConfig;
  apiOutPath: string;
  caslOutFile?: string;
  authScheme?: 'ABAC' | 'RBAC';
  frontend?: {
    prismaOutPath: string;
    fieldsOutPath: string;
  };
};

const CONFIG: GeneratorConfig = {
  palConfig: require('./pal.js'),
  apiOutPath: 'apps/api/src/app/graphql',
  caslOutFile: 'apps/api/src/app/auth/casl/generated.ts',
  frontend: {
    prismaOutPath: 'libs/graphql/src/lib/prisma',
    fieldsOutPath: 'libs/graphql/src/lib/fields',
  },
};
/**
 * Generator
 **/
export class Generator {
  constructor(public config: GeneratorConfig) {}

  async generate() {
    const palConfig = this.config.palConfig as any;
    const PAL_OUT_PATH = palConfig.backend.output;
    const RESOLVERS_PATH = `${this.config.apiOutPath}/resolvers`;

    console.log(`------------------------ @paljs/generator ------------------------`);
    if (fs.existsSync(PAL_OUT_PATH)) {
      await rm(PAL_OUT_PATH, { recursive: true });
      await mkdir(PAL_OUT_PATH);
    }

    const pal = new PalGenerator(
      { name: palConfig.backend.generator, schemaPath: palConfig.schema },
      palConfig.backend
    );
    await pal.run();

    /**
     * Insert `doNotUseFieldUpdateOperationsInput: true` into generated PalJS `typeDefs.ts` file
     * Refer to: [PalJS GraphQL SDL inputs](https://paljs.com/plugins/sdl-inputs/)
     */
    if (palConfig.backend.doNotUseFieldUpdateOperationsInput) {
      const palTypeDefsFilePath = path.join(PAL_OUT_PATH, 'typeDefs.ts');
      const palTypeDefsFile = await readFile(palTypeDefsFilePath);
      const palTypeDefsFileUpdated = palTypeDefsFile
        .toString()
        .replace('sdlInputs()', 'sdlInputs({ doNotUseFieldUpdateOperationsInput: true })');
      await writeFile(palTypeDefsFilePath, palTypeDefsFileUpdated);
    }

    console.log(`- Wrote: ${this.config.palConfig.backend?.output}`);

    console.log(`---------------- Nest GraphQL resolvers generated ----------------`);
    if (!fs.existsSync(RESOLVERS_PATH)) {
      await mkdir(RESOLVERS_PATH);
    }

    // Get Prisma type names via the directory names under the 'prisma' folder;
    const dirents = await readdir(PAL_OUT_PATH, { withFileTypes: true });
    let prismaNames = dirents.filter(d => d.isDirectory()).map(d => d.name);
    prismaNames = prismaNames.sort();

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
    let dataTypeNames = (await readdir(RESOLVERS_PATH))
      .filter(f => path.basename(f) !== 'index.ts')
      .map(f => path.basename(f, '.ts')); // Remove ".ts" extension from all names

    const indexPath = `${RESOLVERS_PATH}/index.ts`;
    await writeFile(indexPath, NestResolversIndexTemplate(dataTypeNames));
    console.log(`- Wrote: ${indexPath}`);

    await this.execLocal(`prettier --loglevel warn --write "${this.config.apiOutPath}/**/*.ts"\n`);

    await this.generateFrontend(prismaNames);
  }

  async generateFrontend(prismaNames: string[]) {
    if (this.config.frontend) {
      console.log(`----------------------- Front end generated ----------------------`);

      if (!fs.existsSync(this.config.frontend.fieldsOutPath)) {
        await mkdir(this.config.frontend.fieldsOutPath);
      }
      if (!fs.existsSync(this.config.frontend.prismaOutPath)) {
        await mkdir(this.config.frontend.prismaOutPath);
      }

      const fieldsIndexPath = path.join(this.config.frontend.fieldsOutPath, `index.ts`);

      if (!fs.existsSync(fieldsIndexPath)) {
        await writeFile(fieldsIndexPath, '');
        console.log(`- Wrote: ${fieldsIndexPath}`);
      }

      let fieldsIndexSource = (await readFile(fieldsIndexPath)).toString();

      for (const prismaName of prismaNames) {
        const fieldsPath = path.join(this.config.frontend.fieldsOutPath, `${prismaName}.gql.ts`);
        const prismaPath = path.join(this.config.frontend.prismaOutPath, `${prismaName}.gql.ts`);

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
  }

  async nestAbacResolvers(prismaNames: string[]) {
    let wroteCount = 0;
    for (const prismaName of prismaNames) {
      const outPath = path.join(__dirname, this.config.apiOutPath, 'resolvers', `${prismaName}.ts`);

      // Guard to prevent the overwriting of existing files
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
      const outPath = path.join(__dirname, this.config.apiOutPath, 'resolvers', `${prismaName}.ts`);

      // Guard to prevent the overwriting of existing files
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
    return execAsync('npx --no-install ' + command).then(({ stdout, stderr }) => {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
    });
  }
}

/**
 * Main
 **/
async function main() {
  const generator = new Generator(CONFIG);
  await generator.generate();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
