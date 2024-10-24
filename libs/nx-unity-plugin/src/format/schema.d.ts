export interface FormatExecutorSchema {
  unityProjectPath?: string;
  projects?: string[];
  severity?: 'info' | 'warn' | 'error';
  verifyNoChanges?: boolean;
  binarylog?: string;
  report?: string;
  noRestore?: boolean;
  verbosity?:
    | 'q'
    | 'quiet'
    | 'm'
    | 'minimal'
    | 'n'
    | 'normal'
    | 'd'
    | 'detailed'
    | 'diag'
    | 'diagnostic'
    | 'm'
    | 'minimal';
}
