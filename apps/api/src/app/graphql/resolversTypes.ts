import { GetAggregateResult } from '@prisma/client/runtime/library';
import { GraphQLResolveInfo } from 'graphql';

import * as Client from '../prisma';
import { Context } from './context';

type Resolver<T extends {}, A extends {}, R extends any> = (
  parent: T,
  args: A,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<R>;

type NoExpand<T> = T extends unknown ? T : never;

type AtLeast<O extends object, K extends string> = NoExpand<
  O extends unknown
    ?
        | (K extends keyof O ? { [P in K]: O[P] } & O : O)
        | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
    : never
>;

export type Resolvers = {
  [key: string]: { [key: string]: Resolver<any, any, any> };
} & {
  User?: User;
  CreateManyUserAndReturnOutputType?: CreateManyUserAndReturnOutputType;
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

export type CreateManyUserAndReturnOutputType = {
  [key: string]: Resolver<any, any, any>;
} & {
  id?: Resolver<Client.Prisma.CreateManyUserAndReturnOutputType, {}, string>;
  createdAt?: Resolver<Client.Prisma.CreateManyUserAndReturnOutputType, {}, Date>;
  username?: Resolver<Client.Prisma.CreateManyUserAndReturnOutputType, {}, string | null>;
  password?: Resolver<Client.Prisma.CreateManyUserAndReturnOutputType, {}, string | null>;
  email?: Resolver<Client.Prisma.CreateManyUserAndReturnOutputType, {}, string>;
  roles?: Resolver<Client.Prisma.CreateManyUserAndReturnOutputType, {}, string[] | null>;
  googleId?: Resolver<Client.Prisma.CreateManyUserAndReturnOutputType, {}, string | null>;
  googleProfile?: Resolver<Client.Prisma.CreateManyUserAndReturnOutputType, {}, any | null>;
};

export type Query = { [key: string]: Resolver<any, any, any> } & {
  findFirstUser?: Resolver<{}, FindFirstUserArgs, Client.User | null>;
  findFirstUserOrThrow?: Resolver<{}, FindFirstUserOrThrowArgs, Client.User | null>;
  findManyUser?: Resolver<{}, FindManyUserArgs, Client.User[]>;
  findManyUserCount?: Resolver<{}, FindManyUserArgs, number>;
  aggregateUser?: Resolver<
    {},
    AggregateUserArgs,
    GetAggregateResult<Client.Prisma.$UserPayload, AggregateUserArgs>
  >;
  groupByUser?: Resolver<{}, GroupByUserArgs, Client.Prisma.UserGroupByOutputType[]>;
  findUniqueUser?: Resolver<{}, FindUniqueUserArgs, Client.User | null>;
  findUniqueUserOrThrow?: Resolver<{}, FindUniqueUserOrThrowArgs, Client.User | null>;
};

export type Mutation = { [key: string]: Resolver<any, any, any> } & {
  createOneUser?: Resolver<{}, CreateOneUserArgs, Client.User>;
  upsertOneUser?: Resolver<{}, UpsertOneUserArgs, Client.User>;
  createManyUser?: Resolver<{}, CreateManyUserArgs, Client.Prisma.BatchPayload>;
  createManyUserAndReturn?: Resolver<
    {},
    CreateManyUserAndReturnArgs,
    Client.Prisma.CreateManyUserAndReturnOutputType[]
  >;
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

export type FindFirstUserArgs = {
  where?: UserWhereInput;
  orderBy?: UserOrderByWithRelationInput[];
  cursor?: UserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: UserScalarFieldEnum[];
};

export type FindFirstUserOrThrowArgs = {
  where?: UserWhereInput;
  orderBy?: UserOrderByWithRelationInput[];
  cursor?: UserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: UserScalarFieldEnum[];
};

export type FindManyUserArgs = {
  where?: UserWhereInput;
  orderBy?: UserOrderByWithRelationInput[];
  cursor?: UserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: UserScalarFieldEnum[];
};

export type AggregateUserArgs = {
  where?: UserWhereInput;
  orderBy?: UserOrderByWithRelationInput[];
  cursor?: UserWhereUniqueInput;
  take?: number;
  skip?: number;
  _count?: Client.Prisma.UserCountAggregateInputType;
  _min?: Client.Prisma.UserMinAggregateInputType;
  _max?: Client.Prisma.UserMaxAggregateInputType;
};

export type GroupByUserArgs = {
  where?: UserWhereInput;
  orderBy?: UserOrderByWithAggregationInput[];
  by: UserScalarFieldEnum[];
  having?: UserScalarWhereWithAggregatesInput;
  take?: number;
  skip?: number;
};

export type FindUniqueUserArgs = {
  where: UserWhereUniqueInput;
};

export type FindUniqueUserOrThrowArgs = {
  where: UserWhereUniqueInput;
};

export type CreateOneUserArgs = {
  data: UserCreateInput;
};

export type UpsertOneUserArgs = {
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
};

export type CreateManyUserArgs = {
  data: UserCreateManyInput[];
  skipDuplicates?: boolean;
};

export type CreateManyUserAndReturnArgs = {
  data: UserCreateManyInput[];
  skipDuplicates?: boolean;
};

export type DeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};

export type UpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UpdateManyUserArgs = {
  data: UserUpdateManyMutationInput;
  where?: UserWhereInput;
};

export type DeleteManyUserArgs = {
  where?: UserWhereInput;
};

export type ExecuteRawArgs = {
  query: string;
  parameters?: any;
};

export type QueryRawArgs = {
  query: string;
  parameters?: any;
};

export type UserWhereInput = {
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
};

export type UserOrderByWithRelationInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrderInput;
  password?: SortOrderInput;
  email?: SortOrder;
  roles?: SortOrder;
  googleId?: SortOrderInput;
  googleProfile?: SortOrderInput;
};

export type UserWhereUniqueInput = AtLeast<
  {
    id?: string;
    username?: string;
    email?: string;
    googleId?: string;
    AND?: UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput[];
    createdAt?: DateTimeFilter;
    password?: StringNullableFilter | null;
    roles?: StringNullableListFilter;
    googleProfile?: JsonNullableFilter;
  },
  'id' | 'username' | 'email' | 'googleId'
>;

export type UserOrderByWithAggregationInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrderInput;
  password?: SortOrderInput;
  email?: SortOrder;
  roles?: SortOrder;
  googleId?: SortOrderInput;
  googleProfile?: SortOrderInput;
  _count?: UserCountOrderByAggregateInput;
  _max?: UserMaxOrderByAggregateInput;
  _min?: UserMinOrderByAggregateInput;
};

export type UserScalarWhereWithAggregatesInput = {
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
};

export type UserCreateInput = {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email: string;
  roles?: string[];
  googleId?: string | null;
  googleProfile?: any;
};

export type UserUncheckedCreateInput = {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email: string;
  roles?: string[];
  googleId?: string | null;
  googleProfile?: any;
};

export type UserUpdateInput = {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: string[];
  googleId?: string | null;
  googleProfile?: any;
};

export type UserUncheckedUpdateInput = {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: string[];
  googleId?: string | null;
  googleProfile?: any;
};

export type UserCreateManyInput = {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email: string;
  roles?: string[];
  googleId?: string | null;
  googleProfile?: any;
};

export type UserUpdateManyMutationInput = {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: string[];
  googleId?: string | null;
  googleProfile?: any;
};

export type UserUncheckedUpdateManyInput = {
  id?: string;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: string[];
  googleId?: string | null;
  googleProfile?: any;
};

export type StringFilter = {
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
};

export type DateTimeFilter = {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
  not?: NestedDateTimeFilter;
};

export type StringNullableFilter = {
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
};

export type StringNullableListFilter = {
  equals?: string[] | null;
  has?: string | null;
  hasEvery?: string[];
  hasSome?: string[];
  isEmpty?: boolean;
};

export type JsonNullableFilter = {
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
};

export type SortOrderInput = {
  sort: SortOrder;
  nulls?: NullsOrder;
};

export type UserCountOrderByAggregateInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  roles?: SortOrder;
  googleId?: SortOrder;
  googleProfile?: SortOrder;
};

export type UserMaxOrderByAggregateInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  googleId?: SortOrder;
};

export type UserMinOrderByAggregateInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  googleId?: SortOrder;
};

export type StringWithAggregatesFilter = {
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
};

export type DateTimeWithAggregatesFilter = {
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
};

export type StringNullableWithAggregatesFilter = {
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
};

export type JsonNullableWithAggregatesFilter = {
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
};

export type UserCreaterolesInput = {
  set: string[];
};

export type StringFieldUpdateOperationsInput = {
  set?: string;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null;
};

export type UserUpdaterolesInput = {
  set?: string[];
  push?: string[];
};

export type NestedStringFilter = {
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
};

export type NestedDateTimeFilter = {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
  not?: NestedDateTimeFilter;
};

export type NestedStringNullableFilter = {
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
};

export type NestedStringWithAggregatesFilter = {
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
};

export type NestedIntFilter = {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter;
};

export type NestedDateTimeWithAggregatesFilter = {
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
};

export type NestedStringNullableWithAggregatesFilter = {
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
};

export type NestedIntNullableFilter = {
  equals?: number | null;
  in?: number[] | null;
  notIn?: number[] | null;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntNullableFilter | null;
};

export type NestedJsonNullableFilter = {
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
};

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
export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
export enum NullableJsonNullValueInput {
  DbNull = 'DbNull',
  JsonNull = 'JsonNull',
}
export enum QueryMode {
  default = 'default',
  insensitive = 'insensitive',
}
export enum JsonNullValueFilter {
  DbNull = 'DbNull',
  JsonNull = 'JsonNull',
  AnyNull = 'AnyNull',
}
export enum NullsOrder {
  first = 'first',
  last = 'last',
}
