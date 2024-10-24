/**
 * Format & Lint Unity app
 * [dotnet format](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-format)
 */
import { exec } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import * as path from 'node:path';
import { promisify } from 'node:util';

import type { ExecutorContext } from '@nx/devkit';

import { FormatExecutorSchema } from './schema';

const execAsync = promisify(exec);

function getCommand(filePath: string, options: FormatExecutorSchema) {
  let command = `dotnet format "${filePath}" `;

  if (options.noRestore === true || options.noRestore === undefined) {
    command += '--no-restore ';
  }

  if (options.severity !== undefined) {
    command += `--severity ${options.severity} `;
  }

  if (options.verifyNoChanges !== undefined && options.verifyNoChanges) {
    command += '--verify-no-changes ';
  }

  if (options.binarylog !== undefined) {
    command += `--binarylog ${options.binarylog}`;
  }

  if (options.report !== undefined) {
    command += `--report ${options.report}`;
  }

  if (options.verbosity !== undefined) {
    command += `--verbosity ${options.verbosity}`;
  }

  return command;
}

export default async function runExecutor(
  options: FormatExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  try {
    const unityProjectRoot =
      options.unityProjectPath ?? context.projectsConfigurations.projects[context.projectName].root;

    const files = await readdir(unityProjectRoot);

    let csProjects: string[];
    if (options.projects?.length) {
      csProjects = options.projects;
    } else {
      csProjects = files
        .filter(f => f.endsWith('.csproj'))
        .map(f => path.join(unityProjectRoot, f));
    }

    for (const csProject of csProjects) {
      if (options.verifyNoChanges === true) console.log('Linting: ' + csProject);
      else console.log('Formatting: ' + csProject);

      await execAsync(getCommand(csProject, options));
    }
  } catch (err) {
    if (err?.stdout) console.log(err.stdout);

    if (err?.stderr) console.error(err.stderr);
    else if (err) console.error(err);

    return { success: false };
  }

  return { success: true };
}
