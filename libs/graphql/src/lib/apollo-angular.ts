import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import { ZenGraphQLModule } from './zen-graphql.module';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  Upload: any;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  _avg?: Maybe<UserAvgAggregateOutputType>;
  _count?: Maybe<UserCountAggregateOutputType>;
  _max?: Maybe<UserMaxAggregateOutputType>;
  _min?: Maybe<UserMinAggregateOutputType>;
  _sum?: Maybe<UserSumAggregateOutputType>;
};

export type AuthLoginInput = {
  password: Scalars['String'];
  rememberMe: Scalars['Boolean'];
  username: Scalars['String'];
};

export type AuthPasswordChangeInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type AuthPasswordResetConfirmationInput = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type AuthPasswordResetRequestInput = {
  emailOrUsername: Scalars['String'];
};

export type AuthRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AuthSession = {
  __typename?: 'AuthSession';
  id: Scalars['Int'];
  maxAge: Scalars['String'];
  rememberMe: Scalars['Boolean'];
  roles: Array<Scalars['String']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type EnumRoleNullableListFilter = {
  equals?: InputMaybe<Array<Role>>;
  has?: InputMaybe<Role>;
  hasEvery?: InputMaybe<Array<Role>>;
  hasSome?: InputMaybe<Array<Role>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authPasswordChange?: Maybe<Scalars['Boolean']>;
  authPasswordResetConfirmation: AuthSession;
  authRegister: AuthSession;
  createOneUser: User;
  deleteManyUser?: Maybe<BatchPayload>;
  deleteOneUser?: Maybe<User>;
  updateManyUser?: Maybe<BatchPayload>;
  updateOneUser: User;
  upsertOneUser?: Maybe<User>;
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


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteManyUserArgs = {
  where?: InputMaybe<UserWhereInput>;
};


export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationUpdateManyUserArgs = {
  data: UserUpdateManyMutationInput;
  where?: InputMaybe<UserWhereInput>;
};


export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpsertOneUserArgs = {
  create: UserCreateInput;
  update: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  aggregateUser?: Maybe<AggregateUser>;
  authExchangeToken: AuthSession;
  authLogin: AuthSession;
  authPasswordResetRequest?: Maybe<Scalars['Boolean']>;
  findFirstUser?: Maybe<User>;
  findManyUser?: Maybe<Array<User>>;
  findManyUserCount: Scalars['Int'];
  findUniqueUser?: Maybe<User>;
  loggedIn: Scalars['Boolean'];
  userRoles: Array<Role>;
};


export type QueryAggregateUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryAuthLoginArgs = {
  data: AuthLoginInput;
};


export type QueryAuthPasswordResetRequestArgs = {
  data: AuthPasswordResetRequestInput;
};


export type QueryFindFirstUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<UserScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindManyUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<UserScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindManyUserCountArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<UserScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindUniqueUserArgs = {
  where: UserWhereUniqueInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum Role {
  Registered = 'Registered',
  Super = 'Super'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  password: Scalars['String'];
  roles: Array<Role>;
  username: Scalars['String'];
};

export type UserAvgAggregateOutputType = {
  __typename?: 'UserAvgAggregateOutputType';
  id?: Maybe<Scalars['Float']>;
};

export type UserAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type UserCountAggregateOutputType = {
  __typename?: 'UserCountAggregateOutputType';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  email: Scalars['Int'];
  id: Scalars['Int'];
  password: Scalars['Int'];
  roles: Scalars['Int'];
  username: Scalars['Int'];
};

export type UserCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  roles?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  password: Scalars['String'];
  roles?: InputMaybe<Array<Role>>;
  username: Scalars['String'];
};

export type UserCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  password: Scalars['String'];
  roles?: InputMaybe<Array<Role>>;
  username: Scalars['String'];
};

export type UserCreateManyrolesInput = {
  set: Array<Role>;
};

export type UserCreaterolesInput = {
  set: Array<Role>;
};

export type UserMaxAggregateOutputType = {
  __typename?: 'UserMaxAggregateOutputType';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserMinAggregateOutputType = {
  __typename?: 'UserMinAggregateOutputType';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  _avg?: InputMaybe<UserAvgOrderByAggregateInput>;
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
  _sum?: InputMaybe<UserSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  roles?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  roles?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  Email = 'email',
  Id = 'id',
  Password = 'password',
  Roles = 'roles',
  Username = 'username'
}

export type UserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  email?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  password?: InputMaybe<StringWithAggregatesFilter>;
  roles?: InputMaybe<EnumRoleNullableListFilter>;
  username?: InputMaybe<StringWithAggregatesFilter>;
};

export type UserSumAggregateOutputType = {
  __typename?: 'UserSumAggregateOutputType';
  id?: Maybe<Scalars['Int']>;
};

export type UserSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type UserUncheckedCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  password: Scalars['String'];
  roles?: InputMaybe<Array<Role>>;
  username: Scalars['String'];
};

export type UserUncheckedUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  roles?: InputMaybe<Array<Role>>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUncheckedUpdateManyInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  roles?: InputMaybe<Array<Role>>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  roles?: InputMaybe<Array<Role>>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  roles?: InputMaybe<Array<Role>>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdaterolesInput = {
  push?: InputMaybe<Array<Role>>;
  set?: InputMaybe<Array<Role>>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  password?: InputMaybe<StringFilter>;
  roles?: InputMaybe<EnumRoleNullableListFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type AuthExchangeTokenVariables = Exact<{ [key: string]: never; }>;


export type AuthExchangeToken = { __typename?: 'Query', authExchangeToken: { __typename?: 'AuthSession', id: number, maxAge: string, rememberMe: boolean, roles: Array<string> } };

export type AuthLoginVariables = Exact<{
  data: AuthLoginInput;
}>;


export type AuthLogin = { __typename?: 'Query', authLogin: { __typename?: 'AuthSession', id: number, maxAge: string, rememberMe: boolean, roles: Array<string> } };

export type AuthPasswordChangeVariables = Exact<{
  data: AuthPasswordChangeInput;
}>;


export type AuthPasswordChange = { __typename?: 'Mutation', authPasswordChange?: boolean | null | undefined };

export type AuthPasswordResetConfirmationVariables = Exact<{
  data: AuthPasswordResetConfirmationInput;
}>;


export type AuthPasswordResetConfirmation = { __typename?: 'Mutation', authPasswordResetConfirmation: { __typename?: 'AuthSession', id: number, maxAge: string, rememberMe: boolean, roles: Array<string> } };

export type AuthPasswordResetRequestQueryVariables = Exact<{
  data: AuthPasswordResetRequestInput;
}>;


export type AuthPasswordResetRequestQuery = { __typename?: 'Query', authPasswordResetRequest?: boolean | null | undefined };

export type AuthRegisterVariables = Exact<{
  data: AuthRegisterInput;
}>;


export type AuthRegister = { __typename?: 'Mutation', authRegister: { __typename?: 'AuthSession', id: number, maxAge: string, rememberMe: boolean, roles: Array<string> } };

export type AuthSessionFields = { __typename?: 'AuthSession', id: number, maxAge: string, rememberMe: boolean, roles: Array<string> };

export type UserFields = { __typename?: 'User', id: number, username: string, email: string };

export type LoggedInVariables = Exact<{ [key: string]: never; }>;


export type LoggedIn = { __typename?: 'Query', loggedIn: boolean };

export type UserRolesVariables = Exact<{ [key: string]: never; }>;


export type UserRoles = { __typename?: 'Query', userRoles: Array<Role> };

export type FindUniqueUserVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type FindUniqueUser = { __typename?: 'Query', findUniqueUser?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined };

export type FindFirstUserVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  cursor?: Maybe<UserWhereUniqueInput>;
  distinct?: Maybe<Array<Maybe<UserScalarFieldEnum>> | Maybe<UserScalarFieldEnum>>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type FindFirstUser = { __typename?: 'Query', findManyUser?: Array<{ __typename?: 'User', id: number, username: string, email: string }> | null | undefined };

export type FindManyUserVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  cursor?: Maybe<UserWhereUniqueInput>;
  distinct?: Maybe<Array<Maybe<UserScalarFieldEnum>> | Maybe<UserScalarFieldEnum>>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type FindManyUser = { __typename?: 'Query', findManyUser?: Array<{ __typename?: 'User', id: number, username: string, email: string }> | null | undefined };

export type FindManyUserCountVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  cursor?: Maybe<UserWhereUniqueInput>;
  distinct?: Maybe<Array<Maybe<UserScalarFieldEnum>> | Maybe<UserScalarFieldEnum>>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type FindManyUserCount = { __typename?: 'Query', findManyUserCount: number };

export type CreateOneUserVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateOneUser = { __typename?: 'Mutation', createOneUser: { __typename?: 'User', id: number, username: string, email: string } };

export type UpdateOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
  data: UserUpdateInput;
}>;


export type UpdateOneUser = { __typename?: 'Mutation', updateOneUser: { __typename?: 'User', id: number, username: string, email: string } };

export type DeleteOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type DeleteOneUser = { __typename?: 'Mutation', deleteOneUser?: { __typename?: 'User', id: number } | null | undefined };

export type UpsertOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
}>;


export type UpsertOneUser = { __typename?: 'Mutation', upsertOneUser?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined };

export type DeleteManyUserVariables = Exact<{
  where?: Maybe<UserWhereInput>;
}>;


export type DeleteManyUser = { __typename?: 'Mutation', deleteManyUser?: { __typename?: 'BatchPayload', count: number } | null | undefined };

export type UpdateManyUserVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  data: UserUpdateManyMutationInput;
}>;


export type UpdateManyUser = { __typename?: 'Mutation', updateManyUser?: { __typename?: 'BatchPayload', count: number } | null | undefined };

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
    providedIn: ZenGraphQLModule
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
    providedIn: ZenGraphQLModule
  })
  export class AuthLoginGQL extends Apollo.Query<AuthLogin, AuthLoginVariables> {
    document = AuthLoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AuthPasswordChangeDocument = /*#__PURE__*/ gql`
    mutation AuthPasswordChange($data: AuthPasswordChangeInput!) {
  authPasswordChange(data: $data)
}
    `;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class AuthPasswordChangeGQL extends Apollo.Mutation<AuthPasswordChange, AuthPasswordChangeVariables> {
    document = AuthPasswordChangeDocument;
    
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
    providedIn: ZenGraphQLModule
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
    providedIn: ZenGraphQLModule
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
    providedIn: ZenGraphQLModule
  })
  export class AuthRegisterGQL extends Apollo.Mutation<AuthRegister, AuthRegisterVariables> {
    document = AuthRegisterDocument;
    
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
    providedIn: ZenGraphQLModule
  })
  export class LoggedInGQL extends Apollo.Query<LoggedIn, LoggedInVariables> {
    document = LoggedInDocument;
    
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
    providedIn: ZenGraphQLModule
  })
  export class UserRolesGQL extends Apollo.Query<UserRoles, UserRolesVariables> {
    document = UserRolesDocument;
    
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
    providedIn: ZenGraphQLModule
  })
  export class FindUniqueUserGQL extends Apollo.Query<FindUniqueUser, FindUniqueUserVariables> {
    document = FindUniqueUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindFirstUserDocument = /*#__PURE__*/ gql`
    query FindFirstUser($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $cursor: UserWhereUniqueInput, $distinct: [UserScalarFieldEnum], $take: Int, $skip: Int) {
  findManyUser(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    distinct: $distinct
    take: $take
    skip: $skip
  ) {
    ...UserFields
  }
}
    ${UserFields}`;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class FindFirstUserGQL extends Apollo.Query<FindFirstUser, FindFirstUserVariables> {
    document = FindFirstUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyUserDocument = /*#__PURE__*/ gql`
    query FindManyUser($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $cursor: UserWhereUniqueInput, $distinct: [UserScalarFieldEnum], $take: Int, $skip: Int) {
  findManyUser(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    distinct: $distinct
    take: $take
    skip: $skip
  ) {
    ...UserFields
  }
}
    ${UserFields}`;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class FindManyUserGQL extends Apollo.Query<FindManyUser, FindManyUserVariables> {
    document = FindManyUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyUserCountDocument = /*#__PURE__*/ gql`
    query FindManyUserCount($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $cursor: UserWhereUniqueInput, $distinct: [UserScalarFieldEnum], $take: Int, $skip: Int) {
  findManyUserCount(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    distinct: $distinct
    take: $take
    skip: $skip
  )
}
    `;

  @Injectable({
    providedIn: ZenGraphQLModule
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
    providedIn: ZenGraphQLModule
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
    providedIn: ZenGraphQLModule
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
    providedIn: ZenGraphQLModule
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
    providedIn: ZenGraphQLModule
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
    providedIn: ZenGraphQLModule
  })
  export class DeleteManyUserGQL extends Apollo.Mutation<DeleteManyUser, DeleteManyUserVariables> {
    document = DeleteManyUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateManyUserDocument = /*#__PURE__*/ gql`
    mutation UpdateManyUser($where: UserWhereInput, $data: UserUpdateManyMutationInput!) {
  updateManyUser(where: $where, data: $data) {
    count
  }
}
    `;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class UpdateManyUserGQL extends Apollo.Mutation<UpdateManyUser, UpdateManyUserVariables> {
    document = UpdateManyUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }