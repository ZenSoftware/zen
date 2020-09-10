import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypeDefs } from '@graphql-tools/merge'

import PRISMA_TYPE_DEFS from '../prisma/typeDefs';
import { AuthResolver, AuthTypeDef } from './Auth';
import { RoleResolver, RoleTypeDef } from './Role';
import { UserResolver, UserTypeDef } from './User';

export const NEST_RESOLVERS = [
  AuthResolver,
  RoleResolver,
  UserResolver
];

export const NEST_TYPE_DEFS = [
  AuthTypeDef,
  RoleTypeDef,
  UserTypeDef
].filter(x => x);

export const ALL_TYPE_DEFS = mergeTypeDefs([PRISMA_TYPE_DEFS, ...NEST_TYPE_DEFS]);

export const GRAPHQL_SCHEMA = makeExecutableSchema({ typeDefs: ALL_TYPE_DEFS });
export const PRISMA_SCHEMA = makeExecutableSchema({ typeDefs: PRISMA_TYPE_DEFS });
