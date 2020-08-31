import User from './User/typeDefs'
import Group from './Group/typeDefs'
import Post from './Post/typeDefs'
import Comment from './Comment/typeDefs'
import { mergeTypes } from 'merge-graphql-schemas'
import { sdlInputs } from '@paljs/plugins'

export default mergeTypes([sdlInputs, Comment, Post, Group, User])
