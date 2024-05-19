/**
 * Runs Unity Testing Framework from the command line.
 * [Unity docs - Running tests from the command line](https://docs.unity3d.com/Packages/com.unity.test-framework@2.0/manual/workflow-run-test.html#running-tests-from-the-command-line)
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import * as path from 'path';

import type { ExecutorContext } from '@nx/devkit';

import { TestExecutorSchema } from './schema';

interface SpawnResult {
  stdout: string;
  stderr: string;
  status: number;
}

const runSpawn = (cmd: string, args: ReadonlyArray<string>) =>
  new Promise<SpawnResult>(resolve => {
    const cp = spawn(cmd, args);
    let stdout = '';
    let stderr = '';

    cp.stdout.on('data', data => {
      stdout += data.toString() + '\n';
    });

    cp.on('error', e => {
      stderr += e.toString() + '\n';
    });

    cp.on('close', status => {
      resolve({ status, stdout, stderr });
    });
  });

export default async function runExecutor(
  options: TestExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const projectRoot = context.projectsConfigurations.projects[context.projectName].root;

  const { status, stderr } = await runSpawn(`Unity`, [
    '-projectPath',
    projectRoot,
    '-runTests',
    '-batchmode',
    '-testResults',
    'TestResults.xml',
  ]);

  const pathToResultXML = path.join(projectRoot, 'TestResults.xml');

  if (status !== 0) {
    if (existsSync(pathToResultXML)) {
      const xmlContents = await readFile(pathToResultXML);
      console.log(xmlContents.toString());
      console.log('\nTest results of: ' + pathToResultXML);
    } else if (stderr) {
      console.error(stderr);
    }

    return { success: false };
  }

  return { success: true };
}
