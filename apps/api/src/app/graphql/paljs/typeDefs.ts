import { mergeTypeDefs } from '@graphql-tools/merge';

import InputTypes from './InputTypes';
import SchemaExtensions from './SchemaExtensions';
import User from './User/typeDefs';

export default mergeTypeDefs([InputTypes, SchemaExtensions, User]);
