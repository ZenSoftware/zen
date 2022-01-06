import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

import PRISMA_TYPE_DEFS from '../generated/typeDefs';
import { AuthResolver, typeDefs as AuthTypeDefs } from './Auth';
import { SampleResolver, typeDefs as SampleTypeDefs } from './Sample';
import { UserResolver, typeDefs as UserTypeDefs } from './User';

export const NEST_RESOLVERS = [AuthResolver, SampleResolver, UserResolver];

export const NEST_TYPE_DEFS = [AuthTypeDefs, SampleTypeDefs, UserTypeDefs].filter(x => x);

export const ALL_TYPE_DEFS = mergeTypeDefs(['scalar Upload', PRISMA_TYPE_DEFS, ...NEST_TYPE_DEFS]);
export const GRAPHQL_SCHEMA = makeExecutableSchema({ typeDefs: ALL_TYPE_DEFS });
