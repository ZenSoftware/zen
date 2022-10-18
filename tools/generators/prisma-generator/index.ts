import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  Tree
} from '@nrwl/devkit';

interface GeneratorOptions {
  name: string;
  provider: string;
  connectionString: string;
}

export async function PrismaClientGenerator(tree: Tree, schema: GeneratorOptions) {
  const { name, className, constantName } = names(schema.name)

  generateFiles(
    tree,
    joinPathFragments(__dirname, './template'),
    'libs/prisma-clients',
    {
      dbType: schema.provider,
      tmpl: '',
      name,
      className,
      constantName,
      outputLocation: `../../../../node_modules/.prisma/${name}-client`
    }
  )

  // Write .env
  if (!tree.exists('.env') ) {
    tree.write('.env', '')
  }

  let envContents = tree.read('.env')?.toString() ?? ``
  if (envContents.includes(`${constantName}_SOURCE_URL=`)) {
    envContents.replace(new RegExp(`${constantName}_SOURCE_URL=.*?\n`), `${constantName}_SOURCE_URL=${schema.connectionString}\n`)
  } else {
    envContents += `\n${constantName}_SOURCE_URL=${schema.connectionString}\n`
  }
  tree.write('.env', envContents)

  // Write export
  if ( !tree.exists('libs/prisma-clients/index.ts') ) {
    tree.write('libs/prisma-clients/index.ts', '')
  }

  let exportsContents = tree.read('libs/prisma-clients/index.ts')?.toString() ?? ``
  if (!exportsContents.includes(`export { ${className}Client } from './${name}';`)) {
    exportsContents += `export { ${className}Client } from './${name}';\n`
  }
  tree.write('libs/prisma-clients/index.ts', exportsContents)

  await formatFiles(tree)
}

export default PrismaClientGenerator;