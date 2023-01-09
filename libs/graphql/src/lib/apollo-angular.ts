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
  Json: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AccountInfo = {
  __typename?: 'AccountInfo';
  googleProfile?: Maybe<GoogleProfile>;
  hasPassword: Scalars['Boolean'];
  username?: Maybe<Scalars['String']>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  _count?: Maybe<UserCountAggregateOutputType>;
  _max?: Maybe<UserMaxAggregateOutputType>;
  _min?: Maybe<UserMinAggregateOutputType>;
};

export type AuthExchangeTokenInput = {
  rememberMe: Scalars['Boolean'];
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
  expiresIn: Scalars['Int'];
  rememberMe: Scalars['Boolean'];
  roles: Array<Scalars['String']>;
  rules: Array<Scalars['Json']>;
  token: Scalars['String'];
  userId: Scalars['String'];
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

export type GoogleProfile = {
  __typename?: 'GoogleProfile';
  email?: Maybe<Scalars['String']>;
  family_name?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

export enum JsonNullValueFilter {
  AnyNull = 'AnyNull',
  DbNull = 'DbNull',
  JsonNull = 'JsonNull'
}

export type JsonNullableFilter = {
  array_contains?: InputMaybe<Scalars['Json']>;
  array_ends_with?: InputMaybe<Scalars['Json']>;
  array_starts_with?: InputMaybe<Scalars['Json']>;
  equals?: InputMaybe<Scalars['Json']>;
  gt?: InputMaybe<Scalars['Json']>;
  gte?: InputMaybe<Scalars['Json']>;
  lt?: InputMaybe<Scalars['Json']>;
  lte?: InputMaybe<Scalars['Json']>;
  not?: InputMaybe<Scalars['Json']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type JsonNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedJsonNullableFilter>;
  _min?: InputMaybe<NestedJsonNullableFilter>;
  array_contains?: InputMaybe<Scalars['Json']>;
  array_ends_with?: InputMaybe<Scalars['Json']>;
  array_starts_with?: InputMaybe<Scalars['Json']>;
  equals?: InputMaybe<Scalars['Json']>;
  gt?: InputMaybe<Scalars['Json']>;
  gte?: InputMaybe<Scalars['Json']>;
  lt?: InputMaybe<Scalars['Json']>;
  lte?: InputMaybe<Scalars['Json']>;
  not?: InputMaybe<Scalars['Json']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authPasswordChange?: Maybe<Scalars['Boolean']>;
  authPasswordResetConfirmation: AuthSession;
  authRegister: AuthSession;
  createOneUser: User;
  deleteManyUser?: Maybe<BatchPayload>;
  deleteOneUser?: Maybe<User>;
  sampleUpload: Scalars['Boolean'];
  sampleUploadMany: Array<Scalars['String']>;
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


export type MutationSampleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationSampleUploadManyArgs = {
  files: Array<Scalars['Upload']>;
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

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedJsonNullableFilter = {
  array_contains?: InputMaybe<Scalars['Json']>;
  array_ends_with?: InputMaybe<Scalars['Json']>;
  array_starts_with?: InputMaybe<Scalars['Json']>;
  equals?: InputMaybe<Scalars['Json']>;
  gt?: InputMaybe<Scalars['Json']>;
  gte?: InputMaybe<Scalars['Json']>;
  lt?: InputMaybe<Scalars['Json']>;
  lte?: InputMaybe<Scalars['Json']>;
  not?: InputMaybe<Scalars['Json']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
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

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
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

export enum NullableJsonNullValueInput {
  DbNull = 'DbNull',
  JsonNull = 'JsonNull'
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  accountInfo: AccountInfo;
  aggregateUser?: Maybe<AggregateUser>;
  authExchangeToken: AuthSession;
  authLogin: AuthSession;
  authPasswordResetRequest?: Maybe<Scalars['Boolean']>;
  findFirstUser?: Maybe<User>;
  findManyUser?: Maybe<Array<User>>;
  findManyUserCount: Scalars['Int'];
  findUniqueUser?: Maybe<User>;
  loggedIn: Scalars['Boolean'];
  userRoles: Array<Scalars['String']>;
};


export type QueryAggregateUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryAuthExchangeTokenArgs = {
  data?: InputMaybe<AuthExchangeTokenInput>;
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

export type SampleSubscriptionResult = {
  __typename?: 'SampleSubscriptionResult';
  message: Scalars['String'];
};

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

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
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

export type Subscription = {
  __typename?: 'Subscription';
  sampleSubscription: SampleSubscriptionResult;
};

export enum TransactionIsolationLevel {
  ReadCommitted = 'ReadCommitted',
  ReadUncommitted = 'ReadUncommitted',
  RepeatableRead = 'RepeatableRead',
  Serializable = 'Serializable'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  googleId?: Maybe<Scalars['String']>;
  googleProfile?: Maybe<Scalars['Json']>;
  id: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  roles: Array<Scalars['String']>;
  rules: Array<Scalars['Json']>;
  username?: Maybe<Scalars['String']>;
};

export type UserCountAggregateOutputType = {
  __typename?: 'UserCountAggregateOutputType';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  email: Scalars['Int'];
  googleId: Scalars['Int'];
  googleProfile: Scalars['Int'];
  id: Scalars['Int'];
  password: Scalars['Int'];
  roles: Scalars['Int'];
  username: Scalars['Int'];
};

export type UserCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  googleId?: InputMaybe<SortOrder>;
  googleProfile?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  roles?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  googleId?: InputMaybe<Scalars['String']>;
  googleProfile?: InputMaybe<Scalars['Json']>;
  id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  googleId?: InputMaybe<Scalars['String']>;
  googleProfile?: InputMaybe<Scalars['Json']>;
  id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserCreaterolesInput = {
  set: Array<Scalars['String']>;
};

export type UserMaxAggregateOutputType = {
  __typename?: 'UserMaxAggregateOutputType';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  googleId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserMinAggregateOutputType = {
  __typename?: 'UserMinAggregateOutputType';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  googleId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  googleId?: InputMaybe<SortOrder>;
  googleProfile?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  roles?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  googleId?: InputMaybe<SortOrder>;
  googleProfile?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  roles?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  Email = 'email',
  GoogleId = 'googleId',
  GoogleProfile = 'googleProfile',
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
  googleId?: InputMaybe<StringNullableWithAggregatesFilter>;
  googleProfile?: InputMaybe<JsonNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  password?: InputMaybe<StringNullableWithAggregatesFilter>;
  roles?: InputMaybe<StringNullableListFilter>;
  username?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type UserUncheckedCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  googleId?: InputMaybe<Scalars['String']>;
  googleProfile?: InputMaybe<Scalars['Json']>;
  id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserUncheckedUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  googleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  googleProfile?: InputMaybe<Scalars['Json']>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUncheckedUpdateManyInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  googleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  googleProfile?: InputMaybe<Scalars['Json']>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  googleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  googleProfile?: InputMaybe<Scalars['Json']>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  googleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  googleProfile?: InputMaybe<Scalars['Json']>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpdaterolesInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  googleId?: InputMaybe<StringNullableFilter>;
  googleProfile?: InputMaybe<JsonNullableFilter>;
  id?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringNullableFilter>;
  roles?: InputMaybe<StringNullableListFilter>;
  username?: InputMaybe<StringNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  googleId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type AuthExchangeTokenVariables = Exact<{
  data: AuthExchangeTokenInput;
}>;


export type AuthExchangeToken = { __typename?: 'Query', authExchangeToken: { __typename?: 'AuthSession', userId: string, token: string, rememberMe: boolean, roles: Array<string>, expiresIn: number, rules: Array<any> } };

export type AuthLoginVariables = Exact<{
  data: AuthLoginInput;
}>;


export type AuthLogin = { __typename?: 'Query', authLogin: { __typename?: 'AuthSession', userId: string, token: string, rememberMe: boolean, roles: Array<string>, expiresIn: number, rules: Array<any> } };

export type GetAccountInfoVariables = Exact<{ [key: string]: never; }>;


export type GetAccountInfo = { __typename?: 'Query', accountInfo: { __typename?: 'AccountInfo', username?: string | null, hasPassword: boolean, googleProfile?: { __typename?: 'GoogleProfile', email?: string | null, picture?: string | null } | null } };

export type AuthPasswordChangeVariables = Exact<{
  data: AuthPasswordChangeInput;
}>;


export type AuthPasswordChange = { __typename?: 'Mutation', authPasswordChange?: boolean | null };

export type AuthPasswordResetConfirmationVariables = Exact<{
  data: AuthPasswordResetConfirmationInput;
}>;


export type AuthPasswordResetConfirmation = { __typename?: 'Mutation', authPasswordResetConfirmation: { __typename?: 'AuthSession', userId: string, token: string, rememberMe: boolean, roles: Array<string>, expiresIn: number, rules: Array<any> } };

export type AuthPasswordResetRequestQueryVariables = Exact<{
  data: AuthPasswordResetRequestInput;
}>;


export type AuthPasswordResetRequestQuery = { __typename?: 'Query', authPasswordResetRequest?: boolean | null };

export type AuthRegisterVariables = Exact<{
  data: AuthRegisterInput;
}>;


export type AuthRegister = { __typename?: 'Mutation', authRegister: { __typename?: 'AuthSession', userId: string, token: string, rememberMe: boolean, roles: Array<string>, expiresIn: number, rules: Array<any> } };

export type LoggedInVariables = Exact<{ [key: string]: never; }>;


export type LoggedIn = { __typename?: 'Query', loggedIn: boolean };

export type UserRolesVariables = Exact<{ [key: string]: never; }>;


export type UserRoles = { __typename?: 'Query', userRoles: Array<string> };

export type AccountInfoFields = { __typename?: 'AccountInfo', username?: string | null, hasPassword: boolean, googleProfile?: { __typename?: 'GoogleProfile', email?: string | null, picture?: string | null } | null };

export type AuthSessionFields = { __typename?: 'AuthSession', userId: string, token: string, rememberMe: boolean, roles: Array<string>, expiresIn: number, rules: Array<any> };

export type GoogleProfileFields = { __typename?: 'GoogleProfile', email?: string | null, picture?: string | null };

export type UserFields = { __typename?: 'User', id: string, username?: string | null, email: string };

export type FindUniqueUserVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type FindUniqueUser = { __typename?: 'Query', findUniqueUser?: { __typename?: 'User', id: string, username?: string | null, email: string } | null };

export type FindFirstUserVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>> | InputMaybe<UserOrderByWithRelationInput>>;
  cursor?: InputMaybe<UserWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  distinct?: InputMaybe<Array<InputMaybe<UserScalarFieldEnum>> | InputMaybe<UserScalarFieldEnum>>;
}>;


export type FindFirstUser = { __typename?: 'Query', findFirstUser?: { __typename?: 'User', id: string, username?: string | null, email: string } | null };

export type FindManyUserVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>> | InputMaybe<UserOrderByWithRelationInput>>;
  cursor?: InputMaybe<UserWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  distinct?: InputMaybe<Array<InputMaybe<UserScalarFieldEnum>> | InputMaybe<UserScalarFieldEnum>>;
}>;


export type FindManyUser = { __typename?: 'Query', findManyUser?: Array<{ __typename?: 'User', id: string, username?: string | null, email: string }> | null };

export type FindManyUserCountVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>> | InputMaybe<UserOrderByWithRelationInput>>;
  cursor?: InputMaybe<UserWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  distinct?: InputMaybe<Array<InputMaybe<UserScalarFieldEnum>> | InputMaybe<UserScalarFieldEnum>>;
}>;


export type FindManyUserCount = { __typename?: 'Query', findManyUserCount: number };

export type CreateOneUserVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateOneUser = { __typename?: 'Mutation', createOneUser: { __typename?: 'User', id: string, username?: string | null, email: string } };

export type UpdateOneUserVariables = Exact<{
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
}>;


export type UpdateOneUser = { __typename?: 'Mutation', updateOneUser: { __typename?: 'User', id: string, username?: string | null, email: string } };

export type UpdateManyUserVariables = Exact<{
  data: UserUpdateManyMutationInput;
  where: UserWhereInput;
}>;


export type UpdateManyUser = { __typename?: 'Mutation', updateManyUser?: { __typename?: 'BatchPayload', count: number } | null };

export type UpsertOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
}>;


export type UpsertOneUser = { __typename?: 'Mutation', upsertOneUser?: { __typename?: 'User', id: string, username?: string | null, email: string } | null };

export type DeleteOneUserVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type DeleteOneUser = { __typename?: 'Mutation', deleteOneUser?: { __typename?: 'User', id: string } | null };

export type DeleteManyUserVariables = Exact<{
  where: UserWhereInput;
}>;


export type DeleteManyUser = { __typename?: 'Mutation', deleteManyUser?: { __typename?: 'BatchPayload', count: number } | null };

export type SampleSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SampleSubscription = { __typename?: 'Subscription', sampleSubscription: { __typename?: 'SampleSubscriptionResult', message: string } };

export type SampleUploadVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type SampleUpload = { __typename?: 'Mutation', sampleUpload: boolean };

export const GoogleProfileFields = /*#__PURE__*/ gql`
    fragment GoogleProfileFields on GoogleProfile {
  email
  picture
}
    `;
export const AccountInfoFields = /*#__PURE__*/ gql`
    fragment AccountInfoFields on AccountInfo {
  username
  hasPassword
  googleProfile {
    ...GoogleProfileFields
  }
}
    ${GoogleProfileFields}`;
export const AuthSessionFields = /*#__PURE__*/ gql`
    fragment AuthSessionFields on AuthSession {
  userId
  token
  rememberMe
  roles
  expiresIn
  rules
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
    query AuthExchangeToken($data: AuthExchangeTokenInput!) {
  authExchangeToken(data: $data) {
    ...AuthSessionFields
  }
}
    ${AuthSessionFields}`;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class AuthExchangeTokenGQL extends Apollo.Query<AuthExchangeToken, AuthExchangeTokenVariables> {
    override document = AuthExchangeTokenDocument;
    
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
    override document = AuthLoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAccountInfoDocument = /*#__PURE__*/ gql`
    query GetAccountInfo {
  accountInfo {
    ...AccountInfoFields
  }
}
    ${AccountInfoFields}`;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class GetAccountInfoGQL extends Apollo.Query<GetAccountInfo, GetAccountInfoVariables> {
    override document = GetAccountInfoDocument;
    
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
    override document = AuthPasswordChangeDocument;
    
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
    override document = AuthPasswordResetConfirmationDocument;
    
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
    override document = AuthPasswordResetRequestQueryDocument;
    
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
    override document = AuthRegisterDocument;
    
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
    override document = LoggedInDocument;
    
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
    override document = UserRolesDocument;
    
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
    override document = FindUniqueUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindFirstUserDocument = /*#__PURE__*/ gql`
    query FindFirstUser($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput], $cursor: UserWhereUniqueInput, $take: Int, $skip: Int, $distinct: [UserScalarFieldEnum]) {
  findFirstUser(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    take: $take
    skip: $skip
    distinct: $distinct
  ) {
    ...UserFields
  }
}
    ${UserFields}`;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class FindFirstUserGQL extends Apollo.Query<FindFirstUser, FindFirstUserVariables> {
    override document = FindFirstUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyUserDocument = /*#__PURE__*/ gql`
    query FindManyUser($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput], $cursor: UserWhereUniqueInput, $take: Int, $skip: Int, $distinct: [UserScalarFieldEnum]) {
  findManyUser(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    take: $take
    skip: $skip
    distinct: $distinct
  ) {
    ...UserFields
  }
}
    ${UserFields}`;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class FindManyUserGQL extends Apollo.Query<FindManyUser, FindManyUserVariables> {
    override document = FindManyUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyUserCountDocument = /*#__PURE__*/ gql`
    query FindManyUserCount($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput], $cursor: UserWhereUniqueInput, $take: Int, $skip: Int, $distinct: [UserScalarFieldEnum]) {
  findManyUserCount(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    take: $take
    skip: $skip
    distinct: $distinct
  )
}
    `;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class FindManyUserCountGQL extends Apollo.Query<FindManyUserCount, FindManyUserCountVariables> {
    override document = FindManyUserCountDocument;
    
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
    override document = CreateOneUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneUserDocument = /*#__PURE__*/ gql`
    mutation UpdateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
  updateOneUser(data: $data, where: $where) {
    ...UserFields
  }
}
    ${UserFields}`;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class UpdateOneUserGQL extends Apollo.Mutation<UpdateOneUser, UpdateOneUserVariables> {
    override document = UpdateOneUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateManyUserDocument = /*#__PURE__*/ gql`
    mutation UpdateManyUser($data: UserUpdateManyMutationInput!, $where: UserWhereInput!) {
  updateManyUser(data: $data, where: $where) {
    count
  }
}
    `;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class UpdateManyUserGQL extends Apollo.Mutation<UpdateManyUser, UpdateManyUserVariables> {
    override document = UpdateManyUserDocument;
    
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
    override document = UpsertOneUserDocument;
    
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
    override document = DeleteOneUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteManyUserDocument = /*#__PURE__*/ gql`
    mutation DeleteManyUser($where: UserWhereInput!) {
  deleteManyUser(where: $where) {
    count
  }
}
    `;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class DeleteManyUserGQL extends Apollo.Mutation<DeleteManyUser, DeleteManyUserVariables> {
    override document = DeleteManyUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SampleSubscriptionDocument = /*#__PURE__*/ gql`
    subscription SampleSubscription {
  sampleSubscription {
    message
  }
}
    `;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class SampleSubscriptionGQL extends Apollo.Subscription<SampleSubscription, SampleSubscriptionVariables> {
    override document = SampleSubscriptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SampleUploadDocument = /*#__PURE__*/ gql`
    mutation SampleUpload($file: Upload!) {
  sampleUpload(file: $file)
}
    `;

  @Injectable({
    providedIn: ZenGraphQLModule
  })
  export class SampleUploadGQL extends Apollo.Mutation<SampleUpload, SampleUploadVariables> {
    override document = SampleUploadDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }