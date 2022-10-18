import { Tree } from '@nrwl/devkit';
import { PrismaClientGenerator }  from '../prisma-generator'

interface GeneratorOptions {
  name: string;
  provider: string;
  connectionString: string;
}

export async function NestAPIGenerator (tree: Tree, options: GeneratorOptions) {
  await PrismaClientGenerator(tree, {...options,});
}

export default NestAPIGenerator;