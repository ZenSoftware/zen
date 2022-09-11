import { mergeTypeDefs } from '@graphql-tools/merge';

import SDLInputs from './sdl-inputs';
import User from './User/typeDefs';

export default mergeTypeDefs([SDLInputs, User]);
