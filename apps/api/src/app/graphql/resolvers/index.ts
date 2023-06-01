// This file is generated automatically. Do not edit it manually.
import { mergeTypeDefs } from '@graphql-tools/merge';
import { DocumentNode } from 'graphql';

import { typeDefs as GLOBAL_TYPE_DEFS } from '../global-schema.gql';
import PALJS_TYPE_DEFS from '../paljs/typeDefs';
import { AuthResolver, typeDefs as AuthTypeDefs } from './Auth';
import { PRISMA_RESOLVERS, PRISMA_TYPE_DEFS } from './prisma';
import { SampleResolver, typeDefs as SampleTypeDefs } from './Sample';

const API_RESOLVERS = [AuthResolver, SampleResolver];

const API_TYPE_DEFS = [AuthTypeDefs, SampleTypeDefs].filter(x => x) as DocumentNode[];

export const ALL_RESOLVERS = [...PRISMA_RESOLVERS, ...API_RESOLVERS];

export const ALL_TYPE_DEFS = mergeTypeDefs([
  GLOBAL_TYPE_DEFS,
  PALJS_TYPE_DEFS,
  ...PRISMA_TYPE_DEFS,
  ...API_TYPE_DEFS,
]);
