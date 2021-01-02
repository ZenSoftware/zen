import * as Client from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

import { Context } from './context';

type Resolver<T extends {}, A extends {}, R extends any> = (
  parent: T,
  args: A,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<R>;

export interface Resolvers {
  [key: string]: { [key: string]: Resolver<any, any, any> };
  User?: User;
  Query?: Query;
  Mutation?: Mutation;
  AggregateUser?: AggregateUser;
  BatchPayload?: BatchPayload;
  UserCountAggregateOutputType?: UserCountAggregateOutputType;
  UserAvgAggregateOutputType?: UserAvgAggregateOutputType;
  UserSumAggregateOutputType?: UserSumAggregateOutputType;
  UserMinAggregateOutputType?: UserMinAggregateOutputType;
  UserMaxAggregateOutputType?: UserMaxAggregateOutputType;
}

export interface User {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.User, {}, number>;
  createdAt?: Resolver<Client.User, {}, Date>;
  username?: Resolver<Client.User, {}, string>;
  password?: Resolver<Client.User, {}, string>;
  email?: Resolver<Client.User, {}, string>;
  roles?: Resolver<Client.User, {}, Client.Role[] | null | undefined>;
}

export interface Query {
  [key: string]: Resolver<any, any, any>;
  findFirstUser?: Resolver<{}, FindFirstUserArgs, Client.User | null | undefined>;
  findManyUser?: Resolver<{}, FindManyUserArgs, Client.User[]>;
  findManyUserCount?: Resolver<{}, FindManyUserArgs, number>;
  aggregateUser?: Resolver<
    {},
    AggregateUserArgs,
    Client.Prisma.GetUserAggregateType<AggregateUserArgs>
  >;
  findOneUser?: Resolver<{}, FindOneUserArgs, Client.User | null | undefined>;
}

export interface Mutation {
  [key: string]: Resolver<any, any, any>;
  createOneUser?: Resolver<{}, CreateOneUserArgs, Client.User>;
  deleteOneUser?: Resolver<{}, DeleteOneUserArgs, Client.User | null | undefined>;
  updateOneUser?: Resolver<{}, UpdateOneUserArgs, Client.User | null | undefined>;
  upsertOneUser?: Resolver<{}, UpsertOneUserArgs, Client.User>;
  updateManyUser?: Resolver<{}, UpdateManyUserArgs, Client.Prisma.BatchPayload>;
  deleteManyUser?: Resolver<{}, DeleteManyUserArgs, Client.Prisma.BatchPayload>;
  executeRaw?: Resolver<{}, ExecuteRawArgs, undefined>;
  queryRaw?: Resolver<{}, QueryRawArgs, undefined>;
}

export interface AggregateUser {
  [key: string]: Resolver<any, any, any>;
  count?: Resolver<
    Client.AggregateUser,
    {},
    Client.UserCountAggregateOutputType | null | undefined
  >;
  avg?: Resolver<Client.AggregateUser, {}, Client.UserAvgAggregateOutputType | null | undefined>;
  sum?: Resolver<Client.AggregateUser, {}, Client.UserSumAggregateOutputType | null | undefined>;
  min?: Resolver<Client.AggregateUser, {}, Client.UserMinAggregateOutputType | null | undefined>;
  max?: Resolver<Client.AggregateUser, {}, Client.UserMaxAggregateOutputType | null | undefined>;
}

export interface BatchPayload {
  [key: string]: Resolver<any, any, any>;
  count?: Resolver<Client.Prisma.BatchPayload, {}, number>;
}

export interface UserCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.UserCountAggregateOutputType, {}, number>;
  createdAt?: Resolver<Client.UserCountAggregateOutputType, {}, number | null | undefined>;
  username?: Resolver<Client.UserCountAggregateOutputType, {}, number | null | undefined>;
  password?: Resolver<Client.UserCountAggregateOutputType, {}, number | null | undefined>;
  email?: Resolver<Client.UserCountAggregateOutputType, {}, number | null | undefined>;
  roles?: Resolver<Client.UserCountAggregateOutputType, {}, number | null | undefined>;
  _all?: Resolver<Client.UserCountAggregateOutputType, {}, number>;
}

export interface UserAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.UserAvgAggregateOutputType, {}, number>;
}

export interface UserSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.UserSumAggregateOutputType, {}, number>;
}

export interface UserMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.UserMinAggregateOutputType, {}, number>;
  createdAt?: Resolver<Client.UserMinAggregateOutputType, {}, Date | null | undefined>;
  username?: Resolver<Client.UserMinAggregateOutputType, {}, string | null | undefined>;
  password?: Resolver<Client.UserMinAggregateOutputType, {}, string | null | undefined>;
  email?: Resolver<Client.UserMinAggregateOutputType, {}, string | null | undefined>;
}

export interface UserMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.UserMaxAggregateOutputType, {}, number>;
  createdAt?: Resolver<Client.UserMaxAggregateOutputType, {}, Date | null | undefined>;
  username?: Resolver<Client.UserMaxAggregateOutputType, {}, string | null | undefined>;
  password?: Resolver<Client.UserMaxAggregateOutputType, {}, string | null | undefined>;
  email?: Resolver<Client.UserMaxAggregateOutputType, {}, string | null | undefined>;
}

export interface FindFirstUserArgs {
  where?: UserWhereInput | null;
  orderBy?: UserOrderByInput[] | null;
  cursor?: UserWhereUniqueInput | null;
  take?: number | null;
  skip?: number | null;
  distinct?: UserScalarFieldEnum[] | null;
}

export interface FindManyUserArgs {
  where?: UserWhereInput;
  orderBy?: UserOrderByInput[];
  cursor?: UserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: UserScalarFieldEnum[];
}

export interface AggregateUserArgs {
  where?: UserWhereInput;
  orderBy?: UserOrderByInput[];
  cursor?: UserWhereUniqueInput;
  take?: number;
  skip?: number;
  count?: true;
  avg?: Client.Prisma.UserAvgAggregateInputType;
  sum?: Client.Prisma.UserSumAggregateInputType;
  min?: Client.Prisma.UserMinAggregateInputType;
  max?: Client.Prisma.UserMaxAggregateInputType;
}

export interface FindOneUserArgs {
  where: UserWhereUniqueInput | null;
}

export interface CreateOneUserArgs {
  data: UserCreateInput;
}

export interface DeleteOneUserArgs {
  where: UserWhereUniqueInput | null;
}

export interface UpdateOneUserArgs {
  data: UserUpdateInput | null;
  where: UserWhereUniqueInput | null;
}

export interface UpsertOneUserArgs {
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
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
  parameters?: undefined;
}

export interface QueryRawArgs {
  query: string;
  parameters?: undefined;
}

export interface UserWhereInput {
  AND?: UserWhereInput[];
  OR?: UserWhereInput[];
  NOT?: UserWhereInput[];
  id?: IntFilter;
  createdAt?: DateTimeFilter;
  username?: StringFilter;
  password?: StringFilter;
  email?: StringFilter;
  roles?: EnumRoleNullableListFilter;
}

export interface UserOrderByInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  roles?: SortOrder;
}

export interface UserWhereUniqueInput {
  id?: number;
  username?: string;
  email?: string;
}

export interface UserCreateInput {
  createdAt?: Date;
  username: string;
  password: string;
  email: string;
  roles?: UserCreaterolesInput;
}

export interface UserUpdateInput {
  createdAt?: DateTimeFieldUpdateOperationsInput;
  username?: StringFieldUpdateOperationsInput;
  password?: StringFieldUpdateOperationsInput;
  email?: StringFieldUpdateOperationsInput;
  roles?: UserUpdaterolesInput;
}

export interface UserUpdateManyMutationInput {
  createdAt?: DateTimeFieldUpdateOperationsInput;
  username?: StringFieldUpdateOperationsInput;
  password?: StringFieldUpdateOperationsInput;
  email?: StringFieldUpdateOperationsInput;
  roles?: UserUpdaterolesInput;
}

export interface IntFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter;
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

export interface EnumRoleNullableListFilter {
  equals?: Role[] | null;
}

export interface UserCreaterolesInput {
  set: Role[];
}

export interface DateTimeFieldUpdateOperationsInput {
  set?: Date;
}

export interface StringFieldUpdateOperationsInput {
  set?: string;
}

export interface UserUpdaterolesInput {
  set: Role[];
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

export enum UserScalarFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
  username = 'username',
  password = 'password',
  email = 'email',
  roles = 'roles',
}
export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
export enum QueryMode {
  default = 'default',
  insensitive = 'insensitive',
}
export enum Role {
  Registered = 'Registered',
  Admin = 'Admin',
  Supery = 'Supery',
}
