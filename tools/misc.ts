import { exec } from 'child_process';
import { readFile, rm, writeFile } from 'fs/promises';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class Misc {
  static async incrementVersion() {
    const packageFile = await readFile('package.json');
    const packageJson = JSON.parse(packageFile.toString());
    const currentVersion: string = packageJson.version;
    const minorVersionIndex = 1 + currentVersion.lastIndexOf('.');
    const currentMinorVersion = +currentVersion.substring(minorVersionIndex, currentVersion.length);
    const newVersion = currentVersion.substring(0, minorVersionIndex) + (currentMinorVersion + 1);
    packageJson.version = newVersion;
    await writeFile('package.json', JSON.stringify(packageJson));
    await this.execLocal(`prettier --write package.json`);
    console.log('Incremented project version to', newVersion);
  }

  static async deployApi() {
    const packageFile = await readFile('package.json');
    const packageJson = JSON.parse(packageFile.toString());
    const versionAddress = `zenacr.azurecr.io/api:${packageJson.version}`;
    const latestAddress = `zenacr.azurecr.io/api:latest`;
    await this.execGlobal(`docker tag zen-api ${versionAddress}`);
    await this.execGlobal(`docker tag zen-api ${latestAddress}`);
    await this.execGlobal(`docker push ${versionAddress}`);
    await this.execGlobal(`docker push ${latestAddress}`);
    await this.execGlobal(`kubectl set image deployments/zen-api zen-api=${versionAddress}`);
  }

  static clean(paths: string[]) {
    for (const path of paths) {
      rm(path, { recursive: true });
    }
  }

  static execGlobal(command: string) {
    console.log(command);
    return execAsync(command).then(({ stdout, stderr }) => {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
    });
  }

  static execLocal(command: string) {
    console.log(command);
    return execAsync('npx ' + command).then(({ stdout, stderr }) => {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
    });
  }
}
