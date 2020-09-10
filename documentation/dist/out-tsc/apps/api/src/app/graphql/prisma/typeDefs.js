import Group from './Group/typeDefs';
import Comment from './Comment/typeDefs';
import Post from './Post/typeDefs';
import User from './User/typeDefs';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { sdlInputs } from '@paljs/plugins';
export default mergeTypeDefs([sdlInputs, User, Post, Comment, Group]);
//# sourceMappingURL=typeDefs.js.map