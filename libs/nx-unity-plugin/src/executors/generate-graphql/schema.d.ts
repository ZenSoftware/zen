export interface GenerateGqlExecutorSchema {
  outputPath?: string;
  schema?: string;
  documents?: string[];
  namespace?: string;
  overwrite?: boolean;
  scalars?: object;
}
