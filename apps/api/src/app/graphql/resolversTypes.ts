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
  UserGroupByOutputType?: UserGroupByOutputType;
  AffectedRowsOutput?: AffectedRowsOutput;
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
  roles?: Resolver<Client.User, {}, Client.Role[] | null>;
}

export interface Query {
  [key: string]: Resolver<any, any, any>;
  findFirstUser?: Resolver<{}, FindFirstUserArgs, Client.User | null>;
  findManyUser?: Resolver<{}, FindManyUserArgs, Client.User[]>;
  findManyUserCount?: Resolver<{}, FindManyUserArgs, number>;
  aggregateUser?: Resolver<
    {},
    AggregateUserArgs,
    Client.Prisma.GetUserAggregateType<AggregateUserArgs>
  >;
  groupByUser?: Resolver<{}, GroupByUserArgs, Client.UserGroupByOutputType[]>;
  findUniqueUser?: Resolver<{}, FindUniqueUserArgs, Client.User | null>;
}

export interface Mutation {
  [key: string]: Resolver<any, any, any>;
  createOneUser?: Resolver<{}, CreateOneUserArgs, Client.User>;
  upsertOneUser?: Resolver<{}, UpsertOneUserArgs, Client.User>;
  createManyUser?: Resolver<{}, CreateManyUserArgs, Client.Prisma.BatchPayload>;
  deleteOneUser?: Resolver<{}, DeleteOneUserArgs, Client.User | null>;
  updateOneUser?: Resolver<{}, UpdateOneUserArgs, Client.User | null>;
  updateManyUser?: Resolver<{}, UpdateManyUserArgs, Client.Prisma.BatchPayload>;
  deleteManyUser?: Resolver<{}, DeleteManyUserArgs, Client.Prisma.BatchPayload>;
  executeRaw?: Resolver<{}, ExecuteRawArgs, any>;
  queryRaw?: Resolver<{}, QueryRawArgs, any>;
}

export interface AggregateUser {
  [key: string]: Resolver<any, any, any>;
  count?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserCountAggregateOutputType | null
  >;
  avg?: Resolver<Client.Prisma.AggregateUser, {}, Client.Prisma.UserAvgAggregateOutputType | null>;
  sum?: Resolver<Client.Prisma.AggregateUser, {}, Client.Prisma.UserSumAggregateOutputType | null>;
  min?: Resolver<Client.Prisma.AggregateUser, {}, Client.Prisma.UserMinAggregateOutputType | null>;
  max?: Resolver<Client.Prisma.AggregateUser, {}, Client.Prisma.UserMaxAggregateOutputType | null>;
}

export interface UserGroupByOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.UserGroupByOutputType, {}, number>;
  createdAt?: Resolver<Client.UserGroupByOutputType, {}, Date>;
  username?: Resolver<Client.UserGroupByOutputType, {}, string>;
  password?: Resolver<Client.UserGroupByOutputType, {}, string>;
  email?: Resolver<Client.UserGroupByOutputType, {}, string>;
  roles?: Resolver<Client.UserGroupByOutputType, {}, Client.Role[] | null>;
  count?: Resolver<
    Client.UserGroupByOutputType,
    {},
    Client.Prisma.UserCountAggregateOutputType | null
  >;
  avg?: Resolver<Client.UserGroupByOutputType, {}, Client.Prisma.UserAvgAggregateOutputType | null>;
  sum?: Resolver<Client.UserGroupByOutputType, {}, Client.Prisma.UserSumAggregateOutputType | null>;
  min?: Resolver<Client.UserGroupByOutputType, {}, Client.Prisma.UserMinAggregateOutputType | null>;
  max?: Resolver<Client.UserGroupByOutputType, {}, Client.Prisma.UserMaxAggregateOutputType | null>;
}

export interface AffectedRowsOutput {
  [key: string]: Resolver<any, any, any>;
  count?: Resolver<Client.Prisma.BatchPayload, {}, number>;
}

export interface UserCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  createdAt?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number | null>;
  username?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number | null>;
  password?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number | null>;
  email?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number | null>;
  roles?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number | null>;
  _all?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
}

export interface UserAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserAvgAggregateOutputType, {}, number>;
}

export interface UserSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserSumAggregateOutputType, {}, number>;
}

export interface UserMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, number>;
  createdAt?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, Date | null>;
  username?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
  password?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
  email?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
}

export interface UserMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, number>;
  createdAt?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, Date | null>;
  username?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
  password?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
  email?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
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

export interface GroupByUserArgs {
  where?: UserWhereInput;
  orderBy?: UserOrderByInput[];
  by: UserScalarFieldEnum[];
  having?: UserScalarWhereWithAggregatesInput;
  take?: number;
  skip?: number;
}

export interface FindUniqueUserArgs {
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

export interface UserScalarWhereWithAggregatesInput {
  AND?: UserScalarWhereWithAggregatesInput[];
  OR?: UserScalarWhereWithAggregatesInput[];
  NOT?: UserScalarWhereWithAggregatesInput[];
  id?: IntWithAggregatesFilter;
  createdAt?: DateTimeWithAggregatesFilter;
  username?: StringWithAggregatesFilter;
  password?: StringWithAggregatesFilter;
  email?: StringWithAggregatesFilter;
  roles?: EnumRoleNullableListFilter;
}

export interface UserCreateInput {
  createdAt?: Date;
  username: string;
  password: string;
  email: string;
  roles?: UserCreaterolesInput;
}

export interface UserUncheckedCreateInput {
  id?: number;
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

export interface UserUncheckedUpdateInput {
  id?: IntFieldUpdateOperationsInput;
  createdAt?: DateTimeFieldUpdateOperationsInput;
  username?: StringFieldUpdateOperationsInput;
  password?: StringFieldUpdateOperationsInput;
  email?: StringFieldUpdateOperationsInput;
  roles?: UserUpdaterolesInput;
}

export interface UserCreateManyInput {
  id?: number;
  createdAt?: Date;
  username: string;
  password: string;
  email: string;
  roles?: UserCreateManyrolesInput;
}

export interface UserUpdateManyMutationInput {
  createdAt?: DateTimeFieldUpdateOperationsInput;
  username?: StringFieldUpdateOperationsInput;
  password?: StringFieldUpdateOperationsInput;
  email?: StringFieldUpdateOperationsInput;
  roles?: UserUpdaterolesInput;
}

export interface UserUncheckedUpdateManyInput {
  id?: IntFieldUpdateOperationsInput;
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
  has?: Role | null;
  hasEvery?: Role[];
  hasSome?: Role[];
  isEmpty?: boolean;
}

export interface IntWithAggregatesFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntWithAggregatesFilter;
  count?: NestedIntFilter;
  avg?: NestedFloatFilter;
  sum?: NestedIntFilter;
  min?: NestedIntFilter;
  max?: NestedIntFilter;
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
  count?: NestedIntFilter;
  min?: NestedDateTimeFilter;
  max?: NestedDateTimeFilter;
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
  count?: NestedIntFilter;
  min?: NestedStringFilter;
  max?: NestedStringFilter;
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
  set?: Role[];
  push?: Role;
}

export interface IntFieldUpdateOperationsInput {
  set?: number;
  increment?: number;
  decrement?: number;
  multiply?: number;
  divide?: number;
}

export interface UserCreateManyrolesInput {
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

export interface NestedIntWithAggregatesFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntWithAggregatesFilter;
  count?: NestedIntFilter;
  avg?: NestedFloatFilter;
  sum?: NestedIntFilter;
  min?: NestedIntFilter;
  max?: NestedIntFilter;
}

export interface NestedFloatFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedFloatFilter;
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
  count?: NestedIntFilter;
  min?: NestedDateTimeFilter;
  max?: NestedDateTimeFilter;
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
  count?: NestedIntFilter;
  min?: NestedStringFilter;
  max?: NestedStringFilter;
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
  Super = 'Super',
  Registered = 'Registered',
}
