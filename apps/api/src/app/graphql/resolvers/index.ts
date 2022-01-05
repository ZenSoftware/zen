import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

import PRISMA_TYPE_DEFS from '../generated/typeDefs';
import { AuthResolver, typeDef as AuthTypeDef } from './Auth';
import { SampleResolver, typeDef as SampleTypeDef } from './Sample';
import { UserResolver, typeDef as UserTypeDef } from './User';

export const NEST_RESOLVERS = [AuthResolver, SampleResolver, UserResolver];

export const NEST_TYPE_DEFS = [AuthTypeDef, SampleTypeDef, UserTypeDef].filter(x => x);

export const ALL_TYPE_DEFS = mergeTypeDefs(['scalar Upload', PRISMA_TYPE_DEFS, ...NEST_TYPE_DEFS]);
export const GRAPHQL_SCHEMA = makeExecutableSchema({ typeDefs: ALL_TYPE_DEFS });
