import { createWriteStream, existsSync, mkdirSync } from 'fs';

import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { GqlGuard, GqlUser, RequestUser, Roles } from '@zen/nest-auth';
import { PubSub } from 'graphql-subscriptions';
import gql from 'graphql-tag';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { interval } from 'rxjs';

import type { Upload } from '../models';

export const typeDefs = gql`
  extend type Mutation {
    sampleUpload(file: Upload!): Boolean!
    sampleUploadMany(files: [Upload!]!): [String!]!
  }

  type SampleSubscriptionResult {
    message: String!
  }

  type Subscription {
    sampleSubscription: SampleSubscriptionResult!
  }
`;

const pubSub = new PubSub();

interval(1000).subscribe(i =>
  pubSub.publish('sampleSubscription', {
    sampleSubscription: {
      message: `Server ticker ${i}`,
    },
  })
);

@Resolver()
@UseGuards(GqlGuard)
@Roles('Super')
export class SampleResolver {
  @Mutation()
  async sampleUpload(@Args('file', { type: () => GraphQLUpload }) file: Upload) {
    const readStream = file.createReadStream();
    const chunks = [];
    for await (const chunk of readStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    Logger.log(`Recieved '${file.filename}' ${buffer.byteLength} bytes`);
    return true;
  }

  @Mutation()
  async sampleUploadMany(@Args('files', { type: () => [GraphQLUpload] }) files: Promise<Upload>[]) {
    const UPLOAD_PATH = './upload/';
    if (!existsSync(UPLOAD_PATH)) {
      Logger.log('Creating directory', UPLOAD_PATH);
      mkdirSync(UPLOAD_PATH);
    }

    return await Promise.all(
      files.map(async file => {
        const { filename, mimetype, encoding, createReadStream } = await file;
        Logger.log('Attachment:', filename, mimetype, encoding);
        const stream = createReadStream();

        return new Promise((resolve, reject) => {
          stream
            .on('close', () => {
              Logger.log(`${filename} ReadStream Closed`);
            })
            .on('error', err => {
              Logger.error(`${filename} ReadStream Error`, err);
            })
            .pipe(createWriteStream(`${UPLOAD_PATH}${filename}`))
            .on('close', () => {
              Logger.log(`${filename} WriteStream Closed`);
              resolve(`${filename} close`);
            })
            .on('error', err => {
              Logger.error(`${filename} WriteStream Error`, err);
              reject(`${filename} error`);
            });
        });
      })
    );
  }

  @Subscription()
  async sampleSubscription(@GqlUser() user: RequestUser) {
    Logger.log(`sampleSubscription subscribed to by user with id ${user.id}`);
    return pubSub.asyncIterator('sampleSubscription');
  }
}
