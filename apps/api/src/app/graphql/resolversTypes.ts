import { GraphQLResolveInfo } from 'graphql';

import * as Client from '../prisma';
import { Context } from './context';

type Resolver<T extends {}, A extends {}, R extends any> = (
  parent: T,
  args: A,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<R>;

export type Resolvers = {
  [key: string]: { [key: string]: Resolver<any, any, any> };
} & {
  User?: User;
  Query?: Query;
  Mutation?: Mutation;
  AggregateUser?: AggregateUser;
  UserGroupByOutputType?: UserGroupByOutputType;
  AffectedRowsOutput?: AffectedRowsOutput;
  UserCountAggregateOutputType?: UserCountAggregateOutputType;
  UserMinAggregateOutputType?: UserMinAggregateOutputType;
  UserMaxAggregateOutputType?: UserMaxAggregateOutputType;
};

export type User = { [key: string]: Resolver<any, any, any> } & {
  id?: Resolver<Client.User, {}, string>;
  createdAt?: Resolver<Client.User, {}, Date>;
  username?: Resolver<Client.User, {}, string | null>;
  password?: Resolver<Client.User, {}, string | null>;
  email?: Resolver<Client.User, {}, string>;
  roles?: Resolver<Client.User, {}, string[] | null>;
  googleId?: Resolver<Client.User, {}, string | null>;
  googleProfile?: Resolver<Client.User, {}, any | null>;
};

export type Query = { [key: string]: Resolver<any, any, any> } & {
  findFirstUser?: Resolver<{}, FindFirstUserArgs, Client.User | null>;
  findFirstUserOrThrow?: Resolver<{}, FindFirstUserOrThrowArgs, Client.User | null>;
  findManyUser?: Resolver<{}, FindManyUserArgs, Client.User[]>;
  findManyUserCount?: Resolver<{}, FindManyUserArgs, number>;
  aggregateUser?: Resolver<
    {},
    AggregateUserArgs,
    Client.Prisma.GetUserAggregateType<AggregateUserArgs>
  >;
  groupByUser?: Resolver<{}, GroupByUserArgs, Client.Prisma.UserGroupByOutputType[]>;
  findUniqueUser?: Resolver<{}, FindUniqueUserArgs, Client.User | null>;
  findUniqueUserOrThrow?: Resolver<{}, FindUniqueUserOrThrowArgs, Client.User | null>;
};

export type Mutation = { [key: string]: Resolver<any, any, any> } & {
  createOneUser?: Resolver<{}, CreateOneUserArgs, Client.User>;
  upsertOneUser?: Resolver<{}, UpsertOneUserArgs, Client.User>;
  createManyUser?: Resolver<{}, CreateManyUserArgs, Client.Prisma.BatchPayload>;
  deleteOneUser?: Resolver<{}, DeleteOneUserArgs, Client.User | null>;
  updateOneUser?: Resolver<{}, UpdateOneUserArgs, Client.User | null>;
  updateManyUser?: Resolver<{}, UpdateManyUserArgs, Client.Prisma.BatchPayload>;
  deleteManyUser?: Resolver<{}, DeleteManyUserArgs, Client.Prisma.BatchPayload>;
  executeRaw?: Resolver<{}, ExecuteRawArgs, any>;
  queryRaw?: Resolver<{}, QueryRawArgs, any>;
};

export type AggregateUser = { [key: string]: Resolver<any, any, any> } & {
  _count?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserCountAggregateOutputType | null
  >;
  _min?: Resolver<Client.Prisma.AggregateUser, {}, Client.Prisma.UserMinAggregateOutputType | null>;
  _max?: Resolver<Client.Prisma.AggregateUser, {}, Client.Prisma.UserMaxAggregateOutputType | null>;
};

export type UserGroupByOutputType = {
  [key: string]: Resolver<any, any, any>;
} & {
  id?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>;
  createdAt?: Resolver<Client.Prisma.UserGroupByOutputType, {}, Date>;
  username?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string | null>;
  password?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string | null>;
  email?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>;
  roles?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string[] | null>;
  googleId?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string | null>;
  googleProfile?: Resolver<Client.Prisma.UserGroupByOutputType, {}, any | null>;
  _count?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserCountAggregateOutputType | null
  >;
  _min?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserMinAggregateOutputType | null
  >;
  _max?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserMaxAggregateOutputType | null
  >;
};

export type AffectedRowsOutput = { [key: string]: Resolver<any, any, any> } & {
  count?: Resolver<Client.Prisma.BatchPayload, {}, number>;
};

export type UserCountAggregateOutputType = {
  [key: string]: Resolver<any, any, any>;
} & {
  id?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  createdAt?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  username?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  password?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  email?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  roles?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  googleId?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  googleProfile?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  _all?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
};

export type UserMinAggregateOutputType = {
  [key: string]: Resolver<any, any, any>;
} & {
  id?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
  createdAt?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, Date | null>;
  username?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
  password?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
  email?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
  googleId?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
};

export type UserMaxAggregateOutputType = {
  [key: string]: Resolver<any, any, any>;
} & {
  id?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
  createdAt?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, Date | null>;
  username?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
  password?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
  email?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
  googleId?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
};

export interface FindFirstUserArgs {
  where?: UserWhereInput | null;
  orderBy?: UserOrderByWithRelationInput[] | null;
  cursor?: UserWhereUniqueInput | null;
  take?: number | null;
  skip?: number | null;
  distinct?: UserScalarFieldEnum[] | null;
}

export interface FindFirstUserOrThrowArgs {
  where?: UserWhereInput | null;
  orderBy?: UserOrderByWithRelationInput[] | null;
  cursor?: UserWhereUniqueInput | null;
  take?: number | null;
  skip?: number | null;
  distinct?: UserScalarFieldEnum[] | null;
}

export interface FindManyUserArgs {
  where?: UserWhereInput;
  orderBy?: UserOrderByWithRelationInput[];
  cursor?: UserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: UserScalarFieldEnum[];
}

export interface AggregateUserArgs {
  where?: UserWhereInput;
  orderBy?: UserOrderByWithRelationInput[];
  cursor?: UserWhereUniqueInput;
  take?: number;
  skip?: number;
  _count?: Client.Prisma.UserCountAggregateInputType;
  _min?: Client.Prisma.UserMinAggregateInputType;
  _max?: Client.Prisma.UserMaxAggregateInputType;
}

export interface GroupByUserArgs {
  where?: UserWhereInput;
  orderBy?: UserOrderByWithAggregationInput[];
  by: UserScalarFieldEnum[];
  having?: UserScalarWhereWithAggregatesInput;
  take?: number;
  skip?: number;
}

export interface FindUniqueUserArgs {
  where: UserWhereUniqueInput | null;
}

export interface FindUniqueUserOrThrowArgs {
  where: UserWhereUniqueInput | null;
}

export interface CreateOneUserArgs {
  data: UserCreateInput;
}

export interface UpsertOneUserArgs {
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
}

export interface CreateManyUserArgs {
  data: UserCreateManyInput[];
  skipDuplicates?: boolean;
}

export interface DeleteOneUserArgs {
  where: UserWhereUniqueInput | null;
}

export interface UpdateOneUserArgs {
  data: UserUpdateInput | null;
  where: UserWhereUniqueInput | null;
}

export interface UpdateManyUserArgs {
  data: UserUpdateManyMutationInput;
  where?: UserWhereInput;
}

export interface DeleteManyUserArgs {
  where?: UserWhereInput;
}

export interface ExecuteRawArgs {
  query: string;
  parameters?: any;
}

export interface QueryRawArgs {
  query: string;
  parameters?: any;
}

export interface UserWhereInput {
  AND?: UserWhereInput[];
  OR?: UserWhereInput[];
  NOT?: UserWhereInput[];
  id?: StringFilter;
  createdAt?: DateTimeFilter;
  username?: StringNullableFilter | null;
  password?: StringNullableFilter | null;
  email?: StringFilter;
  roles?: StringNullableListFilter;
  googleId?: StringNullableFilter | null;
  googleProfile?: JsonNullableFilter;
}

export interface UserOrderByWithRelationInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  roles?: SortOrder;
  googleId?: SortOrder;
  googleProfile?: SortOrder;
}

export interface UserWhereUniqueInput {
  id?: string;
  username?: string;
  email?: string;
  googleId?: string;
}

export interface UserOrderByWithAggregationInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  roles?: SortOrder;
  googleId?: SortOrder;
  googleProfile?: SortOrder;
  _count?: UserCountOrderByAggregateInput;
  _max?: UserMaxOrderByAggregateInput;
  _min?: UserMinOrderByAggregateInput;
}

export interface UserScalarWhereWithAggregatesInput {
  AND?: UserScalarWhereWithAggregatesInput[];
  OR?: UserScalarWhereWithAggregatesInput[];
  NOT?: UserScalarWhereWithAggregatesInput[];
  id?: StringWithAggregatesFilter;
  createdAt?: DateTimeWithAggregatesFilter;
  username?: StringNullableWithAggregatesFilter | null;
  password?: StringNullableWithAggregatesFilter | null;
  email?: StringWithAggregatesFilter;
  roles?: StringNullableListFilter;
  googleId?: StringNullableWithAggregatesFilter | null;
  googleProfile?: JsonNullableWithAggregatesFilter;
}

export interface UserCreateInput {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email: string;
  roles?: UserCreaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface UserUncheckedCreateInput {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email: string;
  roles?: UserCreaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface UserUpdateInput {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: UserUpdaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface UserUncheckedUpdateInput {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: UserUpdaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface UserCreateManyInput {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email: string;
  roles?: UserCreaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface UserUpdateManyMutationInput {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: UserUpdaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface UserUncheckedUpdateManyInput {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: UserUpdaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface StringFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: QueryMode;
  not?: NestedStringFilter;
}

export interface DateTimeFilter {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
  not?: NestedDateTimeFilter;
}

export interface StringNullableFilter {
  equals?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: QueryMode;
  not?: NestedStringNullableFilter | null;
}

export interface StringNullableListFilter {
  equals?: string[] | null;
  has?: string | null;
  hasEvery?: string[];
  hasSome?: string[];
  isEmpty?: boolean;
}

export interface JsonNullableFilter {
  equals?: any;
  path?: string[];
  string_contains?: string;
  string_starts_with?: string;
  string_ends_with?: string;
  array_contains?: any | null;
  array_starts_with?: any | null;
  array_ends_with?: any | null;
  lt?: any;
  lte?: any;
  gt?: any;
  gte?: any;
  not?: any;
}

export interface UserCountOrderByAggregateInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  roles?: SortOrder;
  googleId?: SortOrder;
  googleProfile?: SortOrder;
}

export interface UserMaxOrderByAggregateInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  googleId?: SortOrder;
}

export interface UserMinOrderByAggregateInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  googleId?: SortOrder;
}

export interface StringWithAggregatesFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: QueryMode;
  not?: NestedStringWithAggregatesFilter;
  _count?: NestedIntFilter;
  _min?: NestedStringFilter;
  _max?: NestedStringFilter;
}

export interface DateTimeWithAggregatesFilter {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
  not?: NestedDateTimeWithAggregatesFilter;
  _count?: NestedIntFilter;
  _min?: NestedDateTimeFilter;
  _max?: NestedDateTimeFilter;
}

export interface StringNullableWithAggregatesFilter {
  equals?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: QueryMode;
  not?: NestedStringNullableWithAggregatesFilter | null;
  _count?: NestedIntNullableFilter;
  _min?: NestedStringNullableFilter;
  _max?: NestedStringNullableFilter;
}

export interface JsonNullableWithAggregatesFilter {
  equals?: any;
  path?: string[];
  string_contains?: string;
  string_starts_with?: string;
  string_ends_with?: string;
  array_contains?: any | null;
  array_starts_with?: any | null;
  array_ends_with?: any | null;
  lt?: any;
  lte?: any;
  gt?: any;
  gte?: any;
  not?: any;
  _count?: NestedIntNullableFilter;
  _min?: NestedJsonNullableFilter;
  _max?: NestedJsonNullableFilter;
}

export interface UserCreaterolesInput {
  set: string[];
}

export interface StringFieldUpdateOperationsInput {
  set?: string;
}

export interface DateTimeFieldUpdateOperationsInput {
  set?: Date;
}

export interface NullableStringFieldUpdateOperationsInput {
  set?: string | null;
}

export interface UserUpdaterolesInput {
  set?: string[];
  push?: string;
}

export interface NestedStringFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringFilter;
}

export interface NestedDateTimeFilter {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
  not?: NestedDateTimeFilter;
}

export interface NestedStringNullableFilter {
  equals?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringNullableFilter | null;
}

export interface NestedStringWithAggregatesFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringWithAggregatesFilter;
  _count?: NestedIntFilter;
  _min?: NestedStringFilter;
  _max?: NestedStringFilter;
}

export interface NestedIntFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter;
}

export interface NestedDateTimeWithAggregatesFilter {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
  not?: NestedDateTimeWithAggregatesFilter;
  _count?: NestedIntFilter;
  _min?: NestedDateTimeFilter;
  _max?: NestedDateTimeFilter;
}

export interface NestedStringNullableWithAggregatesFilter {
  equals?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringNullableWithAggregatesFilter | null;
  _count?: NestedIntNullableFilter;
  _min?: NestedStringNullableFilter;
  _max?: NestedStringNullableFilter;
}

export interface NestedIntNullableFilter {
  equals?: number | null;
  in?: number[] | null;
  notIn?: number[] | null;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntNullableFilter | null;
}

export interface NestedJsonNullableFilter {
  equals?: any;
  path?: string[];
  string_contains?: string;
  string_starts_with?: string;
  string_ends_with?: string;
  array_contains?: any | null;
  array_starts_with?: any | null;
  array_ends_with?: any | null;
  lt?: any;
  lte?: any;
  gt?: any;
  gte?: any;
  not?: any;
}

export enum JsonNullValueFilter {
  DbNull = 'DbNull',
  JsonNull = 'JsonNull',
  AnyNull = 'AnyNull',
}
export enum NullableJsonNullValueInput {
  DbNull = 'DbNull',
  JsonNull = 'JsonNull',
}
export enum QueryMode {
  default = 'default',
  insensitive = 'insensitive',
}
export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
export enum TransactionIsolationLevel {
  ReadUncommitted = 'ReadUncommitted',
  ReadCommitted = 'ReadCommitted',
  RepeatableRead = 'RepeatableRead',
  Serializable = 'Serializable',
}
export enum UserScalarFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
  username = 'username',
  password = 'password',
  email = 'email',
  roles = 'roles',
  googleId = 'googleId',
  googleProfile = 'googleProfile',
}
