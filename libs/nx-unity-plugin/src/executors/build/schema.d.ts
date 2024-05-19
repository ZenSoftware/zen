export interface BuildExecutorSchema {
  unityProjectPath?: string;
  configuration?: 'Debug' | 'Release';
  executeMethod?: string;
  outputPath?: string;
}
