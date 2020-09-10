import { mergeTypeDefs } from '@graphql-tools/merge'
import { sdlInputs } from '@paljs/plugins'

import Role from './Role/typeDefs'
import User from './User/typeDefs'

export default mergeTypeDefs([sdlInputs, User, Role])
