import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

import * as del from 'del';
import * as gulp from 'gulp';
import { Gulpclass, SequenceTask, Task } from 'gulpclass';

const execAsync = promisify(exec);
const execReaddir = promisify(fs.readdir);
const execWriteFile = promisify(fs.writeFile);

@Gulpclass()
export class Gulpfile {
  //---------------------------------------------------------------------------
  @Task('increment-version')
  async incrementVersion(cb) {
    const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
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

  @Task('deploy-api')
  async deployApi(cb) {
    const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
    const versionAddress = `tuspeak.azurecr.io/api:${packageJson.version}`;
    const latestAddress = `tuspeak.azurecr.io/api:latest`;
    await this.execGlobal(`docker tag tu-api ${versionAddress}`);
    await this.execGlobal(`docker tag tu-api ${latestAddress}`);
    await this.execGlobal(`docker push ${versionAddress}`);
    await this.execGlobal(`docker push ${latestAddress}`);
    await this.execGlobal(`kubectl set image deployments/tu-api tu-api=${versionAddress}`);
    cb();
  }

  @Task('deploy-api-cron')
  async deployApiCron(cb) {
    const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
    const versionAddress = `tuspeak.azurecr.io/api-cron:${packageJson.version}`;
    const latestAddress = `tuspeak.azurecr.io/api-cron:latest`;
    await this.execGlobal(`docker tag tu-api-cron ${versionAddress}`);
    await this.execGlobal(`docker tag tu-api-cron ${latestAddress}`);
    await this.execGlobal(`docker push ${versionAddress}`);
    await this.execGlobal(`docker push ${latestAddress}`);
    await this.execGlobal(
      `kubectl set image deployments/tu-api-cron tu-api-cron=${versionAddress}`
    );
    cb();
  }
  //---------------------------------------------------------------------------
  @Task('clean')
  clean() {
    return del(CONFIG.cleanGlobs, { force: true });
  }
  //---------------------------------------------------------------------------
  @Task('gqlschema:copy')
  gqlschemaCopy() {
    // Copy the GraphQL schema file to dist
    return gulp.src(CONFIG.gqlSchema.src).pipe(gulp.dest(CONFIG.gqlSchema.destCron));
  }
  //---------------------------------------------------------------------------
  // @Task('handlebars:copy')
  // handlebarsCopy() {
  //   return gulp
  //     .src(CONFIG.handlebars.src)
  //     .pipe(flatten())
  //     .pipe(gulp.dest(CONFIG.handlebars.destApi))
  //     .pipe(gulp.dest(CONFIG.handlebars.destCron));
  // }

  // @Task('handlebars:watch')
  // handlebarsWatch() {
  //   gulp.watch(CONFIG.handlebars.src, gulp.parallel('handlebars:copy'));
  // }
  //---------------------------------------------------------------------------
  private gqlGenerate(gqlConfig: GqlConfig) {
    const output = path.resolve(gqlConfig.output);
    return this.execLocal(
      `apollo client:codegen "${output}" --config="${gqlConfig.apolloConfig}" --target=typescript --outputFlat --addTypename`
    );
  }

  @Task('gql:codegen')
  async gqlCodegen(cb) {
    const promises = [];

    CONFIG.gql.forEach(gqlConfig => {
      const promise = this.gqlGenerate(gqlConfig);
      promises.push(promise);
    });

    await Promise.all(promises);
    cb();
  }
  @Task('gen:prisma-nest')
  async genPrismaNest(cb) {
    const nestGraphQLPrismaPath = CONFIG.gqlSchema.graphQLPath + '/prisma';

    await this.execGlobal(path.join(__dirname, 'node_modules/.bin/pal') + ' g');
    // await this.execLocal(`prettier --write "${nestGraphQLPrismaPath}/**/*.ts"`);

    let folders = await execReaddir(nestGraphQLPrismaPath);
    folders = folders.filter(f => path.extname(f) !== '.ts'); // Filter out .ts files

    const regExpName = new RegExp(/^[ \t]*[a-zA-Z0-9]+\:/);
    const queryToken = 'Query: {';
    const mutationToken = 'Mutation: {';

    console.log(`---- Writing Nest GraphQL Resolvers ----`);

    for (const folder of folders) {
      const outPath = path.join(
        __dirname,
        CONFIG.gqlSchema.graphQLPath,
        'resolvers',
        `${folder}.ts`
      );

      if (!fs.existsSync(outPath)) {
        console.log(`- Creating '${folder}Resolver'`);
        const pathName = path.join(__dirname, nestGraphQLPrismaPath, folder, 'resolvers.ts');
        const resolversScript = fs.readFileSync(pathName).toString();

        const queryStartIndex = resolversScript.indexOf(queryToken) + queryToken.length + 1;
        const queryEndIndex = resolversScript.indexOf(mutationToken) - mutationToken.length;
        const querySection = resolversScript.substr(
          queryStartIndex,
          queryEndIndex - queryStartIndex + 2
        );
        const querySectionLines = querySection.split('\n');

        const queryNames = [];
        for (const line of querySectionLines) {
          if (regExpName.test(line)) {
            queryNames.push(line.substr(0, line.indexOf(':')).trim());
          }
        }

        let querySource = '';
        for (const queryName of queryNames) {
          querySource += `  @Query()
  async ${queryName}(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.${queryName}(parent, PrismaSelectArgs(info, args), context);
  }\n\n`;
        }

        const mutationStartIndex =
          resolversScript.indexOf(mutationToken) + mutationToken.length + 1;
        const mutationEndIndex = resolversScript.length - mutationStartIndex - 1;
        const mutationSection = resolversScript.substr(mutationStartIndex, mutationEndIndex);
        const mutationSectionLines = mutationSection.split('\n');
        const mutationNames = [];
        for (const line of mutationSectionLines) {
          if (regExpName.test(line)) {
            mutationNames.push(line.substr(0, line.indexOf(':')).trim());
          }
        }

        let mutationSource = '';
        for (const mutationName of mutationNames) {
          mutationSource += `  @Mutation()
  async ${mutationName}(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.${mutationName}(parent, PrismaSelectArgs(info, args), context);
  }\n\n`;
        }
        mutationSource = mutationSource.trimRight();

        const resolverSource = `import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';

import PrismaSelectArgs from '../prisma-select-args';
import resolvers from '../prisma/${folder}/resolvers';

@Resolver('${folder}')
export class ${folder}Resolver {
${querySource}${mutationSource}
}
`;

        await execWriteFile(outPath, resolverSource);
      }
    }

    const nestResolversPath = `${CONFIG.gqlSchema.graphQLPath}/resolvers`;
    let resolverFiles = await execReaddir(nestResolversPath);
    resolverFiles = resolverFiles.filter(f => path.basename(f) !== 'index.ts'); // Filter out index.ts
    resolverFiles = resolverFiles.map(f => path.basename(f, '.ts')); // Remove ".ts" in all names

    let exportStatements = resolverFiles
      .map(f => `import { ${f}Resolver } from './${f}';`)
      .reduce((prev, curr, i, []) => prev + '\n' + curr);

    const bulkExportString = resolverFiles
      .map(f => `${f}Resolver`)
      .toString()
      .replace(/,/g, ',\n  ');
    // Create a bulk export for easy importing of all resolvers
    exportStatements += `\n\nexport const ALL_RESOLVERS = [\n  ${bulkExportString}\n];\n`;

    await execWriteFile(`${nestResolversPath}/index.ts`, exportStatements);

    cb();
  }

  @Task('gen:prisma-index')
  async genPrismaIndex(cb) {
    const nestGraphQLPrismaPath = CONFIG.gqlSchema.graphQLPath + '/prisma';
    const prismaFiles = [];
    let folders = await execReaddir(nestGraphQLPrismaPath);
    folders = folders.filter(f => path.extname(f) !== '.ts'); // Filter out index.ts

    for (const folder of folders) {
      const files = await execReaddir(`${nestGraphQLPrismaPath}/${folder}`);
      for (const file of files) {
        const fileName = path.basename(file, '.ts');
        prismaFiles.push(`${folder}/${fileName}`);
      }
    }

    const exportStatements = prismaFiles
      .map(p => `export * from './${p}';`)
      .reduce((prev, curr, i, []) => prev + '\n' + curr);

    await execWriteFile(`${nestGraphQLPrismaPath}/index.ts`, exportStatements);
    console.log(exportStatements);
    cb();
  }

  @Task('gql:portal')
  async gqlPortal(cb) {
    await this.gqlGenerate(CONFIG.gql.get('portal'));
    cb();
  }

  @Task('gql:admin')
  async gqlAdmin(cb) {
    await this.gqlGenerate(CONFIG.gql.get('admin'));
    cb();
  }

  @Task('gql:api')
  async gqlApi(cb) {
    await this.gqlGenerate(CONFIG.gql.get('api'));
    cb();
  }

  @Task('gql:watch')
  async gqlWatch() {
    const gqlConfigPortal = CONFIG.gql.get('portal');
    gulp.watch(gqlConfigPortal.watchIncludes, gulp.parallel('gql:portal'));

    const gqlConfigAdmin = CONFIG.gql.get('admin');
    gulp.watch(gqlConfigAdmin.watchIncludes, gulp.parallel('gql:admin'));

    const gqlConfigApi = CONFIG.gql.get('api');
    gulp.watch(gqlConfigApi.watchIncludes, gulp.parallel('gql:api'));
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

//===========================================================================
// Configuration
//===========================================================================
const CONFIG = {
  cleanGlobs: ['dist/apps/'],

  handlebars: {
    src: 'apps/api/src/app/mail/templates/**/*.hbs',
    destApi: 'dist/apps/api/mail/templates',
    destCron: 'dist/apps/api-cron/mail/templates',
  },

  gqlSchema: {
    graphQLPath: 'apps/api/src/app/graphql',
    // nestGraphQLPrismaPath: 'apps/api/src/app/graphql/prisma',
    src: 'apps/api/src/app/graphql/schema/**/*.graphql',
    destCron: 'dist/apps/api-cron/schema',
  },

  gql: new Map<'portal' | 'admin' | 'api', GqlConfig>([
    [
      'portal',
      {
        output: 'libs/common/src/lib/graphql/types/codegen.ts',
        apolloConfig: 'apollo.config.js',
        watchIncludes: ['apps/portal-app/src/app/**/*.gql.ts', 'libs/!(admin)/**/*.gql.ts'],
      },
    ],
    [
      'admin',
      {
        output: 'libs/admin/src/lib/graphql/types/codegen.ts',
        apolloConfig: 'libs/admin/apollo.config.js',
        watchIncludes: ['apps/admin-app/src/app/**/*.gql.ts', 'libs/admin/**/*.gql.ts'],
      },
    ],
    [
      'api',
      {
        output: 'apps/api/src/app/graphql/cache/apollo/types/index.ts',
        apolloConfig: 'apps/api/apollo.config.js',
        watchIncludes: [
          'apps/api/src/app/graphql/cache/apollo/apollo-client.ts',
          'libs/common/src/lib/graphql/fragments/**/*.gql.ts',
        ],
      },
    ],
  ]),
};

interface GqlConfig {
  output: string;
  apolloConfig: string;
  watchIncludes: string[];
}
