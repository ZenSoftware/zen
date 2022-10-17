import { mergeTypeDefs } from '@graphql-tools/merge';

import Product from './Product/typeDefs';
import Review from './Review/typeDefs';
import SDLInputs from './sdl-inputs';
import User from './User/typeDefs';

export default mergeTypeDefs([SDLInputs, Product, Review, User]);
