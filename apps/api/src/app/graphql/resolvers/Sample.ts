import { PathLike, createWriteStream } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { CurrentUser, RequestUser, RolesGuard } from '@zen/nest-auth';
import { PubSub } from 'graphql-subscriptions';
import gql from 'graphql-tag';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { interval } from 'rxjs';

import type { Upload } from '../models';

const UPLOADS_PATH = './uploads';
const logger = new Logger('SampleResolver');
const pubSub = new PubSub();

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

async function fileExists(path: PathLike) {
  try {
    await stat(path);
    return true;
  } catch (err) {
    return false;
  }
}

async function createUploadDirectory() {
  if (!(await fileExists(UPLOADS_PATH))) {
    logger.log(`Creating directory ${UPLOADS_PATH}`);
    await mkdir(UPLOADS_PATH);
  }
}

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
    /**
     * Normally you would pipe the stream directly to a blob service in
     * the cloud somewhere and then store the file meta within your database.
     * But local storage will suffice for demonstrating gaining access to the
     * pertinent streams and file meta.
     */
    await createUploadDirectory();

    const { filename, mimetype, encoding, createReadStream } = file;

    createReadStream()
      .on('error', err => {
        logger.error(`${filename} ReadStream Error`, err);
      })
      .pipe(createWriteStream(path.join(UPLOADS_PATH, filename)))
      .on('close', () => {
        logger.log(`Uploaded: ${filename} | mimetype: ${mimetype} | encoding: ${encoding}`);
      })
      .on('error', err => {
        logger.error(`${filename} WriteStream Error`, err);
      });

    return true;
  }

  @Mutation()
  async sampleUploadMany(@Args('files', { type: () => [GraphQLUpload] }) files: Promise<Upload>[]) {
    await createUploadDirectory();

    return Promise.all(
      files.map(async file => {
        const { filename, mimetype, encoding, createReadStream } = await file;

        return new Promise((resolve, reject) => {
          createReadStream()
            .on('error', err => {
              logger.error(`${filename} ReadStream Error`, err);
            })
            .pipe(createWriteStream(path.join(UPLOADS_PATH, filename)))
            .on('close', () => {
              logger.log(`Uploaded: ${filename} | mimetype: ${mimetype} | encoding: ${encoding}`);
              resolve(filename);
            })
            .on('error', err => {
              logger.error(`${filename} WriteStream Error`, err);
              reject(`error ${filename}`);
            });
        });
      })
    );
  }

  @Subscription()
  async sampleSubscription(@CurrentUser() user: RequestUser) {
    logger.log(`sampleSubscription subscribed to by user with id ${user.id}`);
    return pubSub.asyncIterator('sampleSubscription');
  }
}
