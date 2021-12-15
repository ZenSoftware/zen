import { ReadStream } from 'fs';
import { CreateReadStreamOptions } from 'fs/promises';

import { Injectable } from '@nestjs/common';

export interface FileInfo {
  file: {
    createReadStream: (options?: CreateReadStreamOptions) => ReadStream;
    encoding: string;
    filename: string;
    mimetype: string;
  };
}

@Injectable()
export class UploadService {
  async getBuffer(file: FileInfo) {
    const readStream = file.file.createReadStream();

    const chunks = [];
    for await (const chunk of readStream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  }
}
