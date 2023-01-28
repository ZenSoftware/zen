// This file is generated automatically. Do not edit it manually.
import { mergeTypeDefs } from '@graphql-tools/merge';
import { DocumentNode } from 'graphql';

import { typeDefs as GlobalTypeDefs } from '../global-schema.gql';
import PALJS_TYPE_DEFS from '../paljs/typeDefs';
import { AuthResolver, typeDefs as AuthTypeDefs } from './Auth';
import { SampleResolver, typeDefs as SampleTypeDefs } from './Sample';
import { UserResolver, typeDefs as UserTypeDefs } from './User';

export const NEST_RESOLVERS = [AuthResolver, SampleResolver, UserResolver];

export const NEST_TYPE_DEFS = [AuthTypeDefs, SampleTypeDefs, UserTypeDefs].filter(
  x => x
) as DocumentNode[];

export const ALL_TYPE_DEFS = mergeTypeDefs([GlobalTypeDefs, PALJS_TYPE_DEFS, ...NEST_TYPE_DEFS]);
