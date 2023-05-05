import { ReadStream } from 'node:fs';
import { CreateReadStreamOptions } from 'node:fs/promises';

export interface Upload {
  createReadStream: (options?: CreateReadStreamOptions) => ReadStream;
  encoding: string;
  filename: string;
  mimetype: string;
}
