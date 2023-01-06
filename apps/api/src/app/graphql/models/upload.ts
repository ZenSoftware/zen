import { ReadStream } from 'fs';
import { CreateReadStreamOptions } from 'fs/promises';

export interface Upload {
  createReadStream: (options?: CreateReadStreamOptions) => ReadStream;
  encoding: string;
  filename: string;
  mimetype: string;
}
