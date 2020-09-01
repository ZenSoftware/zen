import { CommentResolver, CommentTypeDef } from './Comment';
import { GroupResolver, GroupTypeDef } from './Group';
import { PostResolver, PostTypeDef } from './Post';
import { UserResolver, UserTypeDef } from './User';

export const ALL_RESOLVERS = [
  CommentResolver,
  GroupResolver,
  PostResolver,
  UserResolver
];

export const ALL_TYPE_DEFS = [
  CommentTypeDef,
  GroupTypeDef,
  PostTypeDef,
  UserTypeDef
].filter(x => x);
