import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from 'graphql-tools';
import PRISMA_TYPE_DEFS from '../prisma/typeDefs';
import { CommentResolver, CommentTypeDef } from './Comment';
import { GroupResolver, GroupTypeDef } from './Group';
import { PostResolver, PostTypeDef } from './Post';
import { UserResolver, UserTypeDef } from './User';
export const NEST_RESOLVERS = [CommentResolver, GroupResolver, PostResolver, UserResolver];
export const NEST_TYPE_DEFS = [CommentTypeDef, GroupTypeDef, PostTypeDef, UserTypeDef].filter(x => x);
export const ALL_TYPE_DEFS = mergeTypeDefs([PRISMA_TYPE_DEFS, ...NEST_TYPE_DEFS]);
export const GRAPHQL_SCHEMA = makeExecutableSchema({ typeDefs: ALL_TYPE_DEFS });
export const PRISMA_SCHEMA = makeExecutableSchema({ typeDefs: PRISMA_TYPE_DEFS });
//# sourceMappingURL=index.js.map