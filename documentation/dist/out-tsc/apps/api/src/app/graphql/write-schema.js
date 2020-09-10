import fs from 'fs';
import { promisify } from 'util';
import { Logger } from '@nestjs/common';
import { printSchema } from 'graphql';
const execWriteFile = promisify(fs.writeFile);
export async function WriteGraphQLSchema(outPath, schema) {
    const schemaString = printSchema(schema);
    await execWriteFile(outPath, schemaString);
    Logger.log(`Wrote: ${outPath}`);
    return schemaString;
}
//# sourceMappingURL=write-schema.js.map