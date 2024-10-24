/**
 * [Build Unity projects from the Command Line](https://docs.unity.com/embeddedlinux/en/manual/how-to-build-using-cli)
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { cp, mkdir, rm } from 'node:fs/promises';

import type { ExecutorContext } from '@nx/devkit';

import { BuildExecutorSchema } from './schema';

const runSpawn = (cmd: string, args: ReadonlyArray<string>) =>
  new Promise<{ success: boolean }>(resolve => {
    let success = false;
    const cp = spawn(cmd, args);

    cp.stdout.on('data', data => {
      console.log(data.toString());

      if (!success && data.includes('Build succeeded:')) {
        success = true;
      }
    });

    cp.on('error', e => {
      console.error(e.toString());
    });

    cp.on('close', () => {
      resolve({ success });
    });
  });

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  const unityProjectRoot =
    options.unityProjectPath ?? context.projectsConfigurations.projects[context.projectName].root;

  const args = [
    '-quit',
    '-batchmode',
    '-nographics',
    '-buildTarget',
    'WebGL',
    '-projectPath',
    unityProjectRoot,
  ];

  if (options.executeMethod) {
    args.push('-executeMethod');
    args.push(options.executeMethod);
  }

  const result = await runSpawn(`Unity`, args);

  if (result.success && options.outputPath) {
    if (existsSync(options.outputPath)) {
      await rm(options.outputPath, { recursive: true });
    }

    await mkdir(options.outputPath);

    const buildSource = `dist/apps/${context.projectName}/Build`;
    if (existsSync(buildSource)) {
      const buildDestination = options.outputPath + '/Build';
      await cp(buildSource, buildDestination, { recursive: true });
    }

    const streamingAssetsSource = `dist/apps/${context.projectName}/StreamingAssets`;
    if (existsSync(streamingAssetsSource)) {
      const streamingAssetsDestination = options.outputPath + '/StreamingAssets';
      await cp(streamingAssetsSource, streamingAssetsDestination, { recursive: true });
    }

    const addressablesSource = `${unityProjectRoot}/ServerData`;
    if (existsSync(addressablesSource)) {
      const addressablesDestination = options.outputPath + '/ServerData';
      await cp(addressablesSource, addressablesDestination, { recursive: true });
    }
  }

  return result;
}
