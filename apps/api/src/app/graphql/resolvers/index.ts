import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from 'graphql-tools';

import PRISMA_TYPE_DEFS from '../prisma/typeDefs';
import { AuthResolver, AuthTypeDef } from './Auth';
import { UserResolver, UserTypeDef } from './User';

export const NEST_RESOLVERS = [AuthResolver, UserResolver];

export const NEST_TYPE_DEFS = [AuthTypeDef, UserTypeDef].filter(x => x);

export const ALL_TYPE_DEFS = mergeTypeDefs(['scalar Upload', PRISMA_TYPE_DEFS, ...NEST_TYPE_DEFS]);
export const GRAPHQL_SCHEMA = makeExecutableSchema({ typeDefs: ALL_TYPE_DEFS });
export const PRISMA_SCHEMA = makeExecutableSchema({ typeDefs: PRISMA_TYPE_DEFS });
