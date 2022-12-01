import { mergeTypeDefs } from '@graphql-tools/merge';

import InputTypes from './InputTypes';
import User from './User/typeDefs';

export default mergeTypeDefs([InputTypes, User]);
