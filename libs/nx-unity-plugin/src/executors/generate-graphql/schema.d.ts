export interface GenerateGqlExecutorSchema {
  outputPath?: string;
  schema?: string;
  documents?: string[];
  namespaceName?: string;
  overwrite?: boolean;
  scalars?: object;
}
