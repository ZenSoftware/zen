import Group from './Group/typeDefs'
import Comment from './Comment/typeDefs'
import Post from './Post/typeDefs'
import User from './User/typeDefs'
import { mergeTypes } from 'merge-graphql-schemas'
import { sdlInputs } from '@paljs/plugins'

export default mergeTypes([sdlInputs, User, Post, Comment, Group])
