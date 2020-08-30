import { CommentResolver } from './Comment';
import { GroupResolver } from './Group';
import { PostResolver } from './Post';
import { UserResolver } from './User';

export const ALL_RESOLVERS = [
  CommentResolver,
  GroupResolver,
  PostResolver,
  UserResolver
];
