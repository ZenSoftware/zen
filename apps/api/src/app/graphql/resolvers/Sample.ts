import { createWriteStream } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';

import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { CurrentUser, RequestUser, RolesGuard } from '@zen/nest-auth';
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

const UPLOADS_PATH = './uploads/';
const pubSub = new PubSub();
const fileExists = async (path: any) => !!(await stat(path).catch(() => false));

interval(1000).subscribe(i =>
  pubSub.publish('sampleSubscription', {
    sampleSubscription: {
      message: `Server ticker ${i}`,
    },
  })
);

@Resolver()
@UseGuards(RolesGuard('Super'))
export class SampleResolver {
  @Mutation()
  async sampleUpload(@Args('file', { type: () => GraphQLUpload }) file: Upload) {
    if (!(await fileExists(UPLOADS_PATH))) {
      Logger.log('Creating directory', UPLOADS_PATH);
      await mkdir(UPLOADS_PATH);
    }

    const { filename, mimetype, encoding, createReadStream } = file;

    createReadStream()
      .on('error', err => {
        Logger.error(`${filename} ReadStream Error`, err);
      })
      .pipe(createWriteStream(`${UPLOADS_PATH}${filename}`))
      .on('close', () => {
        Logger.log(
          `${filename} uploaded successfully with mimetype: ${mimetype} | encoding: ${encoding}`
        );
      })
      .on('error', err => {
        Logger.error(`${filename} WriteStream Error`, err);
      });

    return true;
  }

  @Mutation()
  async sampleUploadMany(@Args('files', { type: () => [GraphQLUpload] }) files: Promise<Upload>[]) {
    if (!(await fileExists(UPLOADS_PATH))) {
      Logger.log('Creating directory', UPLOADS_PATH);
      await mkdir(UPLOADS_PATH);
    }

    return Promise.all(
      files.map(async file => {
        const { filename, mimetype, encoding, createReadStream } = await file;
        return createReadStream()
          .on('error', err => {
            Logger.error(`${filename} ReadStream Error`, err);
          })
          .pipe(createWriteStream(`${UPLOADS_PATH}${filename}`))
          .on('close', () => {
            Logger.log(
              `${filename} uploaded successfully with mimetype: ${mimetype} | encoding: ${encoding}`
            );
          })
          .on('error', err => {
            Logger.error(`${filename} WriteStream Error`, err);
          });
      })
    );
  }

  @Subscription()
  async sampleSubscription(@CurrentUser() user: RequestUser) {
    Logger.log(`sampleSubscription subscribed to by user with id ${user.id}`);
    return pubSub.asyncIterator('sampleSubscription');
  }
}
