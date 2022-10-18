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

export default async function (tree: Tree, schema: GeneratorOptions) {
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
  envContents += `${constantName}_SOURCE_URL=${schema.connectionString}\n`
  tree.write('.env', envContents)

  // Write export
  if ( !tree.exists('libs/prisma-clients/index.ts') ) {
    tree.write('libs/prisma-clients/index.ts', '')
  }

  let exportsContents = tree.read('libs/prisma-clients/index.ts')?.toString() ?? ``
  exportsContents += `export { ${className}Client } from './${name}';\n`
  tree.write('libs/prisma-clients/index.ts', exportsContents)

  await formatFiles(tree)
}