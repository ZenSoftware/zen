import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs as GlobalTypeDefs } from '../global-schema.gql';
import PALJS_TYPE_DEFS from '../paljs/typeDefs';
import { AuthResolver, typeDefs as AuthTypeDefs } from './Auth';
import { ProductResolver, typeDefs as ProductTypeDefs } from './Product';
import { ReviewResolver, typeDefs as ReviewTypeDefs } from './Review';
import { SampleResolver, typeDefs as SampleTypeDefs } from './Sample';
import { UserResolver, typeDefs as UserTypeDefs } from './User';

export const NEST_RESOLVERS = [
  AuthResolver,
  ProductResolver,
  ReviewResolver,
  SampleResolver,
  UserResolver,
];

export const NEST_TYPE_DEFS = [
  AuthTypeDefs,
  ProductTypeDefs,
  ReviewTypeDefs,
  SampleTypeDefs,
  UserTypeDefs,
].filter(x => x);

export const ALL_TYPE_DEFS = mergeTypeDefs([GlobalTypeDefs, PALJS_TYPE_DEFS, ...NEST_TYPE_DEFS]);
export const GRAPHQL_SCHEMA = makeExecutableSchema({ typeDefs: ALL_TYPE_DEFS });
