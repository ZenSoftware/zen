import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import gql from 'graphql-tag';
import { GraphQLUpload } from 'graphql-upload';

import { GqlGuard, Roles } from '../../auth';
import { FileInfo, UploadService } from '../upload.service';

export const SampleTypeDef = gql`
  extend type Mutation {
    sampleUpload(file: Upload!): Boolean!
  }
`;

@Resolver()
@UseGuards(GqlGuard)
@Roles('Super')
export class SampleResolver {
  constructor(private upload: UploadService) {}

  @Mutation()
  async sampleUpload(@Args('file', { type: () => GraphQLUpload }) file: FileInfo) {
    const buffer = await this.upload.getBuffer(file);
    console.log(`Recieved file '${file.file.filename}' with buffer length: ${buffer.length}`);
    return true;
  }
}
