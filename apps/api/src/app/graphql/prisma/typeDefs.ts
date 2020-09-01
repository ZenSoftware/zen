import { sdlInputs } from '@paljs/plugins'
import { mergeTypes } from 'merge-graphql-schemas'

import Comment from './Comment/typeDefs'
import Group from './Group/typeDefs'
import Post from './Post/typeDefs'
import User from './User/typeDefs'

export default mergeTypes([sdlInputs, User, Post, Comment, Group])
