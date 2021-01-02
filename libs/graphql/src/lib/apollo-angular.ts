import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import { GraphQLModule } from './graphql.module';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export enum UserScalarFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  Username = 'username',
  Password = 'password',
  Email = 'email',
  Roles = 'roles'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum Role {
  Registered = 'Registered',
  Admin = 'Admin',
  Super = 'Super'
}

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  username?: Maybe<StringFilter>;
  password?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  roles?: Maybe<EnumRoleNullableListFilter>;
};

export type UserOrderByInput = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  username?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  roles?: Maybe<SortOrder>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  roles?: Maybe<UserCreaterolesInput>;
};

export type UserUpdateInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  username?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  roles?: Maybe<UserUpdaterolesInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  username?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  roles?: Maybe<UserUpdaterolesInput>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
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
  not?: Maybe<NestedStringFilter>;
};

export type EnumRoleNullableListFilter = {
  equals?: Maybe<Array<Role>>;
};

export type UserCreaterolesInput = {
  set: Array<Role>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type UserUpdaterolesInput = {
  set: Array<Role>;
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

export type AggregateUser = {
  __typename?: 'AggregateUser';
  count?: Maybe<UserCountAggregateOutputType>;
  avg?: Maybe<UserAvgAggregateOutputType>;
  sum?: Maybe<UserSumAggregateOutputType>;
  min?: Maybe<UserMinAggregateOutputType>;
  max?: Maybe<UserMaxAggregateOutputType>;
};

export type UserCountAggregateOutputType = {
  __typename?: 'UserCountAggregateOutputType';
  id: Scalars['Int'];
  createdAt?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['Int']>;
  roles?: Maybe<Scalars['Int']>;
  _all: Scalars['Int'];
};

export type UserAvgAggregateOutputType = {
  __typename?: 'UserAvgAggregateOutputType';
  id: Scalars['Float'];
};

export type UserSumAggregateOutputType = {
  __typename?: 'UserSumAggregateOutputType';
  id: Scalars['Int'];
};

export type UserMinAggregateOutputType = {
  __typename?: 'UserMinAggregateOutputType';
  id: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type UserMaxAggregateOutputType = {
  __typename?: 'UserMaxAggregateOutputType';
  id: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  roles: Array<Role>;
};

export type Query = {
  __typename?: 'Query';
  aggregateUser?: Maybe<AggregateUser>;
  authExchangeToken: AuthSession;
  authLogin: AuthSession;
  authPasswordResetRequest?: Maybe<Scalars['Boolean']>;
  findFirstUser?: Maybe<Array<User>>;
  findManyUser?: Maybe<Array<User>>;
  findManyUserCount: Scalars['Int'];
  findUniqueUser?: Maybe<User>;
  loggedIn: Scalars['Boolean'];
  userRoles: Array<Scalars['String']>;
};


export type QueryAggregateUserArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  distinct?: Maybe<UserScalarFieldEnum>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryAuthLoginArgs = {
  data: AuthLoginInput;
};


export type QueryAuthPasswordResetRequestArgs = {
  data: AuthPasswordResetRequestInput;
};


export type QueryFindFirstUserArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  distinct?: Maybe<UserScalarFieldEnum>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryFindManyUserArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  distinct?: Maybe<UserScalarFieldEnum>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryFindManyUserCountArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  distinct?: Maybe<UserScalarFieldEnum>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryFindUniqueUserArgs = {
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
  authPasswordChange?: Maybe<Scalars['Boolean']>;
  authPasswordResetConfirmation: AuthSession;
  authRegister: AuthSession;
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


export type MutationAuthPasswordChangeArgs = {
  data: AuthPasswordChangeInput;
};


export type MutationAuthPasswordResetConfirmationArgs = {
  data: AuthPasswordResetConfirmationInput;
};


export type MutationAuthRegisterArgs = {
  data: AuthRegisterInput;
};

export type AuthSession = {
  __typename?: 'AuthSession';
  id: Scalars['Int'];
  maxAge: Scalars['String'];
  roles: Array<Scalars['String']>;
  rememberMe: Scalars['Boolean'];
};

export type AuthLoginInput = {
  username: Scalars['String'];
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
  emailOrUsername: Scalars['String'];
};

export type AuthRegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthExchangeTokenVariables = Exact<{ [key: string]: never; }>;


export type AuthExchangeToken = (
  { __typename?: 'Query' }
  & { authExchangeToken: (
    { __typename?: 'AuthSession' }
    & AuthSessionFields
  ) }
);

export type AuthLoginVariables = Exact<{
  data: AuthLoginInput;
}>;


export type AuthLogin = (
  { __typename?: 'Query' }
  & { authLogin: (
    { __typename?: 'AuthSession' }
    & AuthSessionFields
  ) }
);

export type AuthPasswordResetConfirmationVariables = Exact<{
  data: AuthPasswordResetConfirmationInput;
}>;


export type AuthPasswordResetConfirmation = (
  { __typename?: 'Mutation' }
  & { authPasswordResetConfirmation: (
    { __typename?: 'AuthSession' }
    & AuthSessionFields
  ) }
);

export type AuthPasswordResetRequestQueryVariables = Exact<{
  data: AuthPasswordResetRequestInput;
}>;


export type AuthPasswordResetRequestQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'authPasswordResetRequest'>
);

export type AuthRegisterVariables = Exact<{
  data: AuthRegisterInput;
}>;


export type AuthRegister = (
  { __typename?: 'Mutation' }
  & { authRegister: (
    { __typename?: 'AuthSession' }
    & AuthSessionFields
  ) }
);

export type UserRolesVariables = Exact<{ [key: string]: never; }>;


export type UserRoles = (
  { __typename?: 'Query' }
  & Pick<Query, 'userRoles'>
);

export type LoggedInVariables = Exact<{ [key: string]: never; }>;


export type LoggedIn = (
  { __typename?: 'Query' }
  & Pick<Query, 'loggedIn'>
);

export type AuthSessionFields = (
  { __typename?: 'AuthSession' }
  & Pick<AuthSession, 'id' | 'maxAge' | 'rememberMe' | 'roles'>
);

export type UserFields = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email'>
);

export type FindUniqueUserVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type FindUniqueUser = (
  { __typename?: 'Query' }
  & { findUniqueUser?: Maybe<(
    { __typename?: 'User' }
    & UserFields
  )> }
);

export type FindManyUserVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput> | UserOrderByInput>;
  cursor?: Maybe<UserWhereUniqueInput>;
  distinct?: Maybe<UserScalarFieldEnum>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FindManyUser = (
  { __typename?: 'Query' }
  & { findManyUser?: Maybe<Array<(
    { __typename?: 'User' }
    & UserFields
  )>> }
);

export type FindManyUserCountVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput> | UserOrderByInput>;
  cursor?: Maybe<UserWhereUniqueInput>;
  distinct?: Maybe<UserScalarFieldEnum>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FindManyUserCount = (
  { __typename?: 'Query' }
  & Pick<Query, 'findManyUserCount'>
);

export type CreateOneUserVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateOneUser = (
  { __typename?: 'Mutation' }
  & { createOneUser: (
    { __typename?: 'User' }
    & UserFields
  ) }
);

export type UpdateOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
  data: UserUpdateInput;
}>;


export type UpdateOneUser = (
  { __typename?: 'Mutation' }
  & { updateOneUser: (
    { __typename?: 'User' }
    & UserFields
  ) }
);

export type DeleteOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type DeleteOneUser = (
  { __typename?: 'Mutation' }
  & { deleteOneUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type UpsertOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
}>;


export type UpsertOneUser = (
  { __typename?: 'Mutation' }
  & { upsertOneUser?: Maybe<(
    { __typename?: 'User' }
    & UserFields
  )> }
);

export type DeleteManyUserVariables = Exact<{
  where?: Maybe<UserWhereInput>;
}>;


export type DeleteManyUser = (
  { __typename?: 'Mutation' }
  & { deleteManyUser?: Maybe<(
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  )> }
);

export type UpdateManyUserVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  data?: Maybe<UserUpdateManyMutationInput>;
}>;


export type UpdateManyUser = (
  { __typename?: 'Mutation' }
  & { updateManyUser?: Maybe<(
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  )> }
);

export const AuthSessionFields = /*#__PURE__*/ gql`
    fragment AuthSessionFields on AuthSession {
  id
  maxAge
  rememberMe
  roles
}
    `;
export const UserFields = /*#__PURE__*/ gql`
    fragment UserFields on User {
  id
  username
  email
}
    `;
export const AuthExchangeTokenDocument = /*#__PURE__*/ gql`
    query AuthExchangeToken {
  authExchangeToken {
    ...AuthSessionFields
  }
}
    ${AuthSessionFields}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class AuthExchangeTokenGQL extends Apollo.Query<AuthExchangeToken, AuthExchangeTokenVariables> {
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
    ${AuthSessionFields}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class AuthLoginGQL extends Apollo.Query<AuthLogin, AuthLoginVariables> {
    document = AuthLoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AuthPasswordResetConfirmationDocument = /*#__PURE__*/ gql`
    mutation AuthPasswordResetConfirmation($data: AuthPasswordResetConfirmationInput!) {
  authPasswordResetConfirmation(data: $data) {
    ...AuthSessionFields
  }
}
    ${AuthSessionFields}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class AuthPasswordResetConfirmationGQL extends Apollo.Mutation<AuthPasswordResetConfirmation, AuthPasswordResetConfirmationVariables> {
    document = AuthPasswordResetConfirmationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AuthPasswordResetRequestQueryDocument = /*#__PURE__*/ gql`
    query AuthPasswordResetRequestQuery($data: AuthPasswordResetRequestInput!) {
  authPasswordResetRequest(data: $data)
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class AuthPasswordResetRequestQueryGQL extends Apollo.Query<AuthPasswordResetRequestQuery, AuthPasswordResetRequestQueryVariables> {
    document = AuthPasswordResetRequestQueryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AuthRegisterDocument = /*#__PURE__*/ gql`
    mutation AuthRegister($data: AuthRegisterInput!) {
  authRegister(data: $data) {
    ...AuthSessionFields
  }
}
    ${AuthSessionFields}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class AuthRegisterGQL extends Apollo.Mutation<AuthRegister, AuthRegisterVariables> {
    document = AuthRegisterDocument;
    
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
    providedIn: GraphQLModule
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
    providedIn: GraphQLModule
  })
  export class LoggedInGQL extends Apollo.Query<LoggedIn, LoggedInVariables> {
    document = LoggedInDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindUniqueUserDocument = /*#__PURE__*/ gql`
    query FindUniqueUser($where: UserWhereUniqueInput!) {
  findUniqueUser(where: $where) {
    ...UserFields
  }
}
    ${UserFields}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindUniqueUserGQL extends Apollo.Query<FindUniqueUser, FindUniqueUserVariables> {
    document = FindUniqueUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyUserDocument = /*#__PURE__*/ gql`
    query FindManyUser($where: UserWhereInput, $orderBy: [UserOrderByInput!], $cursor: UserWhereUniqueInput, $distinct: UserScalarFieldEnum, $skip: Int, $take: Int) {
  findManyUser(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    distinct: $distinct
    skip: $skip
    take: $take
  ) {
    ...UserFields
  }
}
    ${UserFields}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindManyUserGQL extends Apollo.Query<FindManyUser, FindManyUserVariables> {
    document = FindManyUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyUserCountDocument = /*#__PURE__*/ gql`
    query FindManyUserCount($where: UserWhereInput, $orderBy: [UserOrderByInput!], $cursor: UserWhereUniqueInput, $distinct: UserScalarFieldEnum, $skip: Int, $take: Int) {
  findManyUserCount(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    distinct: $distinct
    skip: $skip
    take: $take
  )
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindManyUserCountGQL extends Apollo.Query<FindManyUserCount, FindManyUserCountVariables> {
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
    ${UserFields}`;

  @Injectable({
    providedIn: GraphQLModule
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
    ${UserFields}`;

  @Injectable({
    providedIn: GraphQLModule
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
    providedIn: GraphQLModule
  })
  export class DeleteOneUserGQL extends Apollo.Mutation<DeleteOneUser, DeleteOneUserVariables> {
    document = DeleteOneUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpsertOneUserDocument = /*#__PURE__*/ gql`
    mutation UpsertOneUser($where: UserWhereUniqueInput!, $create: UserCreateInput!, $update: UserUpdateInput!) {
  upsertOneUser(where: $where, create: $create, update: $update) {
    ...UserFields
  }
}
    ${UserFields}`;

  @Injectable({
    providedIn: GraphQLModule
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
    providedIn: GraphQLModule
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
    providedIn: GraphQLModule
  })
  export class UpdateManyUserGQL extends Apollo.Mutation<UpdateManyUser, UpdateManyUserVariables> {
    document = UpdateManyUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }