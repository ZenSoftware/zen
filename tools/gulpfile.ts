import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

import * as del from 'del';
import * as gulp from 'gulp';
import * as flatten from 'gulp-flatten';
import { Gulpclass, SequenceTask, Task } from 'gulpclass';

const clientResolversTemplate = require(path.join(
  __dirname,
  'tools/graphql-codegen/client-resolvers.temp.js'
));
const clientFieldsTemplate = require(path.join(
  __dirname,
  'tools/graphql-codegen/client-fields.temp.js'
));
const nestResolversTemplate = require(path.join(
  __dirname,
  'tools/graphql-codegen/nest-resolvers.temp.js'
));
const nestResolversIndexTemplate = require(path.join(
  __dirname,
  'tools/graphql-codegen/nest-resolvers-index.temp.js'
));
const nestQueryTemplate = require(path.join(__dirname, 'tools/graphql-codegen/nest-query.temp.js'));
const nestMutationTemplate = require(path.join(
  __dirname,
  'tools/graphql-codegen/nest-mutation.temp.js'
));

const execAsync = promisify(exec);
const readdirAsync = promisify(fs.readdir);
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const appendFileAsync = promisify(fs.appendFile);

//=============================================================================
/**
 * Configuration
 **/
//=============================================================================
const CONFIG = {
  cleanGlobs: ['dist/apps/'],

  gql: {
    apiPath: 'apps/api/src/app/graphql',
    clientPrismaPath: 'libs/graphql/src/lib/prisma',
    clientFieldsPath: 'libs/graphql/src/lib/fields',
  },

  handlebars: {
    src: 'apps/api/src/app/mail/templates/**/*.hbs',
    destApi: 'dist/apps/api/mail/templates',
    // destCron: 'dist/apps/api-cron/mail/templates',
  },
};

//=============================================================================
/**
 * Gulp
 **/
//=============================================================================
@Gulpclass()
export class Gulpfile {
  //---------------------------------------------------------------------------
  @Task('increment-version')
  async incrementVersion(cb) {
    const packageFile = await readFileAsync('package.json');
    const packageJson = JSON.parse(packageFile.toString());
    const currentVersion: string = packageJson.version;
    const minorVersionIndex = 1 + currentVersion.lastIndexOf('.');
    const currentMinorVersion = +currentVersion.substr(minorVersionIndex, currentVersion.length);
    const newVersion = currentVersion.substr(0, minorVersionIndex) + (currentMinorVersion + 1);
    packageJson.version = newVersion;
    fs.writeFileSync('package.json', JSON.stringify(packageJson));
    await this.execLocal(`prettier --write package.json`);
    console.log('Incremented project version to', newVersion);
    cb();
  }

  @Task('deploy:api')
  async deployApi(cb) {
    const packageFile = await readFileAsync('package.json');
    const packageJson = JSON.parse(packageFile.toString());
    const versionAddress = `zenacr.azurecr.io/api:${packageJson.version}`;
    const latestAddress = `zenacr.azurecr.io/api:latest`;
    await this.execGlobal(`docker tag zen-api ${versionAddress}`);
    await this.execGlobal(`docker tag zen-api ${latestAddress}`);
    await this.execGlobal(`docker push ${versionAddress}`);
    await this.execGlobal(`docker push ${latestAddress}`);
    await this.execGlobal(`kubectl set image deployments/zen-api zen-api=${versionAddress}`);
    cb();
  }
  //---------------------------------------------------------------------------
  @Task('clean')
  clean() {
    return del(CONFIG.cleanGlobs, { force: true });
  }
  //---------------------------------------------------------------------------
  async createApolloAngularPrismaFile(prismaNames: string[]) {
    console.log(`---- Generate Apollo Client Resolvers & Fields Templates ----`);
    const fieldsIndexPath = path.join(CONFIG.gql.clientFieldsPath, `index.ts`);
    if (!fs.existsSync(fieldsIndexPath)) {
      await writeFileAsync(fieldsIndexPath, '');
      console.log(`- Wrote: ${fieldsIndexPath}`);
    }

    let fieldsIndexSource = (await readFileAsync(fieldsIndexPath)).toString();

    for (const prismaName of prismaNames) {
      const prismaPath = path.join(CONFIG.gql.clientPrismaPath, `${prismaName}.gql.ts`);
      const fieldsPath = path.join(CONFIG.gql.clientFieldsPath, `${prismaName}.gql.ts`);

      if (!fs.existsSync(fieldsPath)) {
        await writeFileAsync(fieldsPath, clientFieldsTemplate(prismaName));
        console.log(`- Wrote: ${fieldsPath}`);
      }

      const exportScript = `export * from './${prismaName}.gql';`;
      if (!fieldsIndexSource.includes(exportScript)) {
        await appendFileAsync(fieldsIndexPath, exportScript + '\n');
        fieldsIndexSource += exportScript + '\n';
      }

      if (!fs.existsSync(prismaPath)) {
        await writeFileAsync(prismaPath, clientResolversTemplate(prismaName));
        console.log(`- Wrote: ${prismaPath}`);
      }
    }
  }
  //---------------------------------------------------------------------------
  @Task('gql:gen')
  async genGqlApi(cb) {
    const PRISMA_PATH = `${CONFIG.gql.apiPath}/prisma`;
    const RESOLVERS_PATH = `${CONFIG.gql.apiPath}/resolvers`;

    console.log(`------------------ @paljs/cli generate ------------------`);
    await this.execGlobal(path.join(__dirname, 'node_modules/.bin/pal') + ' g');

    console.log(`---------- Zen Nest GraphQL Resolvers generate ----------`);
    if (!fs.existsSync(RESOLVERS_PATH)) {
      fs.mkdirSync(RESOLVERS_PATH);
    }
    if (!fs.existsSync(CONFIG.gql.clientFieldsPath)) {
      fs.mkdirSync(CONFIG.gql.clientFieldsPath);
    }
    if (!fs.existsSync(CONFIG.gql.clientPrismaPath)) {
      fs.mkdirSync(CONFIG.gql.clientPrismaPath);
    }

    // Get Prisma type names via the directory names under the 'prisma' folder;
    const dirents = await readdirAsync(PRISMA_PATH, { withFileTypes: true });
    let prismaNames = dirents.filter(d => d.isDirectory()).map(d => d.name);
    prismaNames = prismaNames.sort();

    const QUERY_TOKEN = 'Query: {';
    const MUTATION_TOKEN = 'Mutation: {';
    const regExpHasResolverName = new RegExp(/^[\s]*[a-zA-Z0-9_]+\:/);

    let wroteCount = 0;
    for (const prismaName of prismaNames) {
      const outPath = path.join(__dirname, CONFIG.gql.apiPath, 'resolvers', `${prismaName}.ts`);

      // Guard to prevent the overwriting of existing files
      if (!fs.existsSync(outPath)) {
        const pathName = path.join(__dirname, PRISMA_PATH, prismaName, 'resolvers.ts');
        const prismaScript = fs.readFileSync(pathName).toString();

        const queryStartIndex = prismaScript.indexOf(QUERY_TOKEN) + QUERY_TOKEN.length + 1;
        const queryEndIndex = prismaScript.indexOf(MUTATION_TOKEN) - MUTATION_TOKEN.length;
        const querySection = prismaScript.substr(
          queryStartIndex,
          queryEndIndex - queryStartIndex + 2
        );
        const querySectionLines = querySection.split('\n');

        const queryNames = [];
        for (const line of querySectionLines) {
          if (regExpHasResolverName.test(line)) {
            queryNames.push(line.substr(0, line.indexOf(':')).trim());
          }
        }

        let querySource = '';
        for (const queryName of queryNames) {
          querySource += nestQueryTemplate(queryName);
        }

        const mutationStartIndex = prismaScript.indexOf(MUTATION_TOKEN) + MUTATION_TOKEN.length + 1;
        const mutationEndIndex = prismaScript.length - mutationStartIndex - 1;
        const mutationSection = prismaScript.substr(mutationStartIndex, mutationEndIndex);
        const mutationSectionLines = mutationSection.split('\n');
        const mutationNames = [];
        for (const line of mutationSectionLines) {
          if (regExpHasResolverName.test(line)) {
            mutationNames.push(line.substr(0, line.indexOf(':')).trim());
          }
        }

        let mutationSource = '';
        for (const mutationName of mutationNames) {
          mutationSource += nestMutationTemplate(mutationName);
        }
        mutationSource = mutationSource.trimRight();

        await writeFileAsync(
          outPath,
          nestResolversTemplate(prismaName, querySource, mutationSource)
        );
        console.log(`- Wrote: ${outPath}`);
        wroteCount++;
      }
    }

    console.log(`* Total resolver files wrote: ${wroteCount}`);

    // Get the data type names via the filename of the "resolvers" directory
    let dataTypeNames = (await readdirAsync(RESOLVERS_PATH))
      .filter(f => {
        const basename = path.basename(f);
        return basename !== 'index.ts' && basename !== 'debug.log';
      })
      .map(f => path.basename(f, '.ts')); // Remove ".ts" extension from all names

    const indexPath = `${RESOLVERS_PATH}/index.ts`;
    await writeFileAsync(indexPath, nestResolversIndexTemplate(dataTypeNames));
    console.log(`- Wrote: ${indexPath}\n`);

    await this.execLocal(`prettier --loglevel warn --write "${CONFIG.gql.apiPath}/**/*.ts"\n`);

    await this.createApolloAngularPrismaFile(prismaNames);

    cb();
  }
  //---------------------------------------------------------------------------
  @Task('handlebars:copy')
  handlebarsCopy() {
    return gulp
      .src(CONFIG.handlebars.src)
      .pipe(flatten())
      .pipe(gulp.dest(CONFIG.handlebars.destApi));
    // .pipe(gulp.dest(CONFIG.handlebars.destCron));
  }

  @Task('handlebars:watch')
  handlebarsWatch() {
    gulp.watch(CONFIG.handlebars.src, gulp.parallel('handlebars:copy'));
  }
  //---------------------------------------------------------------------------
  private execGlobal(command: string) {
    console.log(command);
    return execAsync(command).then(({ stdout, stderr }) => {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
    });
  }

  private execLocal(command: string) {
    console.log(command);
    return execAsync('npx --no-install ' + command).then(({ stdout, stderr }) => {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
    });
  }
}
