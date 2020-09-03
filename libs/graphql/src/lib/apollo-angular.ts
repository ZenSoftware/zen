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

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

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

export type GroupOrderByInput = {
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type GroupWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
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

export type UserUpdateInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  posts?: Maybe<PostUpdateManyWithoutAuthorInput>;
  group?: Maybe<GroupUpdateOneWithoutUsersInput>;
  comments?: Maybe<CommentUpdateManyWithoutAuthorInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
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
  published?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  author?: Maybe<UserUpdateOneWithoutPostsInput>;
  comments?: Maybe<CommentUpdateManyWithoutPostInput>;
};

export type PostUpdateManyMutationInput = {
  published?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentCreateInput = {
  contain: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  post: PostCreateOneWithoutCommentsInput;
  author?: Maybe<UserCreateOneWithoutCommentsInput>;
};

export type CommentUpdateInput = {
  contain?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  post?: Maybe<PostUpdateOneRequiredWithoutCommentsInput>;
  author?: Maybe<UserUpdateOneWithoutCommentsInput>;
};

export type CommentUpdateManyMutationInput = {
  contain?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupCreateInput = {
  name: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserCreateManyWithoutGroupInput>;
};

export type GroupUpdateInput = {
  name?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  users?: Maybe<UserUpdateManyWithoutGroupInput>;
};

export type GroupUpdateManyMutationInput = {
  name?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
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

export type PostListRelationFilter = {
  every?: Maybe<PostWhereInput>;
  some?: Maybe<PostWhereInput>;
  none?: Maybe<PostWhereInput>;
};

export type GroupRelationFilter = {
  is?: Maybe<GroupWhereInput>;
  isNot?: Maybe<GroupWhereInput>;
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

export type CommentListRelationFilter = {
  every?: Maybe<CommentWhereInput>;
  some?: Maybe<CommentWhereInput>;
  none?: Maybe<CommentWhereInput>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};

export type UserRelationFilter = {
  is?: Maybe<UserWhereInput>;
  isNot?: Maybe<UserWhereInput>;
};

export type PostRelationFilter = {
  is?: Maybe<PostWhereInput>;
  isNot?: Maybe<PostWhereInput>;
};

export type UserListRelationFilter = {
  every?: Maybe<UserWhereInput>;
  some?: Maybe<UserWhereInput>;
  none?: Maybe<UserWhereInput>;
};

export type PostCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<PostCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<PostWhereUniqueInput>>;
};

export type GroupCreateOneWithoutUsersInput = {
  create?: Maybe<GroupCreateWithoutUsersInput>;
  connect?: Maybe<GroupWhereUniqueInput>;
};

export type CommentCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<CommentCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
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

export type GroupUpdateOneWithoutUsersInput = {
  create?: Maybe<GroupCreateWithoutUsersInput>;
  connect?: Maybe<GroupWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<GroupUpdateWithoutUsersDataInput>;
  upsert?: Maybe<GroupUpsertWithoutUsersInput>;
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

export type UserCreateOneWithoutPostsInput = {
  create?: Maybe<UserCreateWithoutPostsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type CommentCreateManyWithoutPostInput = {
  create?: Maybe<Array<CommentCreateWithoutPostInput>>;
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Boolean']>;
};

export type UserUpdateOneWithoutPostsInput = {
  create?: Maybe<UserCreateWithoutPostsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutPostsDataInput>;
  upsert?: Maybe<UserUpsertWithoutPostsInput>;
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

export type PostCreateOneWithoutCommentsInput = {
  create?: Maybe<PostCreateWithoutCommentsInput>;
  connect?: Maybe<PostWhereUniqueInput>;
};

export type UserCreateOneWithoutCommentsInput = {
  create?: Maybe<UserCreateWithoutCommentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type PostUpdateOneRequiredWithoutCommentsInput = {
  create?: Maybe<PostCreateWithoutCommentsInput>;
  connect?: Maybe<PostWhereUniqueInput>;
  update?: Maybe<PostUpdateWithoutCommentsDataInput>;
  upsert?: Maybe<PostUpsertWithoutCommentsInput>;
};

export type UserUpdateOneWithoutCommentsInput = {
  create?: Maybe<UserCreateWithoutCommentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutCommentsDataInput>;
  upsert?: Maybe<UserUpsertWithoutCommentsInput>;
};

export type UserCreateManyWithoutGroupInput = {
  create?: Maybe<Array<UserCreateWithoutGroupInput>>;
  connect?: Maybe<Array<UserWhereUniqueInput>>;
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

export type NestedBoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type PostCreateWithoutAuthorInput = {
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  comments?: Maybe<CommentCreateManyWithoutPostInput>;
};

export type GroupCreateWithoutUsersInput = {
  name: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentCreateWithoutAuthorInput = {
  contain: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  post: PostCreateOneWithoutCommentsInput;
};

export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput;
  data: PostUpdateWithoutAuthorDataInput;
};

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput;
  data: PostUpdateManyDataInput;
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

export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput;
  update: PostUpdateWithoutAuthorDataInput;
  create: PostCreateWithoutAuthorInput;
};

export type GroupUpdateWithoutUsersDataInput = {
  name?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpsertWithoutUsersInput = {
  update: GroupUpdateWithoutUsersDataInput;
  create: GroupCreateWithoutUsersInput;
};

export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutAuthorDataInput;
};

export type CommentUpdateManyWithWhereNestedInput = {
  where: CommentScalarWhereInput;
  data: CommentUpdateManyDataInput;
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

export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutAuthorDataInput;
  create: CommentCreateWithoutAuthorInput;
};

export type UserCreateWithoutPostsInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  group?: Maybe<GroupCreateOneWithoutUsersInput>;
  comments?: Maybe<CommentCreateManyWithoutAuthorInput>;
};

export type CommentCreateWithoutPostInput = {
  contain: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserCreateOneWithoutCommentsInput>;
};

export type UserUpdateWithoutPostsDataInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  group?: Maybe<GroupUpdateOneWithoutUsersInput>;
  comments?: Maybe<CommentUpdateManyWithoutAuthorInput>;
};

export type UserUpsertWithoutPostsInput = {
  update: UserUpdateWithoutPostsDataInput;
  create: UserCreateWithoutPostsInput;
};

export type CommentUpdateWithWhereUniqueWithoutPostInput = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateWithoutPostDataInput;
};

export type CommentUpsertWithWhereUniqueWithoutPostInput = {
  where: CommentWhereUniqueInput;
  update: CommentUpdateWithoutPostDataInput;
  create: CommentCreateWithoutPostInput;
};

export type PostCreateWithoutCommentsInput = {
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserCreateOneWithoutPostsInput>;
};

export type UserCreateWithoutCommentsInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: Maybe<PostCreateManyWithoutAuthorInput>;
  group?: Maybe<GroupCreateOneWithoutUsersInput>;
};

export type PostUpdateWithoutCommentsDataInput = {
  published?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  author?: Maybe<UserUpdateOneWithoutPostsInput>;
};

export type PostUpsertWithoutCommentsInput = {
  update: PostUpdateWithoutCommentsDataInput;
  create: PostCreateWithoutCommentsInput;
};

export type UserUpdateWithoutCommentsDataInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  posts?: Maybe<PostUpdateManyWithoutAuthorInput>;
  group?: Maybe<GroupUpdateOneWithoutUsersInput>;
};

export type UserUpsertWithoutCommentsInput = {
  update: UserUpdateWithoutCommentsDataInput;
  create: UserCreateWithoutCommentsInput;
};

export type UserCreateWithoutGroupInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: Maybe<PostCreateManyWithoutAuthorInput>;
  comments?: Maybe<CommentCreateManyWithoutAuthorInput>;
};

export type UserUpdateWithWhereUniqueWithoutGroupInput = {
  where: UserWhereUniqueInput;
  data: UserUpdateWithoutGroupDataInput;
};

export type UserUpdateManyWithWhereNestedInput = {
  where: UserScalarWhereInput;
  data: UserUpdateManyDataInput;
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

export type UserUpsertWithWhereUniqueWithoutGroupInput = {
  where: UserWhereUniqueInput;
  update: UserUpdateWithoutGroupDataInput;
  create: UserCreateWithoutGroupInput;
};

export type PostUpdateWithoutAuthorDataInput = {
  published?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  comments?: Maybe<CommentUpdateManyWithoutPostInput>;
};

export type PostUpdateManyDataInput = {
  published?: Maybe<BoolFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpdateWithoutAuthorDataInput = {
  contain?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  post?: Maybe<PostUpdateOneRequiredWithoutCommentsInput>;
};

export type CommentUpdateManyDataInput = {
  contain?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpdateWithoutPostDataInput = {
  contain?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  author?: Maybe<UserUpdateOneWithoutCommentsInput>;
};

export type UserUpdateWithoutGroupDataInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  posts?: Maybe<PostUpdateManyWithoutAuthorInput>;
  comments?: Maybe<CommentUpdateManyWithoutAuthorInput>;
};

export type UserUpdateManyDataInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  count: Scalars['Int'];
  avg?: Maybe<UserAvgAggregateOutputType>;
  sum?: Maybe<UserSumAggregateOutputType>;
  min?: Maybe<UserMinAggregateOutputType>;
  max?: Maybe<UserMaxAggregateOutputType>;
};

export type AggregatePost = {
  __typename?: 'AggregatePost';
  count: Scalars['Int'];
  avg?: Maybe<PostAvgAggregateOutputType>;
  sum?: Maybe<PostSumAggregateOutputType>;
  min?: Maybe<PostMinAggregateOutputType>;
  max?: Maybe<PostMaxAggregateOutputType>;
};

export type AggregateComment = {
  __typename?: 'AggregateComment';
  count: Scalars['Int'];
  avg?: Maybe<CommentAvgAggregateOutputType>;
  sum?: Maybe<CommentSumAggregateOutputType>;
  min?: Maybe<CommentMinAggregateOutputType>;
  max?: Maybe<CommentMaxAggregateOutputType>;
};

export type AggregateGroup = {
  __typename?: 'AggregateGroup';
  count: Scalars['Int'];
  avg?: Maybe<GroupAvgAggregateOutputType>;
  sum?: Maybe<GroupSumAggregateOutputType>;
  min?: Maybe<GroupMinAggregateOutputType>;
  max?: Maybe<GroupMaxAggregateOutputType>;
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
  sampleUserField?: Maybe<Scalars['String']>;
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

export type Query = {
  __typename?: 'Query';
  findOneUser?: Maybe<User>;
  findManyUser?: Maybe<Array<User>>;
  findManyUserCount: Scalars['Int'];
  findOnePost?: Maybe<Post>;
  findManyPost?: Maybe<Array<Post>>;
  findManyPostCount: Scalars['Int'];
  findOneComment?: Maybe<Comment>;
  findManyComment?: Maybe<Array<Comment>>;
  findManyCommentCount: Scalars['Int'];
  findOneGroup?: Maybe<Group>;
  findManyGroup?: Maybe<Array<Group>>;
  findManyGroupCount: Scalars['Int'];
  sampleUserQuery: User;
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

export type Mutation = {
  __typename?: 'Mutation';
  createOneUser: User;
  updateOneUser: User;
  deleteOneUser?: Maybe<User>;
  upsertOneUser?: Maybe<User>;
  deleteManyUser?: Maybe<BatchPayload>;
  updateManyUser?: Maybe<BatchPayload>;
  createOnePost: Post;
  updateOnePost: Post;
  deleteOnePost?: Maybe<Post>;
  upsertOnePost?: Maybe<Post>;
  deleteManyPost?: Maybe<BatchPayload>;
  updateManyPost?: Maybe<BatchPayload>;
  createOneComment: Comment;
  updateOneComment: Comment;
  deleteOneComment?: Maybe<Comment>;
  upsertOneComment?: Maybe<Comment>;
  deleteManyComment?: Maybe<BatchPayload>;
  updateManyComment?: Maybe<BatchPayload>;
  createOneGroup: Group;
  updateOneGroup: Group;
  deleteOneGroup?: Maybe<Group>;
  upsertOneGroup?: Maybe<Group>;
  deleteManyGroup?: Maybe<BatchPayload>;
  updateManyGroup?: Maybe<BatchPayload>;
  sampleUserMutation?: Maybe<Scalars['Boolean']>;
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


export type MutationSampleUserMutationArgs = {
  args: Scalars['Int'];
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

export type CommentFieldsFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id'>
);

export type GroupFieldsFragment = (
  { __typename?: 'Group' }
  & Pick<Group, 'id'>
);

export type PostFieldsFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id'>
);

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id'>
);

export type FindOneCommentQueryVariables = Exact<{
  where: CommentWhereUniqueInput;
}>;


export type FindOneCommentQuery = (
  { __typename?: 'Query' }
  & { findOneComment?: Maybe<(
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  )> }
);

export type FindManyCommentQueryVariables = Exact<{
  where?: Maybe<CommentWhereInput>;
  orderBy?: Maybe<Array<CommentOrderByInput>>;
  cursor?: Maybe<CommentWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FindManyCommentQuery = (
  { __typename?: 'Query' }
  & { findManyComment?: Maybe<Array<(
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  )>> }
);

export type FindManyCommentCountQueryVariables = Exact<{
  where?: Maybe<CommentWhereInput>;
  orderBy?: Maybe<Array<CommentOrderByInput>>;
  cursor?: Maybe<CommentWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FindManyCommentCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'findManyCommentCount'>
);

export type CreateOneCommentMutationVariables = Exact<{
  data: CommentCreateInput;
}>;


export type CreateOneCommentMutation = (
  { __typename?: 'Mutation' }
  & { createOneComment: (
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  ) }
);

export type UpdateOneCommentMutationVariables = Exact<{
  where: CommentWhereUniqueInput;
  data: CommentUpdateInput;
}>;


export type UpdateOneCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateOneComment: (
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  ) }
);

export type DeleteOneCommentMutationVariables = Exact<{
  where: CommentWhereUniqueInput;
}>;


export type DeleteOneCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
  )> }
);

export type UpsertOneCommentMutationVariables = Exact<{
  where: CommentWhereUniqueInput;
  create: CommentCreateInput;
  update: CommentUpdateInput;
}>;


export type UpsertOneCommentMutation = (
  { __typename?: 'Mutation' }
  & { upsertOneComment?: Maybe<(
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  )> }
);

export type DeleteManyCommentMutationVariables = Exact<{
  where?: Maybe<CommentWhereInput>;
}>;


export type DeleteManyCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteManyComment?: Maybe<(
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  )> }
);

export type UpdateManyCommentMutationVariables = Exact<{
  where?: Maybe<CommentWhereInput>;
  data?: Maybe<CommentUpdateManyMutationInput>;
}>;


export type UpdateManyCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateManyComment?: Maybe<(
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  )> }
);

export type FindOneGroupQueryVariables = Exact<{
  where: GroupWhereUniqueInput;
}>;


export type FindOneGroupQuery = (
  { __typename?: 'Query' }
  & { findOneGroup?: Maybe<(
    { __typename?: 'Group' }
    & GroupFieldsFragment
  )> }
);

export type FindManyGroupQueryVariables = Exact<{
  where?: Maybe<GroupWhereInput>;
  orderBy?: Maybe<Array<GroupOrderByInput>>;
  cursor?: Maybe<GroupWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FindManyGroupQuery = (
  { __typename?: 'Query' }
  & { findManyGroup?: Maybe<Array<(
    { __typename?: 'Group' }
    & GroupFieldsFragment
  )>> }
);

export type FindManyGroupCountQueryVariables = Exact<{
  where?: Maybe<GroupWhereInput>;
  orderBy?: Maybe<Array<GroupOrderByInput>>;
  cursor?: Maybe<GroupWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FindManyGroupCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'findManyGroupCount'>
);

export type CreateOneGroupMutationVariables = Exact<{
  data: GroupCreateInput;
}>;


export type CreateOneGroupMutation = (
  { __typename?: 'Mutation' }
  & { createOneGroup: (
    { __typename?: 'Group' }
    & GroupFieldsFragment
  ) }
);

export type UpdateOneGroupMutationVariables = Exact<{
  where: GroupWhereUniqueInput;
  data: GroupUpdateInput;
}>;


export type UpdateOneGroupMutation = (
  { __typename?: 'Mutation' }
  & { updateOneGroup: (
    { __typename?: 'Group' }
    & GroupFieldsFragment
  ) }
);

export type DeleteOneGroupMutationVariables = Exact<{
  where: GroupWhereUniqueInput;
}>;


export type DeleteOneGroupMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneGroup?: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'id'>
  )> }
);

export type UpsertOneGroupMutationVariables = Exact<{
  where: GroupWhereUniqueInput;
  create: GroupCreateInput;
  update: GroupUpdateInput;
}>;


export type UpsertOneGroupMutation = (
  { __typename?: 'Mutation' }
  & { upsertOneGroup?: Maybe<(
    { __typename?: 'Group' }
    & GroupFieldsFragment
  )> }
);

export type DeleteManyGroupMutationVariables = Exact<{
  where?: Maybe<GroupWhereInput>;
}>;


export type DeleteManyGroupMutation = (
  { __typename?: 'Mutation' }
  & { deleteManyGroup?: Maybe<(
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  )> }
);

export type UpdateManyGroupMutationVariables = Exact<{
  where?: Maybe<GroupWhereInput>;
  data?: Maybe<GroupUpdateManyMutationInput>;
}>;


export type UpdateManyGroupMutation = (
  { __typename?: 'Mutation' }
  & { updateManyGroup?: Maybe<(
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  )> }
);

export type FindOnePostQueryVariables = Exact<{
  where: PostWhereUniqueInput;
}>;


export type FindOnePostQuery = (
  { __typename?: 'Query' }
  & { findOnePost?: Maybe<(
    { __typename?: 'Post' }
    & PostFieldsFragment
  )> }
);

export type FindManyPostQueryVariables = Exact<{
  where?: Maybe<PostWhereInput>;
  orderBy?: Maybe<Array<PostOrderByInput>>;
  cursor?: Maybe<PostWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FindManyPostQuery = (
  { __typename?: 'Query' }
  & { findManyPost?: Maybe<Array<(
    { __typename?: 'Post' }
    & PostFieldsFragment
  )>> }
);

export type FindManyPostCountQueryVariables = Exact<{
  where?: Maybe<PostWhereInput>;
  orderBy?: Maybe<Array<PostOrderByInput>>;
  cursor?: Maybe<PostWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FindManyPostCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'findManyPostCount'>
);

export type CreateOnePostMutationVariables = Exact<{
  data: PostCreateInput;
}>;


export type CreateOnePostMutation = (
  { __typename?: 'Mutation' }
  & { createOnePost: (
    { __typename?: 'Post' }
    & PostFieldsFragment
  ) }
);

export type UpdateOnePostMutationVariables = Exact<{
  where: PostWhereUniqueInput;
  data: PostUpdateInput;
}>;


export type UpdateOnePostMutation = (
  { __typename?: 'Mutation' }
  & { updateOnePost: (
    { __typename?: 'Post' }
    & PostFieldsFragment
  ) }
);

export type DeleteOnePostMutationVariables = Exact<{
  where: PostWhereUniqueInput;
}>;


export type DeleteOnePostMutation = (
  { __typename?: 'Mutation' }
  & { deleteOnePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  )> }
);

export type UpsertOnePostMutationVariables = Exact<{
  where: PostWhereUniqueInput;
  create: PostCreateInput;
  update: PostUpdateInput;
}>;


export type UpsertOnePostMutation = (
  { __typename?: 'Mutation' }
  & { upsertOnePost?: Maybe<(
    { __typename?: 'Post' }
    & PostFieldsFragment
  )> }
);

export type DeleteManyPostMutationVariables = Exact<{
  where?: Maybe<PostWhereInput>;
}>;


export type DeleteManyPostMutation = (
  { __typename?: 'Mutation' }
  & { deleteManyPost?: Maybe<(
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  )> }
);

export type UpdateManyPostMutationVariables = Exact<{
  where?: Maybe<PostWhereInput>;
  data?: Maybe<PostUpdateManyMutationInput>;
}>;


export type UpdateManyPostMutation = (
  { __typename?: 'Mutation' }
  & { updateManyPost?: Maybe<(
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  )> }
);

export type FindOneUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type FindOneUserQuery = (
  { __typename?: 'Query' }
  & { findOneUser?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )> }
);

export type FindManyUserQueryVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FindManyUserQuery = (
  { __typename?: 'Query' }
  & { findManyUser?: Maybe<Array<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )>> }
);

export type FindManyUserCountQueryVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  cursor?: Maybe<UserWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FindManyUserCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'findManyUserCount'>
);

export type CreateOneUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateOneUserMutation = (
  { __typename?: 'Mutation' }
  & { createOneUser: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) }
);

export type UpdateOneUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
  data: UserUpdateInput;
}>;


export type UpdateOneUserMutation = (
  { __typename?: 'Mutation' }
  & { updateOneUser: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) }
);

export type DeleteOneUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type DeleteOneUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type UpsertOneUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
}>;


export type UpsertOneUserMutation = (
  { __typename?: 'Mutation' }
  & { upsertOneUser?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )> }
);

export type DeleteManyUserMutationVariables = Exact<{
  where?: Maybe<UserWhereInput>;
}>;


export type DeleteManyUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteManyUser?: Maybe<(
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  )> }
);

export type UpdateManyUserMutationVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  data?: Maybe<UserUpdateManyMutationInput>;
}>;


export type UpdateManyUserMutation = (
  { __typename?: 'Mutation' }
  & { updateManyUser?: Maybe<(
    { __typename?: 'BatchPayload' }
    & Pick<BatchPayload, 'count'>
  )> }
);

export const CommentFieldsFragmentDoc = gql`
    fragment CommentFields on Comment {
  id
}
    `;
export const GroupFieldsFragmentDoc = gql`
    fragment GroupFields on Group {
  id
}
    `;
export const PostFieldsFragmentDoc = gql`
    fragment PostFields on Post {
  id
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
}
    `;
export const FindOneCommentDocument = gql`
    query FindOneComment($where: CommentWhereUniqueInput!) {
  findOneComment(where: $where) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindOneCommentGQL extends Apollo.Query<FindOneCommentQuery, FindOneCommentQueryVariables> {
    document = FindOneCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyCommentDocument = gql`
    query FindManyComment($where: CommentWhereInput, $orderBy: [CommentOrderByInput!], $cursor: CommentWhereUniqueInput, $skip: Int, $take: Int) {
  findManyComment(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindManyCommentGQL extends Apollo.Query<FindManyCommentQuery, FindManyCommentQueryVariables> {
    document = FindManyCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyCommentCountDocument = gql`
    query FindManyCommentCount($where: CommentWhereInput, $orderBy: [CommentOrderByInput!], $cursor: CommentWhereUniqueInput, $skip: Int, $take: Int) {
  findManyCommentCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindManyCommentCountGQL extends Apollo.Query<FindManyCommentCountQuery, FindManyCommentCountQueryVariables> {
    document = FindManyCommentCountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneCommentDocument = gql`
    mutation CreateOneComment($data: CommentCreateInput!) {
  createOneComment(data: $data) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class CreateOneCommentGQL extends Apollo.Mutation<CreateOneCommentMutation, CreateOneCommentMutationVariables> {
    document = CreateOneCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneCommentDocument = gql`
    mutation UpdateOneComment($where: CommentWhereUniqueInput!, $data: CommentUpdateInput!) {
  updateOneComment(where: $where, data: $data) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpdateOneCommentGQL extends Apollo.Mutation<UpdateOneCommentMutation, UpdateOneCommentMutationVariables> {
    document = UpdateOneCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneCommentDocument = gql`
    mutation DeleteOneComment($where: CommentWhereUniqueInput!) {
  deleteOneComment(where: $where) {
    id
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class DeleteOneCommentGQL extends Apollo.Mutation<DeleteOneCommentMutation, DeleteOneCommentMutationVariables> {
    document = DeleteOneCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpsertOneCommentDocument = gql`
    mutation UpsertOneComment($where: CommentWhereUniqueInput!, $create: CommentCreateInput!, $update: CommentUpdateInput!) {
  upsertOneComment(where: $where, create: $create, update: $update) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpsertOneCommentGQL extends Apollo.Mutation<UpsertOneCommentMutation, UpsertOneCommentMutationVariables> {
    document = UpsertOneCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteManyCommentDocument = gql`
    mutation DeleteManyComment($where: CommentWhereInput) {
  deleteManyComment(where: $where) {
    count
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class DeleteManyCommentGQL extends Apollo.Mutation<DeleteManyCommentMutation, DeleteManyCommentMutationVariables> {
    document = DeleteManyCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateManyCommentDocument = gql`
    mutation UpdateManyComment($where: CommentWhereInput, $data: CommentUpdateManyMutationInput) {
  updateManyComment(where: $where, data: $data) {
    count
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpdateManyCommentGQL extends Apollo.Mutation<UpdateManyCommentMutation, UpdateManyCommentMutationVariables> {
    document = UpdateManyCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindOneGroupDocument = gql`
    query FindOneGroup($where: GroupWhereUniqueInput!) {
  findOneGroup(where: $where) {
    ...GroupFields
  }
}
    ${GroupFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindOneGroupGQL extends Apollo.Query<FindOneGroupQuery, FindOneGroupQueryVariables> {
    document = FindOneGroupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyGroupDocument = gql`
    query FindManyGroup($where: GroupWhereInput, $orderBy: [GroupOrderByInput!], $cursor: GroupWhereUniqueInput, $skip: Int, $take: Int) {
  findManyGroup(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
    ...GroupFields
  }
}
    ${GroupFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindManyGroupGQL extends Apollo.Query<FindManyGroupQuery, FindManyGroupQueryVariables> {
    document = FindManyGroupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyGroupCountDocument = gql`
    query FindManyGroupCount($where: GroupWhereInput, $orderBy: [GroupOrderByInput!], $cursor: GroupWhereUniqueInput, $skip: Int, $take: Int) {
  findManyGroupCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindManyGroupCountGQL extends Apollo.Query<FindManyGroupCountQuery, FindManyGroupCountQueryVariables> {
    document = FindManyGroupCountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneGroupDocument = gql`
    mutation CreateOneGroup($data: GroupCreateInput!) {
  createOneGroup(data: $data) {
    ...GroupFields
  }
}
    ${GroupFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class CreateOneGroupGQL extends Apollo.Mutation<CreateOneGroupMutation, CreateOneGroupMutationVariables> {
    document = CreateOneGroupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneGroupDocument = gql`
    mutation UpdateOneGroup($where: GroupWhereUniqueInput!, $data: GroupUpdateInput!) {
  updateOneGroup(where: $where, data: $data) {
    ...GroupFields
  }
}
    ${GroupFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpdateOneGroupGQL extends Apollo.Mutation<UpdateOneGroupMutation, UpdateOneGroupMutationVariables> {
    document = UpdateOneGroupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneGroupDocument = gql`
    mutation DeleteOneGroup($where: GroupWhereUniqueInput!) {
  deleteOneGroup(where: $where) {
    id
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class DeleteOneGroupGQL extends Apollo.Mutation<DeleteOneGroupMutation, DeleteOneGroupMutationVariables> {
    document = DeleteOneGroupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpsertOneGroupDocument = gql`
    mutation UpsertOneGroup($where: GroupWhereUniqueInput!, $create: GroupCreateInput!, $update: GroupUpdateInput!) {
  upsertOneGroup(where: $where, create: $create, update: $update) {
    ...GroupFields
  }
}
    ${GroupFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpsertOneGroupGQL extends Apollo.Mutation<UpsertOneGroupMutation, UpsertOneGroupMutationVariables> {
    document = UpsertOneGroupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteManyGroupDocument = gql`
    mutation DeleteManyGroup($where: GroupWhereInput) {
  deleteManyGroup(where: $where) {
    count
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class DeleteManyGroupGQL extends Apollo.Mutation<DeleteManyGroupMutation, DeleteManyGroupMutationVariables> {
    document = DeleteManyGroupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateManyGroupDocument = gql`
    mutation UpdateManyGroup($where: GroupWhereInput, $data: GroupUpdateManyMutationInput) {
  updateManyGroup(where: $where, data: $data) {
    count
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpdateManyGroupGQL extends Apollo.Mutation<UpdateManyGroupMutation, UpdateManyGroupMutationVariables> {
    document = UpdateManyGroupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindOnePostDocument = gql`
    query FindOnePost($where: PostWhereUniqueInput!) {
  findOnePost(where: $where) {
    ...PostFields
  }
}
    ${PostFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindOnePostGQL extends Apollo.Query<FindOnePostQuery, FindOnePostQueryVariables> {
    document = FindOnePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyPostDocument = gql`
    query FindManyPost($where: PostWhereInput, $orderBy: [PostOrderByInput!], $cursor: PostWhereUniqueInput, $skip: Int, $take: Int) {
  findManyPost(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
    ...PostFields
  }
}
    ${PostFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindManyPostGQL extends Apollo.Query<FindManyPostQuery, FindManyPostQueryVariables> {
    document = FindManyPostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyPostCountDocument = gql`
    query FindManyPostCount($where: PostWhereInput, $orderBy: [PostOrderByInput!], $cursor: PostWhereUniqueInput, $skip: Int, $take: Int) {
  findManyPostCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindManyPostCountGQL extends Apollo.Query<FindManyPostCountQuery, FindManyPostCountQueryVariables> {
    document = FindManyPostCountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOnePostDocument = gql`
    mutation CreateOnePost($data: PostCreateInput!) {
  createOnePost(data: $data) {
    ...PostFields
  }
}
    ${PostFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class CreateOnePostGQL extends Apollo.Mutation<CreateOnePostMutation, CreateOnePostMutationVariables> {
    document = CreateOnePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOnePostDocument = gql`
    mutation UpdateOnePost($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
  updateOnePost(where: $where, data: $data) {
    ...PostFields
  }
}
    ${PostFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpdateOnePostGQL extends Apollo.Mutation<UpdateOnePostMutation, UpdateOnePostMutationVariables> {
    document = UpdateOnePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOnePostDocument = gql`
    mutation DeleteOnePost($where: PostWhereUniqueInput!) {
  deleteOnePost(where: $where) {
    id
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class DeleteOnePostGQL extends Apollo.Mutation<DeleteOnePostMutation, DeleteOnePostMutationVariables> {
    document = DeleteOnePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpsertOnePostDocument = gql`
    mutation UpsertOnePost($where: PostWhereUniqueInput!, $create: PostCreateInput!, $update: PostUpdateInput!) {
  upsertOnePost(where: $where, create: $create, update: $update) {
    ...PostFields
  }
}
    ${PostFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpsertOnePostGQL extends Apollo.Mutation<UpsertOnePostMutation, UpsertOnePostMutationVariables> {
    document = UpsertOnePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteManyPostDocument = gql`
    mutation DeleteManyPost($where: PostWhereInput) {
  deleteManyPost(where: $where) {
    count
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class DeleteManyPostGQL extends Apollo.Mutation<DeleteManyPostMutation, DeleteManyPostMutationVariables> {
    document = DeleteManyPostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateManyPostDocument = gql`
    mutation UpdateManyPost($where: PostWhereInput, $data: PostUpdateManyMutationInput) {
  updateManyPost(where: $where, data: $data) {
    count
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpdateManyPostGQL extends Apollo.Mutation<UpdateManyPostMutation, UpdateManyPostMutationVariables> {
    document = UpdateManyPostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindOneUserDocument = gql`
    query FindOneUser($where: UserWhereUniqueInput!) {
  findOneUser(where: $where) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindOneUserGQL extends Apollo.Query<FindOneUserQuery, FindOneUserQueryVariables> {
    document = FindOneUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyUserDocument = gql`
    query FindManyUser($where: UserWhereInput, $orderBy: [UserOrderByInput!], $cursor: UserWhereUniqueInput, $skip: Int, $take: Int) {
  findManyUser(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindManyUserGQL extends Apollo.Query<FindManyUserQuery, FindManyUserQueryVariables> {
    document = FindManyUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindManyUserCountDocument = gql`
    query FindManyUserCount($where: UserWhereInput, $orderBy: [UserOrderByInput!], $cursor: UserWhereUniqueInput, $skip: Int, $take: Int) {
  findManyUserCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class FindManyUserCountGQL extends Apollo.Query<FindManyUserCountQuery, FindManyUserCountQueryVariables> {
    document = FindManyUserCountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneUserDocument = gql`
    mutation CreateOneUser($data: UserCreateInput!) {
  createOneUser(data: $data) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class CreateOneUserGQL extends Apollo.Mutation<CreateOneUserMutation, CreateOneUserMutationVariables> {
    document = CreateOneUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneUserDocument = gql`
    mutation UpdateOneUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
  updateOneUser(where: $where, data: $data) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpdateOneUserGQL extends Apollo.Mutation<UpdateOneUserMutation, UpdateOneUserMutationVariables> {
    document = UpdateOneUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneUserDocument = gql`
    mutation DeleteOneUser($where: UserWhereUniqueInput!) {
  deleteOneUser(where: $where) {
    id
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class DeleteOneUserGQL extends Apollo.Mutation<DeleteOneUserMutation, DeleteOneUserMutationVariables> {
    document = DeleteOneUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpsertOneUserDocument = gql`
    mutation UpsertOneUser($where: UserWhereUniqueInput!, $create: UserCreateInput!, $update: UserUpdateInput!) {
  upsertOneUser(where: $where, create: $create, update: $update) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpsertOneUserGQL extends Apollo.Mutation<UpsertOneUserMutation, UpsertOneUserMutationVariables> {
    document = UpsertOneUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteManyUserDocument = gql`
    mutation DeleteManyUser($where: UserWhereInput) {
  deleteManyUser(where: $where) {
    count
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class DeleteManyUserGQL extends Apollo.Mutation<DeleteManyUserMutation, DeleteManyUserMutationVariables> {
    document = DeleteManyUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateManyUserDocument = gql`
    mutation UpdateManyUser($where: UserWhereInput, $data: UserUpdateManyMutationInput) {
  updateManyUser(where: $where, data: $data) {
    count
  }
}
    `;

  @Injectable({
    providedIn: GraphQLModule
  })
  export class UpdateManyUserGQL extends Apollo.Mutation<UpdateManyUserMutation, UpdateManyUserMutationVariables> {
    document = UpdateManyUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }