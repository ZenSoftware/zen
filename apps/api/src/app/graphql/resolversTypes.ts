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
  Review?: Review;
  Product?: Product;
  Query?: Query;
  Mutation?: Mutation;
  AggregateUser?: AggregateUser;
  UserGroupByOutputType?: UserGroupByOutputType;
  AggregateReview?: AggregateReview;
  ReviewGroupByOutputType?: ReviewGroupByOutputType;
  AggregateProduct?: AggregateProduct;
  ProductGroupByOutputType?: ProductGroupByOutputType;
  AffectedRowsOutput?: AffectedRowsOutput;
  UserCountAggregateOutputType?: UserCountAggregateOutputType;
  UserAvgAggregateOutputType?: UserAvgAggregateOutputType;
  UserSumAggregateOutputType?: UserSumAggregateOutputType;
  UserMinAggregateOutputType?: UserMinAggregateOutputType;
  UserMaxAggregateOutputType?: UserMaxAggregateOutputType;
  ReviewCountAggregateOutputType?: ReviewCountAggregateOutputType;
  ReviewAvgAggregateOutputType?: ReviewAvgAggregateOutputType;
  ReviewSumAggregateOutputType?: ReviewSumAggregateOutputType;
  ReviewMinAggregateOutputType?: ReviewMinAggregateOutputType;
  ReviewMaxAggregateOutputType?: ReviewMaxAggregateOutputType;
  ProductCountOutputType?: ProductCountOutputType;
  ProductCountAggregateOutputType?: ProductCountAggregateOutputType;
  ProductAvgAggregateOutputType?: ProductAvgAggregateOutputType;
  ProductSumAggregateOutputType?: ProductSumAggregateOutputType;
  ProductMinAggregateOutputType?: ProductMinAggregateOutputType;
  ProductMaxAggregateOutputType?: ProductMaxAggregateOutputType;
}

export interface User {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.User, {}, number>;
  createdAt?: Resolver<Client.User, {}, Date>;
  username?: Resolver<Client.User, {}, string | null>;
  password?: Resolver<Client.User, {}, string | null>;
  email?: Resolver<Client.User, {}, string>;
  roles?: Resolver<Client.User, {}, string[] | null>;
  googleId?: Resolver<Client.User, {}, string | null>;
  googleProfile?: Resolver<Client.User, {}, any | null>;

  __resolveReference?: any;
}

export interface Review {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Review, {}, number>;
  product?: Resolver<Client.Review, {}, Client.Product>;
  product_id?: Resolver<Client.Review, {}, number>;
  score?: Resolver<Client.Review, {}, number>;

  __resolveReference?: any;
}

export interface Product {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Product, {}, number>;
  review?: Resolver<Client.Product, Product_ProductReviewArgs, Client.Review[] | null>;
  _count?: Resolver<Client.Product, {}, Client.Prisma.ProductCountOutputType>;

  __resolveReference?: any;
}

export interface Query {
  [key: string]: Resolver<any, any, any>;
  Product_findFirstUser?: Resolver<{}, Product_FindFirstUserArgs, Client.User | null>;
  Product_findManyUser?: Resolver<{}, Product_FindManyUserArgs, Client.User[]>;
  Product_findManyUserCount?: Resolver<{}, Product_FindManyUserArgs, number>;
  Product_aggregateUser?: Resolver<
    {},
    Product_AggregateUserArgs,
    Client.Prisma.GetUserAggregateType<Product_AggregateUserArgs>
  >;
  Product_groupByUser?: Resolver<
    {},
    Product_GroupByUserArgs,
    Client.Prisma.UserGroupByOutputType[]
  >;
  Product_findUniqueUser?: Resolver<{}, Product_FindUniqueUserArgs, Client.User | null>;
  Product_findFirstReview?: Resolver<{}, Product_FindFirstReviewArgs, Client.Review | null>;
  Product_findManyReview?: Resolver<{}, Product_FindManyReviewArgs, Client.Review[]>;
  Product_findManyReviewCount?: Resolver<{}, Product_FindManyReviewArgs, number>;
  Product_aggregateReview?: Resolver<
    {},
    Product_AggregateReviewArgs,
    Client.Prisma.GetReviewAggregateType<Product_AggregateReviewArgs>
  >;
  Product_groupByReview?: Resolver<
    {},
    Product_GroupByReviewArgs,
    Client.Prisma.ReviewGroupByOutputType[]
  >;
  Product_findUniqueReview?: Resolver<{}, Product_FindUniqueReviewArgs, Client.Review | null>;
  Product_findFirstProduct?: Resolver<{}, Product_FindFirstProductArgs, Client.Product | null>;
  Product_findManyProduct?: Resolver<{}, Product_FindManyProductArgs, Client.Product[]>;
  Product_findManyProductCount?: Resolver<{}, Product_FindManyProductArgs, number>;
  Product_aggregateProduct?: Resolver<
    {},
    Product_AggregateProductArgs,
    Client.Prisma.GetProductAggregateType<Product_AggregateProductArgs>
  >;
  Product_groupByProduct?: Resolver<
    {},
    Product_GroupByProductArgs,
    Client.Prisma.ProductGroupByOutputType[]
  >;
  Product_findUniqueProduct?: Resolver<{}, Product_FindUniqueProductArgs, Client.Product | null>;
}

export interface Mutation {
  [key: string]: Resolver<any, any, any>;
  Product_createOneUser?: Resolver<{}, Product_CreateOneUserArgs, Client.User>;
  Product_upsertOneUser?: Resolver<{}, Product_UpsertOneUserArgs, Client.User>;
  Product_createManyUser?: Resolver<{}, Product_CreateManyUserArgs, Client.Prisma.BatchPayload>;
  Product_deleteOneUser?: Resolver<{}, Product_DeleteOneUserArgs, Client.User | null>;
  Product_updateOneUser?: Resolver<{}, Product_UpdateOneUserArgs, Client.User | null>;
  Product_updateManyUser?: Resolver<{}, Product_UpdateManyUserArgs, Client.Prisma.BatchPayload>;
  Product_deleteManyUser?: Resolver<{}, Product_DeleteManyUserArgs, Client.Prisma.BatchPayload>;
  Product_createOneReview?: Resolver<{}, Product_CreateOneReviewArgs, Client.Review>;
  Product_upsertOneReview?: Resolver<{}, Product_UpsertOneReviewArgs, Client.Review>;
  Product_createManyReview?: Resolver<{}, Product_CreateManyReviewArgs, Client.Prisma.BatchPayload>;
  Product_deleteOneReview?: Resolver<{}, Product_DeleteOneReviewArgs, Client.Review | null>;
  Product_updateOneReview?: Resolver<{}, Product_UpdateOneReviewArgs, Client.Review | null>;
  Product_updateManyReview?: Resolver<{}, Product_UpdateManyReviewArgs, Client.Prisma.BatchPayload>;
  Product_deleteManyReview?: Resolver<{}, Product_DeleteManyReviewArgs, Client.Prisma.BatchPayload>;
  Product_createOneProduct?: Resolver<{}, Product_CreateOneProductArgs, Client.Product>;
  Product_upsertOneProduct?: Resolver<{}, Product_UpsertOneProductArgs, Client.Product>;
  Product_createManyProduct?: Resolver<
    {},
    Product_CreateManyProductArgs,
    Client.Prisma.BatchPayload
  >;
  Product_deleteOneProduct?: Resolver<{}, Product_DeleteOneProductArgs, Client.Product | null>;
  Product_updateOneProduct?: Resolver<{}, Product_UpdateOneProductArgs, Client.Product | null>;
  //Product_updateManyProduct is not generated because model has only unique fields or relations.
  Product_deleteManyProduct?: Resolver<
    {},
    Product_DeleteManyProductArgs,
    Client.Prisma.BatchPayload
  >;
  Product_executeRaw?: Resolver<{}, Product_ExecuteRawArgs, any>;
  Product_queryRaw?: Resolver<{}, Product_QueryRawArgs, any>;
}

export interface AggregateUser {
  [key: string]: Resolver<any, any, any>;
  _count?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserCountAggregateOutputType | null
  >;
  _avg?: Resolver<Client.Prisma.AggregateUser, {}, Client.Prisma.UserAvgAggregateOutputType | null>;
  _sum?: Resolver<Client.Prisma.AggregateUser, {}, Client.Prisma.UserSumAggregateOutputType | null>;
  _min?: Resolver<Client.Prisma.AggregateUser, {}, Client.Prisma.UserMinAggregateOutputType | null>;
  _max?: Resolver<Client.Prisma.AggregateUser, {}, Client.Prisma.UserMaxAggregateOutputType | null>;
}

export interface UserGroupByOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserGroupByOutputType, {}, number>;
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
  _avg?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserAvgAggregateOutputType | null
  >;
  _sum?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserSumAggregateOutputType | null
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
}

export interface AggregateReview {
  [key: string]: Resolver<any, any, any>;
  _count?: Resolver<
    Client.Prisma.AggregateReview,
    {},
    Client.Prisma.ReviewCountAggregateOutputType | null
  >;
  _avg?: Resolver<
    Client.Prisma.AggregateReview,
    {},
    Client.Prisma.ReviewAvgAggregateOutputType | null
  >;
  _sum?: Resolver<
    Client.Prisma.AggregateReview,
    {},
    Client.Prisma.ReviewSumAggregateOutputType | null
  >;
  _min?: Resolver<
    Client.Prisma.AggregateReview,
    {},
    Client.Prisma.ReviewMinAggregateOutputType | null
  >;
  _max?: Resolver<
    Client.Prisma.AggregateReview,
    {},
    Client.Prisma.ReviewMaxAggregateOutputType | null
  >;
}

export interface ReviewGroupByOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ReviewGroupByOutputType, {}, number>;
  product_id?: Resolver<Client.Prisma.ReviewGroupByOutputType, {}, number>;
  score?: Resolver<Client.Prisma.ReviewGroupByOutputType, {}, number>;
  _count?: Resolver<
    Client.Prisma.ReviewGroupByOutputType,
    {},
    Client.Prisma.ReviewCountAggregateOutputType | null
  >;
  _avg?: Resolver<
    Client.Prisma.ReviewGroupByOutputType,
    {},
    Client.Prisma.ReviewAvgAggregateOutputType | null
  >;
  _sum?: Resolver<
    Client.Prisma.ReviewGroupByOutputType,
    {},
    Client.Prisma.ReviewSumAggregateOutputType | null
  >;
  _min?: Resolver<
    Client.Prisma.ReviewGroupByOutputType,
    {},
    Client.Prisma.ReviewMinAggregateOutputType | null
  >;
  _max?: Resolver<
    Client.Prisma.ReviewGroupByOutputType,
    {},
    Client.Prisma.ReviewMaxAggregateOutputType | null
  >;
}

export interface AggregateProduct {
  [key: string]: Resolver<any, any, any>;
  _count?: Resolver<
    Client.Prisma.AggregateProduct,
    {},
    Client.Prisma.ProductCountAggregateOutputType | null
  >;
  _avg?: Resolver<
    Client.Prisma.AggregateProduct,
    {},
    Client.Prisma.ProductAvgAggregateOutputType | null
  >;
  _sum?: Resolver<
    Client.Prisma.AggregateProduct,
    {},
    Client.Prisma.ProductSumAggregateOutputType | null
  >;
  _min?: Resolver<
    Client.Prisma.AggregateProduct,
    {},
    Client.Prisma.ProductMinAggregateOutputType | null
  >;
  _max?: Resolver<
    Client.Prisma.AggregateProduct,
    {},
    Client.Prisma.ProductMaxAggregateOutputType | null
  >;
}

export interface ProductGroupByOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ProductGroupByOutputType, {}, number>;
  _count?: Resolver<
    Client.Prisma.ProductGroupByOutputType,
    {},
    Client.Prisma.ProductCountAggregateOutputType | null
  >;
  _avg?: Resolver<
    Client.Prisma.ProductGroupByOutputType,
    {},
    Client.Prisma.ProductAvgAggregateOutputType | null
  >;
  _sum?: Resolver<
    Client.Prisma.ProductGroupByOutputType,
    {},
    Client.Prisma.ProductSumAggregateOutputType | null
  >;
  _min?: Resolver<
    Client.Prisma.ProductGroupByOutputType,
    {},
    Client.Prisma.ProductMinAggregateOutputType | null
  >;
  _max?: Resolver<
    Client.Prisma.ProductGroupByOutputType,
    {},
    Client.Prisma.ProductMaxAggregateOutputType | null
  >;
}

export interface AffectedRowsOutput {
  [key: string]: Resolver<any, any, any>;
  count?: Resolver<Client.Prisma.BatchPayload, {}, number>;
}

export interface UserCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  createdAt?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  username?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  password?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  email?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  roles?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  googleId?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  googleProfile?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
  _all?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>;
}

export interface UserAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserAvgAggregateOutputType, {}, number | null>;
}

export interface UserSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserSumAggregateOutputType, {}, number | null>;
}

export interface UserMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, number | null>;
  createdAt?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, Date | null>;
  username?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
  password?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
  email?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
  googleId?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>;
}

export interface UserMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, number | null>;
  createdAt?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, Date | null>;
  username?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
  password?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
  email?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
  googleId?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>;
}

export interface ReviewCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ReviewCountAggregateOutputType, {}, number>;
  product_id?: Resolver<Client.Prisma.ReviewCountAggregateOutputType, {}, number>;
  score?: Resolver<Client.Prisma.ReviewCountAggregateOutputType, {}, number>;
  _all?: Resolver<Client.Prisma.ReviewCountAggregateOutputType, {}, number>;
}

export interface ReviewAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ReviewAvgAggregateOutputType, {}, number | null>;
  product_id?: Resolver<Client.Prisma.ReviewAvgAggregateOutputType, {}, number | null>;
  score?: Resolver<Client.Prisma.ReviewAvgAggregateOutputType, {}, number | null>;
}

export interface ReviewSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ReviewSumAggregateOutputType, {}, number | null>;
  product_id?: Resolver<Client.Prisma.ReviewSumAggregateOutputType, {}, number | null>;
  score?: Resolver<Client.Prisma.ReviewSumAggregateOutputType, {}, number | null>;
}

export interface ReviewMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ReviewMinAggregateOutputType, {}, number | null>;
  product_id?: Resolver<Client.Prisma.ReviewMinAggregateOutputType, {}, number | null>;
  score?: Resolver<Client.Prisma.ReviewMinAggregateOutputType, {}, number | null>;
}

export interface ReviewMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ReviewMaxAggregateOutputType, {}, number | null>;
  product_id?: Resolver<Client.Prisma.ReviewMaxAggregateOutputType, {}, number | null>;
  score?: Resolver<Client.Prisma.ReviewMaxAggregateOutputType, {}, number | null>;
}

export interface ProductCountOutputType {
  [key: string]: Resolver<any, any, any>;
  review?: Resolver<Client.Prisma.ProductCountOutputType, {}, number>;
}

export interface ProductCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ProductCountAggregateOutputType, {}, number>;
  _all?: Resolver<Client.Prisma.ProductCountAggregateOutputType, {}, number>;
}

export interface ProductAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ProductAvgAggregateOutputType, {}, number | null>;
}

export interface ProductSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ProductSumAggregateOutputType, {}, number | null>;
}

export interface ProductMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ProductMinAggregateOutputType, {}, number | null>;
}

export interface ProductMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>;
  id?: Resolver<Client.Prisma.ProductMaxAggregateOutputType, {}, number | null>;
}

export interface Product_ProductReviewArgs {
  where?: Product_ReviewWhereInput | null;
  orderBy?: Product_ReviewOrderByWithRelationInput[] | null;
  cursor?: Product_ReviewWhereUniqueInput | null;
  take?: number | null;
  skip?: number | null;
  distinct?: ReviewScalarFieldEnum[] | null;
}

export interface Product_FindFirstUserArgs {
  where?: Product_UserWhereInput | null;
  orderBy?: Product_UserOrderByWithRelationInput[] | null;
  cursor?: Product_UserWhereUniqueInput | null;
  take?: number | null;
  skip?: number | null;
  distinct?: UserScalarFieldEnum[] | null;
}

export interface Product_FindManyUserArgs {
  where?: Product_UserWhereInput;
  orderBy?: Product_UserOrderByWithRelationInput[];
  cursor?: Product_UserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: UserScalarFieldEnum[];
}

export interface Product_AggregateUserArgs {
  where?: Product_UserWhereInput;
  orderBy?: Product_UserOrderByWithRelationInput[];
  cursor?: Product_UserWhereUniqueInput;
  take?: number;
  skip?: number;
  _count?: Client.Prisma.UserCountAggregateInputType;
  _avg?: Client.Prisma.UserAvgAggregateInputType;
  _sum?: Client.Prisma.UserSumAggregateInputType;
  _min?: Client.Prisma.UserMinAggregateInputType;
  _max?: Client.Prisma.UserMaxAggregateInputType;
}

export interface Product_GroupByUserArgs {
  where?: Product_UserWhereInput;
  orderBy?: Product_UserOrderByWithAggregationInput[];
  by: UserScalarFieldEnum[];
  having?: Product_UserScalarWhereWithAggregatesInput;
  take?: number;
  skip?: number;
}

export interface Product_FindUniqueUserArgs {
  where: Product_UserWhereUniqueInput | null;
}

export interface Product_FindFirstReviewArgs {
  where?: Product_ReviewWhereInput | null;
  orderBy?: Product_ReviewOrderByWithRelationInput[] | null;
  cursor?: Product_ReviewWhereUniqueInput | null;
  take?: number | null;
  skip?: number | null;
  distinct?: ReviewScalarFieldEnum[] | null;
}

export interface Product_FindManyReviewArgs {
  where?: Product_ReviewWhereInput;
  orderBy?: Product_ReviewOrderByWithRelationInput[];
  cursor?: Product_ReviewWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: ReviewScalarFieldEnum[];
}

export interface Product_AggregateReviewArgs {
  where?: Product_ReviewWhereInput;
  orderBy?: Product_ReviewOrderByWithRelationInput[];
  cursor?: Product_ReviewWhereUniqueInput;
  take?: number;
  skip?: number;
  _count?: Client.Prisma.ReviewCountAggregateInputType;
  _avg?: Client.Prisma.ReviewAvgAggregateInputType;
  _sum?: Client.Prisma.ReviewSumAggregateInputType;
  _min?: Client.Prisma.ReviewMinAggregateInputType;
  _max?: Client.Prisma.ReviewMaxAggregateInputType;
}

export interface Product_GroupByReviewArgs {
  where?: Product_ReviewWhereInput;
  orderBy?: Product_ReviewOrderByWithAggregationInput[];
  by: ReviewScalarFieldEnum[];
  having?: Product_ReviewScalarWhereWithAggregatesInput;
  take?: number;
  skip?: number;
}

export interface Product_FindUniqueReviewArgs {
  where: Product_ReviewWhereUniqueInput | null;
}

export interface Product_FindFirstProductArgs {
  where?: Product_ProductWhereInput | null;
  orderBy?: Product_ProductOrderByWithRelationInput[] | null;
  cursor?: Product_ProductWhereUniqueInput | null;
  take?: number | null;
  skip?: number | null;
  distinct?: ProductScalarFieldEnum[] | null;
}

export interface Product_FindManyProductArgs {
  where?: Product_ProductWhereInput;
  orderBy?: Product_ProductOrderByWithRelationInput[];
  cursor?: Product_ProductWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: ProductScalarFieldEnum[];
}

export interface Product_AggregateProductArgs {
  where?: Product_ProductWhereInput;
  orderBy?: Product_ProductOrderByWithRelationInput[];
  cursor?: Product_ProductWhereUniqueInput;
  take?: number;
  skip?: number;
  _count?: Client.Prisma.ProductCountAggregateInputType;
  _avg?: Client.Prisma.ProductAvgAggregateInputType;
  _sum?: Client.Prisma.ProductSumAggregateInputType;
  _min?: Client.Prisma.ProductMinAggregateInputType;
  _max?: Client.Prisma.ProductMaxAggregateInputType;
}

export interface Product_GroupByProductArgs {
  where?: Product_ProductWhereInput;
  orderBy?: Product_ProductOrderByWithAggregationInput[];
  by: ProductScalarFieldEnum[];
  having?: Product_ProductScalarWhereWithAggregatesInput;
  take?: number;
  skip?: number;
}

export interface Product_FindUniqueProductArgs {
  where: Product_ProductWhereUniqueInput | null;
}

export interface Product_CreateOneUserArgs {
  data: Product_UserCreateInput;
}

export interface Product_UpsertOneUserArgs {
  where: Product_UserWhereUniqueInput;
  create: Product_UserCreateInput;
  update: Product_UserUpdateInput;
}

export interface Product_CreateManyUserArgs {
  data: Product_UserCreateManyInput[];
  skipDuplicates?: boolean;
}

export interface Product_DeleteOneUserArgs {
  where: Product_UserWhereUniqueInput | null;
}

export interface Product_UpdateOneUserArgs {
  data: Product_UserUpdateInput | null;
  where: Product_UserWhereUniqueInput | null;
}

export interface Product_UpdateManyUserArgs {
  data: Product_UserUpdateManyMutationInput;
  where?: Product_UserWhereInput;
}

export interface Product_DeleteManyUserArgs {
  where?: Product_UserWhereInput;
}

export interface Product_CreateOneReviewArgs {
  data: Product_ReviewCreateInput;
}

export interface Product_UpsertOneReviewArgs {
  where: Product_ReviewWhereUniqueInput;
  create: Product_ReviewCreateInput;
  update: Product_ReviewUpdateInput;
}

export interface Product_CreateManyReviewArgs {
  data: Product_ReviewCreateManyInput[];
  skipDuplicates?: boolean;
}

export interface Product_DeleteOneReviewArgs {
  where: Product_ReviewWhereUniqueInput | null;
}

export interface Product_UpdateOneReviewArgs {
  data: Product_ReviewUpdateInput | null;
  where: Product_ReviewWhereUniqueInput | null;
}

export interface Product_UpdateManyReviewArgs {
  data: Product_ReviewUpdateManyMutationInput;
  where?: Product_ReviewWhereInput;
}

export interface Product_DeleteManyReviewArgs {
  where?: Product_ReviewWhereInput;
}

export interface Product_CreateOneProductArgs {
  data: Product_ProductCreateInput;
}

export interface Product_UpsertOneProductArgs {
  where: Product_ProductWhereUniqueInput;
  create: Product_ProductCreateInput;
  update: Product_ProductUpdateInput;
}

export interface Product_CreateManyProductArgs {
  data: Product_ProductCreateManyInput[];
  skipDuplicates?: boolean;
}

export interface Product_DeleteOneProductArgs {
  where: Product_ProductWhereUniqueInput | null;
}

export interface Product_UpdateOneProductArgs {
  data: Product_ProductUpdateInput | null;
  where: Product_ProductWhereUniqueInput | null;
}

//UpdateManyProductArgs is not generated as the related model contains only unique or relation fields

export interface Product_DeleteManyProductArgs {
  where?: Product_ProductWhereInput;
}

export interface Product_ExecuteRawArgs {
  query: string;
  parameters?: any;
}

export interface Product_QueryRawArgs {
  query: string;
  parameters?: any;
}

export interface Product_UserWhereInput {
  AND?: Product_UserWhereInput[];
  OR?: Product_UserWhereInput[];
  NOT?: Product_UserWhereInput[];
  id?: IntFilter;
  createdAt?: DateTimeFilter;
  username?: StringNullableFilter | null;
  password?: StringNullableFilter | null;
  email?: StringFilter;
  roles?: StringNullableListFilter;
  googleId?: StringNullableFilter | null;
  googleProfile?: JsonNullableFilter;
}

export interface Product_UserOrderByWithRelationInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  roles?: SortOrder;
  googleId?: SortOrder;
  googleProfile?: SortOrder;
}

export interface Product_UserWhereUniqueInput {
  id?: number;
  username?: string;
  email?: string;
  googleId?: string;
}

export interface Product_UserOrderByWithAggregationInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  roles?: SortOrder;
  googleId?: SortOrder;
  googleProfile?: SortOrder;
  _count?: Product_UserCountOrderByAggregateInput;
  _avg?: Product_UserAvgOrderByAggregateInput;
  _max?: Product_UserMaxOrderByAggregateInput;
  _min?: Product_UserMinOrderByAggregateInput;
  _sum?: Product_UserSumOrderByAggregateInput;
}

export interface Product_UserScalarWhereWithAggregatesInput {
  AND?: Product_UserScalarWhereWithAggregatesInput[];
  OR?: Product_UserScalarWhereWithAggregatesInput[];
  NOT?: Product_UserScalarWhereWithAggregatesInput[];
  id?: IntWithAggregatesFilter;
  createdAt?: DateTimeWithAggregatesFilter;
  username?: StringNullableWithAggregatesFilter | null;
  password?: StringNullableWithAggregatesFilter | null;
  email?: StringWithAggregatesFilter;
  roles?: StringNullableListFilter;
  googleId?: StringNullableWithAggregatesFilter | null;
  googleProfile?: JsonNullableWithAggregatesFilter;
}

export interface Product_ReviewWhereInput {
  AND?: Product_ReviewWhereInput[];
  OR?: Product_ReviewWhereInput[];
  NOT?: Product_ReviewWhereInput[];
  id?: IntFilter;
  product?: Product_ProductWhereInput;
  product_id?: IntFilter;
  score?: IntFilter;
}

export interface Product_ReviewOrderByWithRelationInput {
  id?: SortOrder;
  product?: Product_ProductOrderByWithRelationInput;
  product_id?: SortOrder;
  score?: SortOrder;
}

export interface Product_ReviewWhereUniqueInput {
  id?: number;
  product_id?: number;
}

export interface Product_ReviewOrderByWithAggregationInput {
  id?: SortOrder;
  product_id?: SortOrder;
  score?: SortOrder;
  _count?: Product_ReviewCountOrderByAggregateInput;
  _avg?: Product_ReviewAvgOrderByAggregateInput;
  _max?: Product_ReviewMaxOrderByAggregateInput;
  _min?: Product_ReviewMinOrderByAggregateInput;
  _sum?: Product_ReviewSumOrderByAggregateInput;
}

export interface Product_ReviewScalarWhereWithAggregatesInput {
  AND?: Product_ReviewScalarWhereWithAggregatesInput[];
  OR?: Product_ReviewScalarWhereWithAggregatesInput[];
  NOT?: Product_ReviewScalarWhereWithAggregatesInput[];
  id?: IntWithAggregatesFilter;
  product_id?: IntWithAggregatesFilter;
  score?: IntWithAggregatesFilter;
}

export interface Product_ProductWhereInput {
  AND?: Product_ProductWhereInput[];
  OR?: Product_ProductWhereInput[];
  NOT?: Product_ProductWhereInput[];
  id?: IntFilter;
  review?: Product_ReviewListRelationFilter;
}

export interface Product_ProductOrderByWithRelationInput {
  id?: SortOrder;
  review?: Product_ReviewOrderByRelationAggregateInput;
}

export interface Product_ProductWhereUniqueInput {
  id?: number;
}

export interface Product_ProductOrderByWithAggregationInput {
  id?: SortOrder;
  _count?: Product_ProductCountOrderByAggregateInput;
  _avg?: Product_ProductAvgOrderByAggregateInput;
  _max?: Product_ProductMaxOrderByAggregateInput;
  _min?: Product_ProductMinOrderByAggregateInput;
  _sum?: Product_ProductSumOrderByAggregateInput;
}

export interface Product_ProductScalarWhereWithAggregatesInput {
  AND?: Product_ProductScalarWhereWithAggregatesInput[];
  OR?: Product_ProductScalarWhereWithAggregatesInput[];
  NOT?: Product_ProductScalarWhereWithAggregatesInput[];
  id?: IntWithAggregatesFilter;
}

export interface Product_UserCreateInput {
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email: string;
  roles?: Product_UserCreaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface Product_UserUncheckedCreateInput {
  id?: number;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email: string;
  roles?: Product_UserCreaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface Product_UserUpdateInput {
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: Product_UserUpdaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface Product_UserUncheckedUpdateInput {
  id?: number;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: Product_UserUpdaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface Product_UserCreateManyInput {
  id?: number;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email: string;
  roles?: Product_UserCreaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface Product_UserUpdateManyMutationInput {
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: Product_UserUpdaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface Product_UserUncheckedUpdateManyInput {
  id?: number;
  createdAt?: Date;
  username?: string | null;
  password?: string | null;
  email?: string;
  roles?: Product_UserUpdaterolesInput;
  googleId?: string | null;
  googleProfile?: NullableJsonNullValueInput;
}

export interface Product_ReviewCreateInput {
  product: Product_ProductCreateNestedOneWithoutReviewInput;
  score: number;
}

export interface Product_ReviewUncheckedCreateInput {
  id?: number;
  product_id: number;
  score: number;
}

export interface Product_ReviewUpdateInput {
  product?: Product_ProductUpdateOneRequiredWithoutReviewNestedInput;
  score?: number;
}

export interface Product_ReviewUncheckedUpdateInput {
  id?: number;
  product_id?: number;
  score?: number;
}

export interface Product_ReviewCreateManyInput {
  id?: number;
  product_id: number;
  score: number;
}

export interface Product_ReviewUpdateManyMutationInput {
  score?: number;
}

export interface Product_ReviewUncheckedUpdateManyInput {
  id?: number;
  product_id?: number;
  score?: number;
}

export interface Product_ProductCreateInput {
  review?: Product_ReviewCreateNestedManyWithoutProductInput;
}

export interface Product_ProductUncheckedCreateInput {
  id?: number;
  review?: Product_ReviewUncheckedCreateNestedManyWithoutProductInput;
}

export interface Product_ProductUpdateInput {
  review?: Product_ReviewUpdateManyWithoutProductNestedInput;
}

export interface Product_ProductUncheckedUpdateInput {
  id?: number;
  review?: Product_ReviewUncheckedUpdateManyWithoutProductNestedInput;
}

export interface Product_ProductCreateManyInput {
  id?: number;
}

export interface Product_ProductUncheckedUpdateManyInput {
  id?: number;
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

export interface Product_UserCountOrderByAggregateInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  roles?: SortOrder;
  googleId?: SortOrder;
  googleProfile?: SortOrder;
}

export interface Product_UserAvgOrderByAggregateInput {
  id?: SortOrder;
}

export interface Product_UserMaxOrderByAggregateInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  googleId?: SortOrder;
}

export interface Product_UserMinOrderByAggregateInput {
  id?: SortOrder;
  createdAt?: SortOrder;
  username?: SortOrder;
  password?: SortOrder;
  email?: SortOrder;
  googleId?: SortOrder;
}

export interface Product_UserSumOrderByAggregateInput {
  id?: SortOrder;
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
  _count?: NestedIntFilter;
  _avg?: NestedFloatFilter;
  _sum?: NestedIntFilter;
  _min?: NestedIntFilter;
  _max?: NestedIntFilter;
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

export interface Product_ProductRelationFilter {
  is?: Product_ProductWhereInput;
  isNot?: Product_ProductWhereInput;
}

export interface Product_ReviewCountOrderByAggregateInput {
  id?: SortOrder;
  product_id?: SortOrder;
  score?: SortOrder;
}

export interface Product_ReviewAvgOrderByAggregateInput {
  id?: SortOrder;
  product_id?: SortOrder;
  score?: SortOrder;
}

export interface Product_ReviewMaxOrderByAggregateInput {
  id?: SortOrder;
  product_id?: SortOrder;
  score?: SortOrder;
}

export interface Product_ReviewMinOrderByAggregateInput {
  id?: SortOrder;
  product_id?: SortOrder;
  score?: SortOrder;
}

export interface Product_ReviewSumOrderByAggregateInput {
  id?: SortOrder;
  product_id?: SortOrder;
  score?: SortOrder;
}

export interface Product_ReviewListRelationFilter {
  every?: Product_ReviewWhereInput;
  some?: Product_ReviewWhereInput;
  none?: Product_ReviewWhereInput;
}

export interface Product_ReviewOrderByRelationAggregateInput {
  _count?: SortOrder;
}

export interface Product_ProductCountOrderByAggregateInput {
  id?: SortOrder;
}

export interface Product_ProductAvgOrderByAggregateInput {
  id?: SortOrder;
}

export interface Product_ProductMaxOrderByAggregateInput {
  id?: SortOrder;
}

export interface Product_ProductMinOrderByAggregateInput {
  id?: SortOrder;
}

export interface Product_ProductSumOrderByAggregateInput {
  id?: SortOrder;
}

export interface Product_UserCreaterolesInput {
  set: string[];
}

export interface DateTimeFieldUpdateOperationsInput {
  set?: Date;
}

export interface NullableStringFieldUpdateOperationsInput {
  set?: string | null;
}

export interface StringFieldUpdateOperationsInput {
  set?: string;
}

export interface Product_UserUpdaterolesInput {
  set?: string[];
  push?: string;
}

export interface IntFieldUpdateOperationsInput {
  set?: number;
  increment?: number;
  decrement?: number;
  multiply?: number;
  divide?: number;
}

export interface Product_ProductCreateNestedOneWithoutReviewInput {
  create?: Product_ProductUncheckedCreateWithoutReviewInput;
  connectOrCreate?: Product_ProductCreateOrConnectWithoutReviewInput;
  connect?: Product_ProductWhereUniqueInput;
}

export interface Product_ProductUpdateOneRequiredWithoutReviewNestedInput {
  create?: Product_ProductUncheckedCreateWithoutReviewInput;
  connectOrCreate?: Product_ProductCreateOrConnectWithoutReviewInput;
  upsert?: Product_ProductUpsertWithoutReviewInput;
  connect?: Product_ProductWhereUniqueInput;
  update?: Product_ProductUncheckedUpdateWithoutReviewInput;
}

export interface Product_ReviewCreateNestedManyWithoutProductInput {
  create?: Product_ReviewCreateWithoutProductInput[];
  connectOrCreate?: Product_ReviewCreateOrConnectWithoutProductInput[];
  createMany?: Product_ReviewCreateManyProductInputEnvelope;
  connect?: Product_ReviewWhereUniqueInput[];
}

export interface Product_ReviewUncheckedCreateNestedManyWithoutProductInput {
  create?: Product_ReviewCreateWithoutProductInput[];
  connectOrCreate?: Product_ReviewCreateOrConnectWithoutProductInput[];
  createMany?: Product_ReviewCreateManyProductInputEnvelope;
  connect?: Product_ReviewWhereUniqueInput[];
}

export interface Product_ReviewUpdateManyWithoutProductNestedInput {
  create?: Product_ReviewCreateWithoutProductInput[];
  connectOrCreate?: Product_ReviewCreateOrConnectWithoutProductInput[];
  upsert?: Product_ReviewUpsertWithWhereUniqueWithoutProductInput[];
  createMany?: Product_ReviewCreateManyProductInputEnvelope;
  set?: Product_ReviewWhereUniqueInput[];
  disconnect?: Product_ReviewWhereUniqueInput[];
  delete?: Product_ReviewWhereUniqueInput[];
  connect?: Product_ReviewWhereUniqueInput[];
  update?: Product_ReviewUpdateWithWhereUniqueWithoutProductInput[];
  updateMany?: Product_ReviewUpdateManyWithWhereWithoutProductInput[];
  deleteMany?: Product_ReviewScalarWhereInput[];
}

export interface Product_ReviewUncheckedUpdateManyWithoutProductNestedInput {
  create?: Product_ReviewCreateWithoutProductInput[];
  connectOrCreate?: Product_ReviewCreateOrConnectWithoutProductInput[];
  upsert?: Product_ReviewUpsertWithWhereUniqueWithoutProductInput[];
  createMany?: Product_ReviewCreateManyProductInputEnvelope;
  set?: Product_ReviewWhereUniqueInput[];
  disconnect?: Product_ReviewWhereUniqueInput[];
  delete?: Product_ReviewWhereUniqueInput[];
  connect?: Product_ReviewWhereUniqueInput[];
  update?: Product_ReviewUpdateWithWhereUniqueWithoutProductInput[];
  updateMany?: Product_ReviewUpdateManyWithWhereWithoutProductInput[];
  deleteMany?: Product_ReviewScalarWhereInput[];
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
  _count?: NestedIntFilter;
  _avg?: NestedFloatFilter;
  _sum?: NestedIntFilter;
  _min?: NestedIntFilter;
  _max?: NestedIntFilter;
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

export interface Product_ProductUncheckedCreateWithoutReviewInput {
  id?: number;
}

export interface Product_ProductCreateOrConnectWithoutReviewInput {
  where: Product_ProductWhereUniqueInput;
  create: Product_ProductUncheckedCreateWithoutReviewInput;
}

export interface Product_ProductUpsertWithoutReviewInput {
  update: Product_ProductUncheckedUpdateWithoutReviewInput;
  create: Product_ProductUncheckedCreateWithoutReviewInput;
}

export interface Product_ProductUncheckedUpdateWithoutReviewInput {
  id?: number;
}

export interface Product_ReviewCreateWithoutProductInput {
  score: number;
}

export interface Product_ReviewUncheckedCreateWithoutProductInput {
  id?: number;
  score: number;
}

export interface Product_ReviewCreateOrConnectWithoutProductInput {
  where: Product_ReviewWhereUniqueInput;
  create: Product_ReviewUncheckedCreateWithoutProductInput;
}

export interface Product_ReviewCreateManyProductInputEnvelope {
  data: Product_ReviewCreateManyProductInput[];
  skipDuplicates?: boolean;
}

export interface Product_ReviewUpsertWithWhereUniqueWithoutProductInput {
  where: Product_ReviewWhereUniqueInput;
  update: Product_ReviewUncheckedUpdateWithoutProductInput;
  create: Product_ReviewUncheckedCreateWithoutProductInput;
}

export interface Product_ReviewUpdateWithWhereUniqueWithoutProductInput {
  where: Product_ReviewWhereUniqueInput;
  data: Product_ReviewUncheckedUpdateWithoutProductInput;
}

export interface Product_ReviewUpdateManyWithWhereWithoutProductInput {
  where: Product_ReviewScalarWhereInput;
  data: Product_ReviewUncheckedUpdateManyWithoutReviewInput;
}

export interface Product_ReviewScalarWhereInput {
  AND?: Product_ReviewScalarWhereInput[];
  OR?: Product_ReviewScalarWhereInput[];
  NOT?: Product_ReviewScalarWhereInput[];
  id?: IntFilter;
  product_id?: IntFilter;
  score?: IntFilter;
}

export interface Product_ReviewCreateManyProductInput {
  id?: number;
  score: number;
}

export interface Product_ReviewUpdateWithoutProductInput {
  score?: number;
}

export interface Product_ReviewUncheckedUpdateWithoutProductInput {
  id?: number;
  score?: number;
}

export interface Product_ReviewUncheckedUpdateManyWithoutReviewInput {
  id?: number;
  score?: number;
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
export enum ProductScalarFieldEnum {
  id = 'id',
}
export enum QueryMode {
  default = 'default',
  insensitive = 'insensitive',
}
export enum ReviewScalarFieldEnum {
  id = 'id',
  product_id = 'product_id',
  score = 'score',
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
