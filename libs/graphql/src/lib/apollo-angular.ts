import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import * as Apollo from 'apollo-angular';

import { GraphQLModule } from './graphql.module';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export enum UserDistinctFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  Email = 'email',
  FirstName = 'firstName',
  LastName = 'lastName',
  Password = 'password',
  Roles = 'roles',
  Test = 'test',
}

export enum RoleDistinctFieldEnum {
  Id = 'id',
  Name = 'name',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  email?: Maybe<StringFilter>;
  firstName?: Maybe<StringNullableFilter>;
  lastName?: Maybe<StringNullableFilter>;
  password?: Maybe<StringFilter>;
  roles?: Maybe<StringNullableListFilter>;
  test?: Maybe<IntFilter>;
};

export type UserOrderByInput = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  roles?: Maybe<SortOrder>;
  test?: Maybe<SortOrder>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type RoleWhereInput = {
  AND?: Maybe<Array<RoleWhereInput>>;
  OR?: Maybe<Array<RoleWhereInput>>;
  NOT?: Maybe<Array<RoleWhereInput>>;
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
};

export type RoleOrderByInput = {
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
};

export type RoleWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  test?: Maybe<Scalars['Int']>;
  roles?: Maybe<UserCreaterolesInput>;
};

export type UserUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  test?: Maybe<IntFieldUpdateOperationsInput>;
  roles?: Maybe<UserUpdaterolesInput>;
};

export type UserUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  test?: Maybe<IntFieldUpdateOperationsInput>;
  roles?: Maybe<UserUpdaterolesInput>;
};

export type RoleCreateInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type RoleUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
};

export type RoleUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<Scalars['String']>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
};

export type StringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: Maybe<Array<Scalars['String']>>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
};

export type UserCreaterolesInput = {
  set?: Maybe<Array<Scalars['String']>>;
};

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type IntFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Int']>;
  increment?: Maybe<Scalars['Int']>;
  decrement?: Maybe<Scalars['Int']>;
  multiply?: Maybe<Scalars['Int']>;
  divide?: Maybe<Scalars['Int']>;
};

export type UserUpdaterolesInput = {
  set?: Maybe<Array<Scalars['String']>>;
};

export type NestedStringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  count: Scalars['Int'];
  avg?: Maybe<UserAvgAggregateOutputType>;
  sum?: Maybe<UserSumAggregateOutputType>;
  min?: Maybe<UserMinAggregateOutputType>;
  max?: Maybe<UserMaxAggregateOutputType>;
};

export type AggregateRole = {
  __typename?: 'AggregateRole';
  count: Scalars['Int'];
};

export type UserAvgAggregateOutputType = {
  __typename?: 'UserAvgAggregateOutputType';
  test: Scalars['Float'];
};

export type UserSumAggregateOutputType = {
  __typename?: 'UserSumAggregateOutputType';
  test: Scalars['Int'];
};

export type UserMinAggregateOutputType = {
  __typename?: 'UserMinAggregateOutputType';
  test: Scalars['Int'];
};

export type UserMaxAggregateOutputType = {
  __typename?: 'UserMaxAggregateOutputType';
  test: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  roles: Array<Scalars['String']>;
  test: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  aggregateRole?: Maybe<AggregateRole>;
  aggregateUser?: Maybe<AggregateUser>;
  authExchangeToken: AuthSession;
  authLogin: AuthSession;
  authPasswordResetRequest?: Maybe<Scalars['Boolean']>;
  findManyRole?: Maybe<Array<Role>>;
  findManyRoleCount: Scalars['Int'];
  findManyUser?: Maybe<Array<User>>;
  findManyUserCount: Scalars['Int'];
  findOneRole?: Maybe<Role>;
  findOneUser?: Maybe<User>;
  loggedIn: Scalars['Boolean'];
  userRoles: Array<Scalars['String']>;
};

export type QueryAggregateRoleArgs = {
  where?: Maybe<RoleWhereInput>;
  orderBy?: Maybe<Array<RoleOrderByInput>>;
  cursor?: Maybe<RoleWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type QueryAggregateUserArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type QueryAuthLoginArgs = {
  data: AuthLoginInput;
};

export type QueryAuthPasswordResetRequestArgs = {
  data: AuthPasswordResetRequestInput;
};

export type QueryFindManyRoleArgs = {
  where?: Maybe<RoleWhereInput>;
  orderBy?: Maybe<Array<RoleOrderByInput>>;
  cursor?: Maybe<RoleWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type QueryFindManyRoleCountArgs = {
  where?: Maybe<RoleWhereInput>;
  orderBy?: Maybe<Array<RoleOrderByInput>>;
  cursor?: Maybe<RoleWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type QueryFindManyUserArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type QueryFindManyUserCountArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type QueryFindOneRoleArgs = {
  where: RoleWhereUniqueInput;
};

export type QueryFindOneUserArgs = {
  where: UserWhereUniqueInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneUser: User;
  updateOneUser: User;
  deleteOneUser?: Maybe<User>;
  upsertOneUser?: Maybe<User>;
  deleteManyUser?: Maybe<BatchPayload>;
  updateManyUser?: Maybe<BatchPayload>;
  createOneRole: Role;
  updateOneRole: Role;
  deleteOneRole?: Maybe<Role>;
  upsertOneRole?: Maybe<Role>;
  deleteManyRole?: Maybe<BatchPayload>;
  updateManyRole?: Maybe<BatchPayload>;
  authPasswordChange?: Maybe<Scalars['Boolean']>;
  authPasswordResetConfirmation?: Maybe<Scalars['Boolean']>;
  authRegister: User;
};

export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};

export type MutationUpdateOneUserArgs = {
  where: UserWhereUniqueInput;
  data: UserUpdateInput;
};

export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationUpsertOneUserArgs = {
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
};

export type MutationDeleteManyUserArgs = {
  where?: Maybe<UserWhereInput>;
};

export type MutationUpdateManyUserArgs = {
  where?: Maybe<UserWhereInput>;
  data?: Maybe<UserUpdateManyMutationInput>;
};

export type MutationCreateOneRoleArgs = {
  data: RoleCreateInput;
};

export type MutationUpdateOneRoleArgs = {
  where: RoleWhereUniqueInput;
  data: RoleUpdateInput;
};

export type MutationDeleteOneRoleArgs = {
  where: RoleWhereUniqueInput;
};

export type MutationUpsertOneRoleArgs = {
  where: RoleWhereUniqueInput;
  create: RoleCreateInput;
  update: RoleUpdateInput;
};

export type MutationDeleteManyRoleArgs = {
  where?: Maybe<RoleWhereInput>;
};

export type MutationUpdateManyRoleArgs = {
  where?: Maybe<RoleWhereInput>;
  data?: Maybe<RoleUpdateManyMutationInput>;
};

export type MutationAuthPasswordChangeArgs = {
  data: AuthPasswordChangeInput;
};

export type MutationAuthPasswordResetConfirmationArgs = {
  data: AuthPasswordResetConfirmationInput;
};

export type MutationAuthRegisterArgs = {
  data?: Maybe<AuthRegisterInput>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type AuthSession = {
  __typename?: 'AuthSession';
  id: Scalars['Int'];
  maxAge: Scalars['String'];
  roles: Array<Scalars['String']>;
  rememberMe: Scalars['Boolean'];
};

export type AuthLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  rememberMe: Scalars['Boolean'];
};

export type AuthPasswordChangeInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type AuthPasswordResetConfirmationInput = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type AuthPasswordResetRequestInput = {
  email: Scalars['String'];
};

export type AuthRegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  password: Scalars['String'];
};

export type AuthExchangeTokenVariables = Exact<{ [key: string]: never }>;

export type AuthExchangeToken = { __typename?: 'Query' } & {
  authExchangeToken: { __typename?: 'AuthSession' } & AuthSessionFields;
};

export type AuthLoginVariables = Exact<{
  data: AuthLoginInput;
}>;

export type AuthLogin = { __typename?: 'Query' } & {
  authLogin: { __typename?: 'AuthSession' } & AuthSessionFields;
};

export type UserRolesVariables = Exact<{ [key: string]: never }>;

export type UserRoles = { __typename?: 'Query' } & Pick<Query, 'userRoles'>;

export type LoggedInVariables = Exact<{ [key: string]: never }>;

export type LoggedIn = { __typename?: 'Query' } & Pick<Query, 'loggedIn'>;

export type AuthSessionFields = { __typename?: 'AuthSession' } & Pick<
  AuthSession,
  'id' | 'maxAge' | 'rememberMe' | 'roles'
>;

export type RoleFields = { __typename?: 'Role' } & Pick<Role, 'id'>;

export type UserFields = { __typename?: 'User' } & Pick<
  User,
  'id' | 'email' | 'firstName' | 'roles' | 'test'
>;

export type FindOneRoleVariables = Exact<{
  where: RoleWhereUniqueInput;
}>;

export type FindOneRole = { __typename?: 'Query' } & {
  findOneRole?: Maybe<{ __typename?: 'Role' } & RoleFields>;
};

export type FindManyRoleVariables = Exact<{
  where?: Maybe<RoleWhereInput>;
  orderBy?: Maybe<Array<RoleOrderByInput>>;
  cursor?: Maybe<RoleWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;

export type FindManyRole = { __typename?: 'Query' } & {
  findManyRole?: Maybe<Array<{ __typename?: 'Role' } & RoleFields>>;
};

export type FindManyRoleCountVariables = Exact<{
  where?: Maybe<RoleWhereInput>;
  orderBy?: Maybe<Array<RoleOrderByInput>>;
  cursor?: Maybe<RoleWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;

export type FindManyRoleCount = { __typename?: 'Query' } & Pick<Query, 'findManyRoleCount'>;

export type CreateOneRoleVariables = Exact<{
  data: RoleCreateInput;
}>;

export type CreateOneRole = { __typename?: 'Mutation' } & {
  createOneRole: { __typename?: 'Role' } & RoleFields;
};

export type UpdateOneRoleVariables = Exact<{
  where: RoleWhereUniqueInput;
  data: RoleUpdateInput;
}>;

export type UpdateOneRole = { __typename?: 'Mutation' } & {
  updateOneRole: { __typename?: 'Role' } & RoleFields;
};

export type DeleteOneRoleVariables = Exact<{
  where: RoleWhereUniqueInput;
}>;

export type DeleteOneRole = { __typename?: 'Mutation' } & {
  deleteOneRole?: Maybe<{ __typename?: 'Role' } & Pick<Role, 'id'>>;
};

export type UpsertOneRoleVariables = Exact<{
  where: RoleWhereUniqueInput;
  create: RoleCreateInput;
  update: RoleUpdateInput;
}>;

export type UpsertOneRole = { __typename?: 'Mutation' } & {
  upsertOneRole?: Maybe<{ __typename?: 'Role' } & RoleFields>;
};

export type DeleteManyRoleVariables = Exact<{
  where?: Maybe<RoleWhereInput>;
}>;

export type DeleteManyRole = { __typename?: 'Mutation' } & {
  deleteManyRole?: Maybe<{ __typename?: 'BatchPayload' } & Pick<BatchPayload, 'count'>>;
};

export type UpdateManyRoleVariables = Exact<{
  where?: Maybe<RoleWhereInput>;
  data?: Maybe<RoleUpdateManyMutationInput>;
}>;

export type UpdateManyRole = { __typename?: 'Mutation' } & {
  updateManyRole?: Maybe<{ __typename?: 'BatchPayload' } & Pick<BatchPayload, 'count'>>;
};

export type FindOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
}>;

export type FindOneUser = { __typename?: 'Query' } & {
  findOneUser?: Maybe<{ __typename?: 'User' } & UserFields>;
};

export type FindManyUserVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;

export type FindManyUser = { __typename?: 'Query' } & {
  findManyUser?: Maybe<Array<{ __typename?: 'User' } & UserFields>>;
};

export type FindManyUserCountVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;

export type FindManyUserCount = { __typename?: 'Query' } & Pick<Query, 'findManyUserCount'>;

export type CreateOneUserVariables = Exact<{
  data: UserCreateInput;
}>;

export type CreateOneUser = { __typename?: 'Mutation' } & {
  createOneUser: { __typename?: 'User' } & UserFields;
};

export type UpdateOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
  data: UserUpdateInput;
}>;

export type UpdateOneUser = { __typename?: 'Mutation' } & {
  updateOneUser: { __typename?: 'User' } & UserFields;
};

export type DeleteOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
}>;

export type DeleteOneUser = { __typename?: 'Mutation' } & {
  deleteOneUser?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>;
};

export type UpsertOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
}>;

export type UpsertOneUser = { __typename?: 'Mutation' } & {
  upsertOneUser?: Maybe<{ __typename?: 'User' } & UserFields>;
};

export type DeleteManyUserVariables = Exact<{
  where?: Maybe<UserWhereInput>;
}>;

export type DeleteManyUser = { __typename?: 'Mutation' } & {
  deleteManyUser?: Maybe<{ __typename?: 'BatchPayload' } & Pick<BatchPayload, 'count'>>;
};

export type UpdateManyUserVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  data?: Maybe<UserUpdateManyMutationInput>;
}>;

export type UpdateManyUser = { __typename?: 'Mutation' } & {
  updateManyUser?: Maybe<{ __typename?: 'BatchPayload' } & Pick<BatchPayload, 'count'>>;
};

export const AuthSessionFields = /*#__PURE__*/ gql`
  fragment AuthSessionFields on AuthSession {
    id
    maxAge
    rememberMe
    roles
  }
`;
export const RoleFields = /*#__PURE__*/ gql`
  fragment RoleFields on Role {
    id
  }
`;
export const UserFields = /*#__PURE__*/ gql`
  fragment UserFields on User {
    id
    email
    firstName
    roles
    test
  }
`;
export const AuthExchangeTokenDocument = /*#__PURE__*/ gql`
  query AuthExchangeToken {
    authExchangeToken {
      ...AuthSessionFields
    }
  }
  ${AuthSessionFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class AuthExchangeTokenGQL extends Apollo.Query<
  AuthExchangeToken,
  AuthExchangeTokenVariables
> {
  document = AuthExchangeTokenDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AuthLoginDocument = /*#__PURE__*/ gql`
  query AuthLogin($data: AuthLoginInput!) {
    authLogin(data: $data) {
      ...AuthSessionFields
    }
  }
  ${AuthSessionFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class AuthLoginGQL extends Apollo.Query<AuthLogin, AuthLoginVariables> {
  document = AuthLoginDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UserRolesDocument = /*#__PURE__*/ gql`
  query UserRoles {
    userRoles @client
  }
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class UserRolesGQL extends Apollo.Query<UserRoles, UserRolesVariables> {
  document = UserRolesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const LoggedInDocument = /*#__PURE__*/ gql`
  query LoggedIn {
    loggedIn @client
  }
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class LoggedInGQL extends Apollo.Query<LoggedIn, LoggedInVariables> {
  document = LoggedInDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const FindOneRoleDocument = /*#__PURE__*/ gql`
  query FindOneRole($where: RoleWhereUniqueInput!) {
    findOneRole(where: $where) {
      ...RoleFields
    }
  }
  ${RoleFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class FindOneRoleGQL extends Apollo.Query<FindOneRole, FindOneRoleVariables> {
  document = FindOneRoleDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const FindManyRoleDocument = /*#__PURE__*/ gql`
  query FindManyRole(
    $where: RoleWhereInput
    $orderBy: [RoleOrderByInput!]
    $cursor: RoleWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyRole(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      ...RoleFields
    }
  }
  ${RoleFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class FindManyRoleGQL extends Apollo.Query<FindManyRole, FindManyRoleVariables> {
  document = FindManyRoleDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const FindManyRoleCountDocument = /*#__PURE__*/ gql`
  query FindManyRoleCount(
    $where: RoleWhereInput
    $orderBy: [RoleOrderByInput!]
    $cursor: RoleWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyRoleCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
  }
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class FindManyRoleCountGQL extends Apollo.Query<
  FindManyRoleCount,
  FindManyRoleCountVariables
> {
  document = FindManyRoleCountDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateOneRoleDocument = /*#__PURE__*/ gql`
  mutation CreateOneRole($data: RoleCreateInput!) {
    createOneRole(data: $data) {
      ...RoleFields
    }
  }
  ${RoleFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class CreateOneRoleGQL extends Apollo.Mutation<CreateOneRole, CreateOneRoleVariables> {
  document = CreateOneRoleDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateOneRoleDocument = /*#__PURE__*/ gql`
  mutation UpdateOneRole($where: RoleWhereUniqueInput!, $data: RoleUpdateInput!) {
    updateOneRole(where: $where, data: $data) {
      ...RoleFields
    }
  }
  ${RoleFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class UpdateOneRoleGQL extends Apollo.Mutation<UpdateOneRole, UpdateOneRoleVariables> {
  document = UpdateOneRoleDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteOneRoleDocument = /*#__PURE__*/ gql`
  mutation DeleteOneRole($where: RoleWhereUniqueInput!) {
    deleteOneRole(where: $where) {
      id
    }
  }
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class DeleteOneRoleGQL extends Apollo.Mutation<DeleteOneRole, DeleteOneRoleVariables> {
  document = DeleteOneRoleDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpsertOneRoleDocument = /*#__PURE__*/ gql`
  mutation UpsertOneRole(
    $where: RoleWhereUniqueInput!
    $create: RoleCreateInput!
    $update: RoleUpdateInput!
  ) {
    upsertOneRole(where: $where, create: $create, update: $update) {
      ...RoleFields
    }
  }
  ${RoleFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class UpsertOneRoleGQL extends Apollo.Mutation<UpsertOneRole, UpsertOneRoleVariables> {
  document = UpsertOneRoleDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteManyRoleDocument = /*#__PURE__*/ gql`
  mutation DeleteManyRole($where: RoleWhereInput) {
    deleteManyRole(where: $where) {
      count
    }
  }
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class DeleteManyRoleGQL extends Apollo.Mutation<DeleteManyRole, DeleteManyRoleVariables> {
  document = DeleteManyRoleDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateManyRoleDocument = /*#__PURE__*/ gql`
  mutation UpdateManyRole($where: RoleWhereInput, $data: RoleUpdateManyMutationInput) {
    updateManyRole(where: $where, data: $data) {
      count
    }
  }
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class UpdateManyRoleGQL extends Apollo.Mutation<UpdateManyRole, UpdateManyRoleVariables> {
  document = UpdateManyRoleDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const FindOneUserDocument = /*#__PURE__*/ gql`
  query FindOneUser($where: UserWhereUniqueInput!) {
    findOneUser(where: $where) {
      ...UserFields
    }
  }
  ${UserFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class FindOneUserGQL extends Apollo.Query<FindOneUser, FindOneUserVariables> {
  document = FindOneUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const FindManyUserDocument = /*#__PURE__*/ gql`
  query FindManyUser(
    $where: UserWhereInput
    $orderBy: [UserOrderByInput!]
    $cursor: UserWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyUser(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      ...UserFields
    }
  }
  ${UserFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class FindManyUserGQL extends Apollo.Query<FindManyUser, FindManyUserVariables> {
  document = FindManyUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const FindManyUserCountDocument = /*#__PURE__*/ gql`
  query FindManyUserCount(
    $where: UserWhereInput
    $orderBy: [UserOrderByInput!]
    $cursor: UserWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyUserCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
  }
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class FindManyUserCountGQL extends Apollo.Query<
  FindManyUserCount,
  FindManyUserCountVariables
> {
  document = FindManyUserCountDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateOneUserDocument = /*#__PURE__*/ gql`
  mutation CreateOneUser($data: UserCreateInput!) {
    createOneUser(data: $data) {
      ...UserFields
    }
  }
  ${UserFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class CreateOneUserGQL extends Apollo.Mutation<CreateOneUser, CreateOneUserVariables> {
  document = CreateOneUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateOneUserDocument = /*#__PURE__*/ gql`
  mutation UpdateOneUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateOneUser(where: $where, data: $data) {
      ...UserFields
    }
  }
  ${UserFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class UpdateOneUserGQL extends Apollo.Mutation<UpdateOneUser, UpdateOneUserVariables> {
  document = UpdateOneUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteOneUserDocument = /*#__PURE__*/ gql`
  mutation DeleteOneUser($where: UserWhereUniqueInput!) {
    deleteOneUser(where: $where) {
      id
    }
  }
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class DeleteOneUserGQL extends Apollo.Mutation<DeleteOneUser, DeleteOneUserVariables> {
  document = DeleteOneUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpsertOneUserDocument = /*#__PURE__*/ gql`
  mutation UpsertOneUser(
    $where: UserWhereUniqueInput!
    $create: UserCreateInput!
    $update: UserUpdateInput!
  ) {
    upsertOneUser(where: $where, create: $create, update: $update) {
      ...UserFields
    }
  }
  ${UserFields}
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class UpsertOneUserGQL extends Apollo.Mutation<UpsertOneUser, UpsertOneUserVariables> {
  document = UpsertOneUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteManyUserDocument = /*#__PURE__*/ gql`
  mutation DeleteManyUser($where: UserWhereInput) {
    deleteManyUser(where: $where) {
      count
    }
  }
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class DeleteManyUserGQL extends Apollo.Mutation<DeleteManyUser, DeleteManyUserVariables> {
  document = DeleteManyUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateManyUserDocument = /*#__PURE__*/ gql`
  mutation UpdateManyUser($where: UserWhereInput, $data: UserUpdateManyMutationInput) {
    updateManyUser(where: $where, data: $data) {
      count
    }
  }
`;

@Injectable({
  providedIn: GraphQLModule,
})
export class UpdateManyUserGQL extends Apollo.Mutation<UpdateManyUser, UpdateManyUserVariables> {
  document = UpdateManyUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
