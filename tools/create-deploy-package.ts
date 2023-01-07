import { readFile, writeFile } from 'fs/promises';

/**
 * Creates a `package-deploy.json` file for the dist folder.
 * Removes the Nx `postinstall` script.
 * `deploy/api/Dockerfile` uses this file to install the dependencies.
 */
async function main() {
  const packageFile = await readFile('package.json');
  const packageJson = JSON.parse(packageFile.toString());
  delete packageJson.scripts.postinstall;
  await writeFile('dist/package-deploy.json', JSON.stringify(packageJson, undefined, 2));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
