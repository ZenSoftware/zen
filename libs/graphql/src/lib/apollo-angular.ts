import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
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

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum UserDistinctFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  Email = 'email',
  Name = 'name',
  Password = 'password',
  GroupId = 'groupId'
}

export enum PostDistinctFieldEnum {
  Id = 'id',
  Published = 'published',
  Title = 'title',
  AuthorId = 'authorId',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export enum CommentDistinctFieldEnum {
  Id = 'id',
  Contain = 'contain',
  PostId = 'postId',
  AuthorId = 'authorId',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export enum GroupDistinctFieldEnum {
  Id = 'id',
  Name = 'name',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

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

export type NestedBoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};

export type UserRelationFilter = {
  is?: Maybe<UserWhereInput>;
  isNot?: Maybe<UserWhereInput>;
};

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
};

export type IntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
};

export type PostRelationFilter = {
  is?: Maybe<PostWhereInput>;
  isNot?: Maybe<PostWhereInput>;
};

export type CommentWhereInput = {
  AND?: Maybe<Array<CommentWhereInput>>;
  OR?: Maybe<Array<CommentWhereInput>>;
  NOT?: Maybe<Array<CommentWhereInput>>;
  id?: Maybe<IntFilter>;
  contain?: Maybe<StringFilter>;
  post?: Maybe<PostWhereInput>;
  postId?: Maybe<IntFilter>;
  author?: Maybe<UserWhereInput>;
  authorId?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type CommentListRelationFilter = {
  every?: Maybe<CommentWhereInput>;
  some?: Maybe<CommentWhereInput>;
  none?: Maybe<CommentWhereInput>;
};

export type PostWhereInput = {
  AND?: Maybe<Array<PostWhereInput>>;
  OR?: Maybe<Array<PostWhereInput>>;
  NOT?: Maybe<Array<PostWhereInput>>;
  id?: Maybe<IntFilter>;
  published?: Maybe<BoolFilter>;
  title?: Maybe<StringFilter>;
  author?: Maybe<UserWhereInput>;
  authorId?: Maybe<IntNullableFilter>;
  comments?: Maybe<CommentListRelationFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type PostListRelationFilter = {
  every?: Maybe<PostWhereInput>;
  some?: Maybe<PostWhereInput>;
  none?: Maybe<PostWhereInput>;
};

export type UserListRelationFilter = {
  every?: Maybe<UserWhereInput>;
  some?: Maybe<UserWhereInput>;
  none?: Maybe<UserWhereInput>;
};

export type GroupWhereInput = {
  AND?: Maybe<Array<GroupWhereInput>>;
  OR?: Maybe<Array<GroupWhereInput>>;
  NOT?: Maybe<Array<GroupWhereInput>>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  users?: Maybe<UserListRelationFilter>;
};

export type GroupRelationFilter = {
  is?: Maybe<GroupWhereInput>;
  isNot?: Maybe<GroupWhereInput>;
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  email?: Maybe<StringFilter>;
  name?: Maybe<StringNullableFilter>;
  password?: Maybe<StringFilter>;
  posts?: Maybe<PostListRelationFilter>;
  group?: Maybe<GroupWhereInput>;
  groupId?: Maybe<IntNullableFilter>;
  comments?: Maybe<CommentListRelationFilter>;
};

export type UserOrderByInput = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  groupId?: Maybe<SortOrder>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
};

export type PostOrderByInput = {
  id?: Maybe<SortOrder>;
  published?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  authorId?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type PostWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type CommentOrderByInput = {
  id?: Maybe<SortOrder>;
  contain?: Maybe<SortOrder>;
  postId?: Maybe<SortOrder>;
  authorId?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type GroupOrderByInput = {
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type GroupWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type GroupCreateWithoutUsersInput = {
  name: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GroupCreateOneWithoutUsersInput = {
  create?: Maybe<GroupCreateWithoutUsersInput>;
  connect?: Maybe<GroupWhereUniqueInput>;
};

export type UserCreateWithoutCommentsInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: Maybe<PostCreateManyWithoutAuthorInput>;
  group?: Maybe<GroupCreateOneWithoutUsersInput>;
};

export type UserCreateOneWithoutCommentsInput = {
  create?: Maybe<UserCreateWithoutCommentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type CommentCreateWithoutPostInput = {
  contain: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserCreateOneWithoutCommentsInput>;
};

export type CommentCreateManyWithoutPostInput = {
  create?: Maybe<Array<CommentCreateWithoutPostInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
};

export type PostCreateWithoutAuthorInput = {
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  comments?: Maybe<CommentCreateManyWithoutPostInput>;
};

export type PostCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<PostCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<PostWhereUniqueInput>>;
};

export type UserCreateWithoutPostsInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  group?: Maybe<GroupCreateOneWithoutUsersInput>;
  comments?: Maybe<CommentCreateManyWithoutAuthorInput>;
};

export type UserCreateOneWithoutPostsInput = {
  create?: Maybe<UserCreateWithoutPostsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type PostCreateWithoutCommentsInput = {
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserCreateOneWithoutPostsInput>;
};

export type PostCreateOneWithoutCommentsInput = {
  create?: Maybe<PostCreateWithoutCommentsInput>;
  connect?: Maybe<PostWhereUniqueInput>;
};

export type CommentCreateWithoutAuthorInput = {
  contain: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  post: PostCreateOneWithoutCommentsInput;
};

export type CommentCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<CommentCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
};

export type UserCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: Maybe<PostCreateManyWithoutAuthorInput>;
  group?: Maybe<GroupCreateOneWithoutUsersInput>;
  comments?: Maybe<CommentCreateManyWithoutAuthorInput>;
};

export type GroupUpdateWithoutUsersDataInput = {
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GroupUpsertWithoutUsersInput = {
  update: GroupUpdateWithoutUsersDataInput;
  create: GroupCreateWithoutUsersInput;
};

export type GroupUpdateOneWithoutUsersInput = {
  create?: Maybe<GroupCreateWithoutUsersInput>;
  connect?: Maybe<GroupWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<GroupUpdateWithoutUsersDataInput>;
  upsert?: Maybe<GroupUpsertWithoutUsersInput>;
};

export type UserUpdateWithoutCommentsDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  posts?: Maybe<PostUpdateManyWithoutAuthorInput>;
  group?: Maybe<GroupUpdateOneWithoutUsersInput>;
};

export type UserUpsertWithoutCommentsInput = {
  update: UserUpdateWithoutCommentsDataInput;
  create: UserCreateWithoutCommentsInput;
};

export type UserUpdateOneWithoutCommentsInput = {
  create?: Maybe<UserCreateWithoutCommentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutCommentsDataInput>;
  upsert?: Maybe<UserUpsertWithoutCommentsInput>;
};

export type CommentUpdateWithoutPostDataInput = {
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserUpdateOneWithoutCommentsInput>;
};

export type CommentUpdateWithWhereUniqueWithoutPostInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutPostDataInput;
};

export type CommentScalarWhereInput = {
  AND?: Maybe<Array<CommentScalarWhereInput>>;
  OR?: Maybe<Array<CommentScalarWhereInput>>;
  NOT?: Maybe<Array<CommentScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  contain?: Maybe<StringFilter>;
  postId?: Maybe<IntFilter>;
  authorId?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type CommentUpdateManyDataInput = {
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentUpdateManyWithWhereNestedInput = {
  where: CommentScalarWhereInput;
  data: CommentUpdateManyDataInput;
};

export type CommentUpsertWithWhereUniqueWithoutPostInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutPostDataInput;
  create: CommentCreateWithoutPostInput;
};

export type CommentUpdateManyWithoutPostInput = {
  create?: Maybe<Array<CommentCreateWithoutPostInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutPostInput>>;
};

export type PostUpdateWithoutAuthorDataInput = {
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  comments?: Maybe<CommentUpdateManyWithoutPostInput>;
};

export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput;
  data: PostUpdateWithoutAuthorDataInput;
};

export type PostScalarWhereInput = {
  AND?: Maybe<Array<PostScalarWhereInput>>;
  OR?: Maybe<Array<PostScalarWhereInput>>;
  NOT?: Maybe<Array<PostScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  published?: Maybe<BoolFilter>;
  title?: Maybe<StringFilter>;
  authorId?: Maybe<IntNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type PostUpdateManyDataInput = {
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput;
  data: PostUpdateManyDataInput;
};

export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput;
  update: PostUpdateWithoutAuthorDataInput;
  create: PostCreateWithoutAuthorInput;
};

export type PostUpdateManyWithoutAuthorInput = {
  create?: Maybe<Array<PostCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<PostWhereUniqueInput>>;
  set?: Maybe<Array<PostWhereUniqueInput>>;
  disconnect?: Maybe<Array<PostWhereUniqueInput>>;
  delete?: Maybe<Array<PostWhereUniqueInput>>;
  update?: Maybe<Array<PostUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: Maybe<Array<PostUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<PostScalarWhereInput>>;
  upsert?: Maybe<Array<PostUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type UserUpdateWithoutPostsDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  group?: Maybe<GroupUpdateOneWithoutUsersInput>;
  comments?: Maybe<CommentUpdateManyWithoutAuthorInput>;
};

export type UserUpsertWithoutPostsInput = {
  update: UserUpdateWithoutPostsDataInput;
  create: UserCreateWithoutPostsInput;
};

export type UserUpdateOneWithoutPostsInput = {
  create?: Maybe<UserCreateWithoutPostsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutPostsDataInput>;
  upsert?: Maybe<UserUpsertWithoutPostsInput>;
};

export type PostUpdateWithoutCommentsDataInput = {
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserUpdateOneWithoutPostsInput>;
};

export type PostUpsertWithoutCommentsInput = {
  update: PostUpdateWithoutCommentsDataInput;
  create: PostCreateWithoutCommentsInput;
};

export type PostUpdateOneRequiredWithoutCommentsInput = {
  create?: Maybe<PostCreateWithoutCommentsInput>;
  connect?: Maybe<PostWhereUniqueInput>;
  update?: Maybe<PostUpdateWithoutCommentsDataInput>;
  upsert?: Maybe<PostUpsertWithoutCommentsInput>;
};

export type CommentUpdateWithoutAuthorDataInput = {
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  post?: Maybe<PostUpdateOneRequiredWithoutCommentsInput>;
};

export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutAuthorDataInput;
};

export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutAuthorDataInput;
  create: CommentCreateWithoutAuthorInput;
};

export type CommentUpdateManyWithoutAuthorInput = {
  create?: Maybe<Array<CommentCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type UserUpdateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  posts?: Maybe<PostUpdateManyWithoutAuthorInput>;
  group?: Maybe<GroupUpdateOneWithoutUsersInput>;
  comments?: Maybe<CommentUpdateManyWithoutAuthorInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type PostCreateInput = {
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserCreateOneWithoutPostsInput>;
  comments?: Maybe<CommentCreateManyWithoutPostInput>;
};

export type PostUpdateInput = {
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserUpdateOneWithoutPostsInput>;
  comments?: Maybe<CommentUpdateManyWithoutPostInput>;
};

export type PostUpdateManyMutationInput = {
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentCreateInput = {
  contain: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  post: PostCreateOneWithoutCommentsInput;
  author?: Maybe<UserCreateOneWithoutCommentsInput>;
};

export type CommentUpdateInput = {
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  post?: Maybe<PostUpdateOneRequiredWithoutCommentsInput>;
  author?: Maybe<UserUpdateOneWithoutCommentsInput>;
};

export type CommentUpdateManyMutationInput = {
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserCreateWithoutGroupInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: Maybe<PostCreateManyWithoutAuthorInput>;
  comments?: Maybe<CommentCreateManyWithoutAuthorInput>;
};

export type UserCreateManyWithoutGroupInput = {
  create?: Maybe<Array<UserCreateWithoutGroupInput>>;
  connect?: Maybe<Array<UserWhereUniqueInput>>;
};

export type GroupCreateInput = {
  name: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserCreateManyWithoutGroupInput>;
};

export type UserUpdateWithoutGroupDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  posts?: Maybe<PostUpdateManyWithoutAuthorInput>;
  comments?: Maybe<CommentUpdateManyWithoutAuthorInput>;
};

export type UserUpdateWithWhereUniqueWithoutGroupInput = {
  where: UserWhereUniqueInput;
  data: UserUpdateWithoutGroupDataInput;
};

export type UserScalarWhereInput = {
  AND?: Maybe<Array<UserScalarWhereInput>>;
  OR?: Maybe<Array<UserScalarWhereInput>>;
  NOT?: Maybe<Array<UserScalarWhereInput>>;
  id?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  email?: Maybe<StringFilter>;
  name?: Maybe<StringNullableFilter>;
  password?: Maybe<StringFilter>;
  groupId?: Maybe<IntNullableFilter>;
};

export type UserUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserUpdateManyWithWhereNestedInput = {
  where: UserScalarWhereInput;
  data: UserUpdateManyDataInput;
};

export type UserUpsertWithWhereUniqueWithoutGroupInput = {
  where: UserWhereUniqueInput;
  update: UserUpdateWithoutGroupDataInput;
  create: UserCreateWithoutGroupInput;
};

export type UserUpdateManyWithoutGroupInput = {
  create?: Maybe<Array<UserCreateWithoutGroupInput>>;
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  set?: Maybe<Array<UserWhereUniqueInput>>;
  disconnect?: Maybe<Array<UserWhereUniqueInput>>;
  delete?: Maybe<Array<UserWhereUniqueInput>>;
  update?: Maybe<Array<UserUpdateWithWhereUniqueWithoutGroupInput>>;
  updateMany?: Maybe<Array<UserUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<UserScalarWhereInput>>;
  upsert?: Maybe<Array<UserUpsertWithWhereUniqueWithoutGroupInput>>;
};

export type GroupUpdateInput = {
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserUpdateManyWithoutGroupInput>;
};

export type GroupUpdateManyMutationInput = {
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserAvgAggregateOutputType = {
  __typename?: 'UserAvgAggregateOutputType';
  id: Scalars['Float'];
  groupId: Scalars['Float'];
};

export type UserSumAggregateOutputType = {
  __typename?: 'UserSumAggregateOutputType';
  id: Scalars['Int'];
  groupId?: Maybe<Scalars['Int']>;
};

export type UserMinAggregateOutputType = {
  __typename?: 'UserMinAggregateOutputType';
  id: Scalars['Int'];
  groupId?: Maybe<Scalars['Int']>;
};

export type UserMaxAggregateOutputType = {
  __typename?: 'UserMaxAggregateOutputType';
  id: Scalars['Int'];
  groupId?: Maybe<Scalars['Int']>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  count: Scalars['Int'];
  avg?: Maybe<UserAvgAggregateOutputType>;
  sum?: Maybe<UserSumAggregateOutputType>;
  min?: Maybe<UserMinAggregateOutputType>;
  max?: Maybe<UserMaxAggregateOutputType>;
};

export type PostAvgAggregateOutputType = {
  __typename?: 'PostAvgAggregateOutputType';
  id: Scalars['Float'];
  authorId: Scalars['Float'];
};

export type PostSumAggregateOutputType = {
  __typename?: 'PostSumAggregateOutputType';
  id: Scalars['Int'];
  authorId?: Maybe<Scalars['Int']>;
};

export type PostMinAggregateOutputType = {
  __typename?: 'PostMinAggregateOutputType';
  id: Scalars['Int'];
  authorId?: Maybe<Scalars['Int']>;
};

export type PostMaxAggregateOutputType = {
  __typename?: 'PostMaxAggregateOutputType';
  id: Scalars['Int'];
  authorId?: Maybe<Scalars['Int']>;
};

export type AggregatePost = {
  __typename?: 'AggregatePost';
  count: Scalars['Int'];
  avg?: Maybe<PostAvgAggregateOutputType>;
  sum?: Maybe<PostSumAggregateOutputType>;
  min?: Maybe<PostMinAggregateOutputType>;
  max?: Maybe<PostMaxAggregateOutputType>;
};

export type CommentAvgAggregateOutputType = {
  __typename?: 'CommentAvgAggregateOutputType';
  id: Scalars['Float'];
  postId: Scalars['Float'];
  authorId: Scalars['Float'];
};

export type CommentSumAggregateOutputType = {
  __typename?: 'CommentSumAggregateOutputType';
  id: Scalars['Int'];
  postId: Scalars['Int'];
  authorId?: Maybe<Scalars['Int']>;
};

export type CommentMinAggregateOutputType = {
  __typename?: 'CommentMinAggregateOutputType';
  id: Scalars['Int'];
  postId: Scalars['Int'];
  authorId?: Maybe<Scalars['Int']>;
};

export type CommentMaxAggregateOutputType = {
  __typename?: 'CommentMaxAggregateOutputType';
  id: Scalars['Int'];
  postId: Scalars['Int'];
  authorId?: Maybe<Scalars['Int']>;
};

export type AggregateComment = {
  __typename?: 'AggregateComment';
  count: Scalars['Int'];
  avg?: Maybe<CommentAvgAggregateOutputType>;
  sum?: Maybe<CommentSumAggregateOutputType>;
  min?: Maybe<CommentMinAggregateOutputType>;
  max?: Maybe<CommentMaxAggregateOutputType>;
};

export type GroupAvgAggregateOutputType = {
  __typename?: 'GroupAvgAggregateOutputType';
  id: Scalars['Float'];
};

export type GroupSumAggregateOutputType = {
  __typename?: 'GroupSumAggregateOutputType';
  id: Scalars['Int'];
};

export type GroupMinAggregateOutputType = {
  __typename?: 'GroupMinAggregateOutputType';
  id: Scalars['Int'];
};

export type GroupMaxAggregateOutputType = {
  __typename?: 'GroupMaxAggregateOutputType';
  id: Scalars['Int'];
};

export type AggregateGroup = {
  __typename?: 'AggregateGroup';
  count: Scalars['Int'];
  avg?: Maybe<GroupAvgAggregateOutputType>;
  sum?: Maybe<GroupSumAggregateOutputType>;
  min?: Maybe<GroupMinAggregateOutputType>;
  max?: Maybe<GroupMaxAggregateOutputType>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Int'];
  contain: Scalars['String'];
  post: Post;
  postId: Scalars['Int'];
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  findOneComment?: Maybe<Comment>;
  findManyComment?: Maybe<Array<Comment>>;
  findManyCommentCount: Scalars['Int'];
  findOnePost?: Maybe<Post>;
  findManyPost?: Maybe<Array<Post>>;
  findManyPostCount: Scalars['Int'];
  findOneGroup?: Maybe<Group>;
  findManyGroup?: Maybe<Array<Group>>;
  findManyGroupCount: Scalars['Int'];
  findOneUser?: Maybe<User>;
  findManyUser?: Maybe<Array<User>>;
  findManyUserCount: Scalars['Int'];
};


export type QueryFindOneCommentArgs = {
  where: CommentWhereUniqueInput;
};


export type QueryFindManyCommentArgs = {
  where?: Maybe<CommentWhereInput>;
  orderBy?: Maybe<Array<CommentOrderByInput>>;
  cursor?: Maybe<CommentWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryFindManyCommentCountArgs = {
  where?: Maybe<CommentWhereInput>;
  orderBy?: Maybe<Array<CommentOrderByInput>>;
  cursor?: Maybe<CommentWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryFindOnePostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryFindManyPostArgs = {
  where?: Maybe<PostWhereInput>;
  orderBy?: Maybe<Array<PostOrderByInput>>;
  cursor?: Maybe<PostWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryFindManyPostCountArgs = {
  where?: Maybe<PostWhereInput>;
  orderBy?: Maybe<Array<PostOrderByInput>>;
  cursor?: Maybe<PostWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryFindOneGroupArgs = {
  where: GroupWhereUniqueInput;
};


export type QueryFindManyGroupArgs = {
  where?: Maybe<GroupWhereInput>;
  orderBy?: Maybe<Array<GroupOrderByInput>>;
  cursor?: Maybe<GroupWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryFindManyGroupCountArgs = {
  where?: Maybe<GroupWhereInput>;
  orderBy?: Maybe<Array<GroupOrderByInput>>;
  cursor?: Maybe<GroupWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryFindOneUserArgs = {
  where: UserWhereUniqueInput;
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

export type Mutation = {
  __typename?: 'Mutation';
  createOneComment: Comment;
  updateOneComment: Comment;
  deleteOneComment?: Maybe<Comment>;
  upsertOneComment?: Maybe<Comment>;
  deleteManyComment?: Maybe<BatchPayload>;
  updateManyComment?: Maybe<BatchPayload>;
  createOnePost: Post;
  updateOnePost: Post;
  deleteOnePost?: Maybe<Post>;
  upsertOnePost?: Maybe<Post>;
  deleteManyPost?: Maybe<BatchPayload>;
  updateManyPost?: Maybe<BatchPayload>;
  createOneGroup: Group;
  updateOneGroup: Group;
  deleteOneGroup?: Maybe<Group>;
  upsertOneGroup?: Maybe<Group>;
  deleteManyGroup?: Maybe<BatchPayload>;
  updateManyGroup?: Maybe<BatchPayload>;
  createOneUser: User;
  updateOneUser: User;
  deleteOneUser?: Maybe<User>;
  upsertOneUser?: Maybe<User>;
  deleteManyUser?: Maybe<BatchPayload>;
  updateManyUser?: Maybe<BatchPayload>;
};


export type MutationCreateOneCommentArgs = {
  data: CommentCreateInput;
};


export type MutationUpdateOneCommentArgs = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateInput;
};


export type MutationDeleteOneCommentArgs = {
  where: CommentWhereUniqueInput;
};


export type MutationUpsertOneCommentArgs = {
  where: CommentWhereUniqueInput;
  create: CommentCreateInput;
  update: CommentUpdateInput;
};


export type MutationDeleteManyCommentArgs = {
  where?: Maybe<CommentWhereInput>;
};


export type MutationUpdateManyCommentArgs = {
  where?: Maybe<CommentWhereInput>;
  data?: Maybe<CommentUpdateManyMutationInput>;
};


export type MutationCreateOnePostArgs = {
  data: PostCreateInput;
};


export type MutationUpdateOnePostArgs = {
  where: PostWhereUniqueInput;
  data: PostUpdateInput;
};


export type MutationDeleteOnePostArgs = {
  where: PostWhereUniqueInput;
};


export type MutationUpsertOnePostArgs = {
  where: PostWhereUniqueInput;
  create: PostCreateInput;
  update: PostUpdateInput;
};


export type MutationDeleteManyPostArgs = {
  where?: Maybe<PostWhereInput>;
};


export type MutationUpdateManyPostArgs = {
  where?: Maybe<PostWhereInput>;
  data?: Maybe<PostUpdateManyMutationInput>;
};


export type MutationCreateOneGroupArgs = {
  data: GroupCreateInput;
};


export type MutationUpdateOneGroupArgs = {
  where: GroupWhereUniqueInput;
  data: GroupUpdateInput;
};


export type MutationDeleteOneGroupArgs = {
  where: GroupWhereUniqueInput;
};


export type MutationUpsertOneGroupArgs = {
  where: GroupWhereUniqueInput;
  create: GroupCreateInput;
  update: GroupUpdateInput;
};


export type MutationDeleteManyGroupArgs = {
  where?: Maybe<GroupWhereInput>;
};


export type MutationUpdateManyGroupArgs = {
  where?: Maybe<GroupWhereInput>;
  data?: Maybe<GroupUpdateManyMutationInput>;
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

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['Int']>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type PostCommentsArgs = {
  where?: Maybe<CommentWhereInput>;
  orderBy?: Maybe<CommentOrderByInput>;
  cursor?: Maybe<CommentWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<CommentDistinctFieldEnum>;
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
};


export type GroupUsersArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<UserOrderByInput>;
  cursor?: Maybe<UserWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<UserDistinctFieldEnum>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  posts: Array<Post>;
  group?: Maybe<Group>;
  groupId?: Maybe<Scalars['Int']>;
  comments: Array<Comment>;
};


export type UserPostsArgs = {
  where?: Maybe<PostWhereInput>;
  orderBy?: Maybe<PostOrderByInput>;
  cursor?: Maybe<PostWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<PostDistinctFieldEnum>;
};


export type UserCommentsArgs = {
  where?: Maybe<CommentWhereInput>;
  orderBy?: Maybe<CommentOrderByInput>;
  cursor?: Maybe<CommentWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  distinct?: Maybe<CommentDistinctFieldEnum>;
};

export type FindOneUserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOneUserQueryQuery = (
  { __typename?: 'Query' }
  & { findOneUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name'>
  )> }
);

export const FindOneUserQueryDocument = gql`
    query FindOneUserQuery {
  findOneUser(where: {id: 1}) {
    id
    email
    name
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindOneUserQueryGQL extends Apollo.Query<FindOneUserQueryQuery, FindOneUserQueryQueryVariables> {
    document = FindOneUserQueryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }