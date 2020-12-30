import { mergeTypeDefs } from '@graphql-tools/merge';
import { sdlInputs } from '@paljs/plugins';

import User from './User/typeDefs';

export default mergeTypeDefs([sdlInputs(), User]);
