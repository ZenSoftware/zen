import { readFile, writeFile } from 'fs/promises';

class Tools {
  static async createDeployPackage() {
    const packageFile = await readFile('package.json');
    const packageJson = JSON.parse(packageFile.toString());
    delete packageJson.scripts.postinstall;
    delete packageJson.devDependencies;
    await writeFile('dist/package-deploy.json', JSON.stringify(packageJson, undefined, 2));
  }
}
//=============================================================================
/**
 * Main
 **/
async function main() {
  Tools.createDeployPackage();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
