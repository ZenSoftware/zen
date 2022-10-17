import gql from 'graphql-tag';

export default gql`
  scalar DateTime

  type BatchPayload {
    count: Int!
  }
  enum JsonNullValueFilter {
    DbNull
    JsonNull
    AnyNull
  }

  enum NullableJsonNullValueInput {
    DbNull
    JsonNull
  }

  enum ProductScalarFieldEnum {
    id
  }

  enum QueryMode {
    default
    insensitive
  }

  enum ReviewScalarFieldEnum {
    id
    product_id
    score
  }

  enum SortOrder {
    asc
    desc
  }

  enum TransactionIsolationLevel {
    ReadUncommitted
    ReadCommitted
    RepeatableRead
    Serializable
  }

  enum UserScalarFieldEnum {
    id
    createdAt
    username
    password
    email
    roles
    googleId
    googleProfile
  }

  input Product_UserWhereInput {
    AND: [Product_UserWhereInput!]
    OR: [Product_UserWhereInput!]
    NOT: [Product_UserWhereInput!]
    id: IntFilter
    createdAt: DateTimeFilter
    username: StringNullableFilter
    password: StringNullableFilter
    email: StringFilter
    roles: StringNullableListFilter
    googleId: StringNullableFilter
    googleProfile: JsonNullableFilter
  }

  input Product_UserOrderByWithRelationInput {
    id: SortOrder
    createdAt: SortOrder
    username: SortOrder
    password: SortOrder
    email: SortOrder
    roles: SortOrder
    googleId: SortOrder
    googleProfile: SortOrder
  }

  input Product_UserWhereUniqueInput {
    id: Int
    username: String
    email: String
    googleId: String
  }

  input Product_UserOrderByWithAggregationInput {
    id: SortOrder
    createdAt: SortOrder
    username: SortOrder
    password: SortOrder
    email: SortOrder
    roles: SortOrder
    googleId: SortOrder
    googleProfile: SortOrder
    _count: Product_UserCountOrderByAggregateInput
    _avg: Product_UserAvgOrderByAggregateInput
    _max: Product_UserMaxOrderByAggregateInput
    _min: Product_UserMinOrderByAggregateInput
    _sum: Product_UserSumOrderByAggregateInput
  }

  input Product_UserScalarWhereWithAggregatesInput {
    AND: [Product_UserScalarWhereWithAggregatesInput!]
    OR: [Product_UserScalarWhereWithAggregatesInput!]
    NOT: [Product_UserScalarWhereWithAggregatesInput!]
    id: IntWithAggregatesFilter
    createdAt: DateTimeWithAggregatesFilter
    username: StringNullableWithAggregatesFilter
    password: StringNullableWithAggregatesFilter
    email: StringWithAggregatesFilter
    roles: StringNullableListFilter
    googleId: StringNullableWithAggregatesFilter
    googleProfile: JsonNullableWithAggregatesFilter
  }

  input Product_ReviewWhereInput {
    AND: [Product_ReviewWhereInput!]
    OR: [Product_ReviewWhereInput!]
    NOT: [Product_ReviewWhereInput!]
    id: IntFilter
    product: Product_ProductWhereInput
    product_id: IntFilter
    score: IntFilter
  }

  input Product_ReviewOrderByWithRelationInput {
    id: SortOrder
    product: Product_ProductOrderByWithRelationInput
    product_id: SortOrder
    score: SortOrder
  }

  input Product_ReviewWhereUniqueInput {
    id: Int
    product_id: Int
  }

  input Product_ReviewOrderByWithAggregationInput {
    id: SortOrder
    product_id: SortOrder
    score: SortOrder
    _count: Product_ReviewCountOrderByAggregateInput
    _avg: Product_ReviewAvgOrderByAggregateInput
    _max: Product_ReviewMaxOrderByAggregateInput
    _min: Product_ReviewMinOrderByAggregateInput
    _sum: Product_ReviewSumOrderByAggregateInput
  }

  input Product_ReviewScalarWhereWithAggregatesInput {
    AND: [Product_ReviewScalarWhereWithAggregatesInput!]
    OR: [Product_ReviewScalarWhereWithAggregatesInput!]
    NOT: [Product_ReviewScalarWhereWithAggregatesInput!]
    id: IntWithAggregatesFilter
    product_id: IntWithAggregatesFilter
    score: IntWithAggregatesFilter
  }

  input Product_ProductWhereInput {
    AND: [Product_ProductWhereInput!]
    OR: [Product_ProductWhereInput!]
    NOT: [Product_ProductWhereInput!]
    id: IntFilter
    review: Product_ReviewListRelationFilter
  }

  input Product_ProductOrderByWithRelationInput {
    id: SortOrder
    review: Product_ReviewOrderByRelationAggregateInput
  }

  input Product_ProductWhereUniqueInput {
    id: Int
  }

  input Product_ProductOrderByWithAggregationInput {
    id: SortOrder
    _count: Product_ProductCountOrderByAggregateInput
    _avg: Product_ProductAvgOrderByAggregateInput
    _max: Product_ProductMaxOrderByAggregateInput
    _min: Product_ProductMinOrderByAggregateInput
    _sum: Product_ProductSumOrderByAggregateInput
  }

  input Product_ProductScalarWhereWithAggregatesInput {
    AND: [Product_ProductScalarWhereWithAggregatesInput!]
    OR: [Product_ProductScalarWhereWithAggregatesInput!]
    NOT: [Product_ProductScalarWhereWithAggregatesInput!]
    id: IntWithAggregatesFilter
  }

  input Product_UserCreateInput {
    createdAt: DateTime
    username: String
    password: String
    email: String!
    roles: [String!]
    googleId: String
    googleProfile: Json
  }

  input Product_UserUncheckedCreateInput {
    id: Int
    createdAt: DateTime
    username: String
    password: String
    email: String!
    roles: [String!]
    googleId: String
    googleProfile: Json
  }

  input Product_UserUpdateInput {
    createdAt: DateTime
    username: String
    password: String
    email: String
    roles: [String!]
    googleId: String
    googleProfile: Json
  }

  input Product_UserUncheckedUpdateInput {
    id: Int
    createdAt: DateTime
    username: String
    password: String
    email: String
    roles: [String!]
    googleId: String
    googleProfile: Json
  }

  input Product_UserCreateManyInput {
    id: Int
    createdAt: DateTime
    username: String
    password: String
    email: String!
    roles: [String!]
    googleId: String
    googleProfile: Json
  }

  input Product_UserUpdateManyMutationInput {
    createdAt: DateTime
    username: String
    password: String
    email: String
    roles: [String!]
    googleId: String
    googleProfile: Json
  }

  input Product_UserUncheckedUpdateManyInput {
    id: Int
    createdAt: DateTime
    username: String
    password: String
    email: String
    roles: [String!]
    googleId: String
    googleProfile: Json
  }

  input Product_ReviewCreateInput {
    product: Product_ProductCreateNestedOneWithoutReviewInput!
    score: Int!
  }

  input Product_ReviewUncheckedCreateInput {
    id: Int
    product_id: Int!
    score: Int!
  }

  input Product_ReviewUpdateInput {
    product: Product_ProductUpdateOneRequiredWithoutReviewNestedInput
    score: Int
  }

  input Product_ReviewUncheckedUpdateInput {
    id: Int
    product_id: Int
    score: Int
  }

  input Product_ReviewCreateManyInput {
    id: Int
    product_id: Int!
    score: Int!
  }

  input Product_ReviewUpdateManyMutationInput {
    score: Int
  }

  input Product_ReviewUncheckedUpdateManyInput {
    id: Int
    product_id: Int
    score: Int
  }

  input Product_ProductCreateInput {
    review: Product_ReviewCreateNestedManyWithoutProductInput
  }

  input Product_ProductUncheckedCreateInput {
    id: Int
    review: Product_ReviewUncheckedCreateNestedManyWithoutProductInput
  }

  input Product_ProductUpdateInput {
    review: Product_ReviewUpdateManyWithoutProductNestedInput
  }

  input Product_ProductUncheckedUpdateInput {
    id: Int
    review: Product_ReviewUncheckedUpdateManyWithoutProductNestedInput
  }

  input Product_ProductCreateManyInput {
    id: Int
  }

  input Product_ProductUncheckedUpdateManyInput {
    id: Int
  }

  input IntFilter {
    equals: Int
    in: [Int!]
    notIn: [Int!]
    lt: Int
    lte: Int
    gt: Int
    gte: Int
    not: NestedIntFilter
  }

  input DateTimeFilter {
    equals: DateTime
    in: [DateTime!]
    notIn: [DateTime!]
    lt: DateTime
    lte: DateTime
    gt: DateTime
    gte: DateTime
    not: NestedDateTimeFilter
  }

  input StringNullableFilter {
    equals: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    mode: QueryMode
    not: NestedStringNullableFilter
  }

  input StringFilter {
    equals: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    mode: QueryMode
    not: NestedStringFilter
  }

  input StringNullableListFilter {
    equals: [String!]
    has: String
    hasEvery: [String!]
    hasSome: [String!]
    isEmpty: Boolean
  }

  input JsonNullableFilter {
    equals: Json
    path: [String!]
    string_contains: String
    string_starts_with: String
    string_ends_with: String
    array_contains: Json
    array_starts_with: Json
    array_ends_with: Json
    lt: Json
    lte: Json
    gt: Json
    gte: Json
    not: Json
  }

  input Product_UserCountOrderByAggregateInput {
    id: SortOrder
    createdAt: SortOrder
    username: SortOrder
    password: SortOrder
    email: SortOrder
    roles: SortOrder
    googleId: SortOrder
    googleProfile: SortOrder
  }

  input Product_UserAvgOrderByAggregateInput {
    id: SortOrder
  }

  input Product_UserMaxOrderByAggregateInput {
    id: SortOrder
    createdAt: SortOrder
    username: SortOrder
    password: SortOrder
    email: SortOrder
    googleId: SortOrder
  }

  input Product_UserMinOrderByAggregateInput {
    id: SortOrder
    createdAt: SortOrder
    username: SortOrder
    password: SortOrder
    email: SortOrder
    googleId: SortOrder
  }

  input Product_UserSumOrderByAggregateInput {
    id: SortOrder
  }

  input IntWithAggregatesFilter {
    equals: Int
    in: [Int!]
    notIn: [Int!]
    lt: Int
    lte: Int
    gt: Int
    gte: Int
    not: NestedIntWithAggregatesFilter
    _count: NestedIntFilter
    _avg: NestedFloatFilter
    _sum: NestedIntFilter
    _min: NestedIntFilter
    _max: NestedIntFilter
  }

  input DateTimeWithAggregatesFilter {
    equals: DateTime
    in: [DateTime!]
    notIn: [DateTime!]
    lt: DateTime
    lte: DateTime
    gt: DateTime
    gte: DateTime
    not: NestedDateTimeWithAggregatesFilter
    _count: NestedIntFilter
    _min: NestedDateTimeFilter
    _max: NestedDateTimeFilter
  }

  input StringNullableWithAggregatesFilter {
    equals: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    mode: QueryMode
    not: NestedStringNullableWithAggregatesFilter
    _count: NestedIntNullableFilter
    _min: NestedStringNullableFilter
    _max: NestedStringNullableFilter
  }

  input StringWithAggregatesFilter {
    equals: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    mode: QueryMode
    not: NestedStringWithAggregatesFilter
    _count: NestedIntFilter
    _min: NestedStringFilter
    _max: NestedStringFilter
  }

  input JsonNullableWithAggregatesFilter {
    equals: Json
    path: [String!]
    string_contains: String
    string_starts_with: String
    string_ends_with: String
    array_contains: Json
    array_starts_with: Json
    array_ends_with: Json
    lt: Json
    lte: Json
    gt: Json
    gte: Json
    not: Json
    _count: NestedIntNullableFilter
    _min: NestedJsonNullableFilter
    _max: NestedJsonNullableFilter
  }

  input Product_ProductRelationFilter {
    is: Product_ProductWhereInput
    isNot: Product_ProductWhereInput
  }

  input Product_ReviewCountOrderByAggregateInput {
    id: SortOrder
    product_id: SortOrder
    score: SortOrder
  }

  input Product_ReviewAvgOrderByAggregateInput {
    id: SortOrder
    product_id: SortOrder
    score: SortOrder
  }

  input Product_ReviewMaxOrderByAggregateInput {
    id: SortOrder
    product_id: SortOrder
    score: SortOrder
  }

  input Product_ReviewMinOrderByAggregateInput {
    id: SortOrder
    product_id: SortOrder
    score: SortOrder
  }

  input Product_ReviewSumOrderByAggregateInput {
    id: SortOrder
    product_id: SortOrder
    score: SortOrder
  }

  input Product_ReviewListRelationFilter {
    every: Product_ReviewWhereInput
    some: Product_ReviewWhereInput
    none: Product_ReviewWhereInput
  }

  input Product_ReviewOrderByRelationAggregateInput {
    _count: SortOrder
  }

  input Product_ProductCountOrderByAggregateInput {
    id: SortOrder
  }

  input Product_ProductAvgOrderByAggregateInput {
    id: SortOrder
  }

  input Product_ProductMaxOrderByAggregateInput {
    id: SortOrder
  }

  input Product_ProductMinOrderByAggregateInput {
    id: SortOrder
  }

  input Product_ProductSumOrderByAggregateInput {
    id: SortOrder
  }

  input Product_UserCreaterolesInput {
    set: [String!]!
  }

  input DateTimeFieldUpdateOperationsInput {
    set: DateTime
  }

  input NullableStringFieldUpdateOperationsInput {
    set: String
  }

  input StringFieldUpdateOperationsInput {
    set: String
  }

  input Product_UserUpdaterolesInput {
    set: [String!]
    push: [String!]
  }

  input IntFieldUpdateOperationsInput {
    set: Int
    increment: Int
    decrement: Int
    multiply: Int
    divide: Int
  }

  input Product_ProductCreateNestedOneWithoutReviewInput {
    create: Product_ProductUncheckedCreateWithoutReviewInput
    connectOrCreate: Product_ProductCreateOrConnectWithoutReviewInput
    connect: Product_ProductWhereUniqueInput
  }

  input Product_ProductUpdateOneRequiredWithoutReviewNestedInput {
    create: Product_ProductUncheckedCreateWithoutReviewInput
    connectOrCreate: Product_ProductCreateOrConnectWithoutReviewInput
    upsert: Product_ProductUpsertWithoutReviewInput
    connect: Product_ProductWhereUniqueInput
    update: Product_ProductUncheckedUpdateWithoutReviewInput
  }

  input Product_ReviewCreateNestedManyWithoutProductInput {
    create: [Product_ReviewCreateWithoutProductInput!]
    connectOrCreate: [Product_ReviewCreateOrConnectWithoutProductInput!]
    createMany: Product_ReviewCreateManyProductInputEnvelope
    connect: [Product_ReviewWhereUniqueInput!]
  }

  input Product_ReviewUncheckedCreateNestedManyWithoutProductInput {
    create: [Product_ReviewCreateWithoutProductInput!]
    connectOrCreate: [Product_ReviewCreateOrConnectWithoutProductInput!]
    createMany: Product_ReviewCreateManyProductInputEnvelope
    connect: [Product_ReviewWhereUniqueInput!]
  }

  input Product_ReviewUpdateManyWithoutProductNestedInput {
    create: [Product_ReviewCreateWithoutProductInput!]
    connectOrCreate: [Product_ReviewCreateOrConnectWithoutProductInput!]
    upsert: [Product_ReviewUpsertWithWhereUniqueWithoutProductInput!]
    createMany: Product_ReviewCreateManyProductInputEnvelope
    set: [Product_ReviewWhereUniqueInput!]
    disconnect: [Product_ReviewWhereUniqueInput!]
    delete: [Product_ReviewWhereUniqueInput!]
    connect: [Product_ReviewWhereUniqueInput!]
    update: [Product_ReviewUpdateWithWhereUniqueWithoutProductInput!]
    updateMany: [Product_ReviewUpdateManyWithWhereWithoutProductInput!]
    deleteMany: [Product_ReviewScalarWhereInput!]
  }

  input Product_ReviewUncheckedUpdateManyWithoutProductNestedInput {
    create: [Product_ReviewCreateWithoutProductInput!]
    connectOrCreate: [Product_ReviewCreateOrConnectWithoutProductInput!]
    upsert: [Product_ReviewUpsertWithWhereUniqueWithoutProductInput!]
    createMany: Product_ReviewCreateManyProductInputEnvelope
    set: [Product_ReviewWhereUniqueInput!]
    disconnect: [Product_ReviewWhereUniqueInput!]
    delete: [Product_ReviewWhereUniqueInput!]
    connect: [Product_ReviewWhereUniqueInput!]
    update: [Product_ReviewUpdateWithWhereUniqueWithoutProductInput!]
    updateMany: [Product_ReviewUpdateManyWithWhereWithoutProductInput!]
    deleteMany: [Product_ReviewScalarWhereInput!]
  }

  input NestedIntFilter {
    equals: Int
    in: [Int!]
    notIn: [Int!]
    lt: Int
    lte: Int
    gt: Int
    gte: Int
    not: NestedIntFilter
  }

  input NestedDateTimeFilter {
    equals: DateTime
    in: [DateTime!]
    notIn: [DateTime!]
    lt: DateTime
    lte: DateTime
    gt: DateTime
    gte: DateTime
    not: NestedDateTimeFilter
  }

  input NestedStringNullableFilter {
    equals: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    not: NestedStringNullableFilter
  }

  input NestedStringFilter {
    equals: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    not: NestedStringFilter
  }

  input NestedIntWithAggregatesFilter {
    equals: Int
    in: [Int!]
    notIn: [Int!]
    lt: Int
    lte: Int
    gt: Int
    gte: Int
    not: NestedIntWithAggregatesFilter
    _count: NestedIntFilter
    _avg: NestedFloatFilter
    _sum: NestedIntFilter
    _min: NestedIntFilter
    _max: NestedIntFilter
  }

  input NestedFloatFilter {
    equals: Float
    in: [Float!]
    notIn: [Float!]
    lt: Float
    lte: Float
    gt: Float
    gte: Float
    not: NestedFloatFilter
  }

  input NestedDateTimeWithAggregatesFilter {
    equals: DateTime
    in: [DateTime!]
    notIn: [DateTime!]
    lt: DateTime
    lte: DateTime
    gt: DateTime
    gte: DateTime
    not: NestedDateTimeWithAggregatesFilter
    _count: NestedIntFilter
    _min: NestedDateTimeFilter
    _max: NestedDateTimeFilter
  }

  input NestedStringNullableWithAggregatesFilter {
    equals: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    not: NestedStringNullableWithAggregatesFilter
    _count: NestedIntNullableFilter
    _min: NestedStringNullableFilter
    _max: NestedStringNullableFilter
  }

  input NestedIntNullableFilter {
    equals: Int
    in: [Int!]
    notIn: [Int!]
    lt: Int
    lte: Int
    gt: Int
    gte: Int
    not: NestedIntNullableFilter
  }

  input NestedStringWithAggregatesFilter {
    equals: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    not: NestedStringWithAggregatesFilter
    _count: NestedIntFilter
    _min: NestedStringFilter
    _max: NestedStringFilter
  }

  input NestedJsonNullableFilter {
    equals: Json
    path: [String!]
    string_contains: String
    string_starts_with: String
    string_ends_with: String
    array_contains: Json
    array_starts_with: Json
    array_ends_with: Json
    lt: Json
    lte: Json
    gt: Json
    gte: Json
    not: Json
  }

  input Product_ProductUncheckedCreateWithoutReviewInput {
    id: Int
  }

  input Product_ProductCreateOrConnectWithoutReviewInput {
    where: Product_ProductWhereUniqueInput!
    create: Product_ProductUncheckedCreateWithoutReviewInput!
  }

  input Product_ProductUpsertWithoutReviewInput {
    update: Product_ProductUncheckedUpdateWithoutReviewInput!
    create: Product_ProductUncheckedCreateWithoutReviewInput!
  }

  input Product_ProductUncheckedUpdateWithoutReviewInput {
    id: Int
  }

  input Product_ReviewCreateWithoutProductInput {
    score: Int!
  }

  input Product_ReviewUncheckedCreateWithoutProductInput {
    id: Int
    score: Int!
  }

  input Product_ReviewCreateOrConnectWithoutProductInput {
    where: Product_ReviewWhereUniqueInput!
    create: Product_ReviewUncheckedCreateWithoutProductInput!
  }

  input Product_ReviewCreateManyProductInputEnvelope {
    data: [Product_ReviewCreateManyProductInput!]!
    skipDuplicates: Boolean
  }

  input Product_ReviewUpsertWithWhereUniqueWithoutProductInput {
    where: Product_ReviewWhereUniqueInput!
    update: Product_ReviewUncheckedUpdateWithoutProductInput!
    create: Product_ReviewUncheckedCreateWithoutProductInput!
  }

  input Product_ReviewUpdateWithWhereUniqueWithoutProductInput {
    where: Product_ReviewWhereUniqueInput!
    data: Product_ReviewUncheckedUpdateWithoutProductInput!
  }

  input Product_ReviewUpdateManyWithWhereWithoutProductInput {
    where: Product_ReviewScalarWhereInput!
    data: Product_ReviewUncheckedUpdateManyWithoutReviewInput!
  }

  input Product_ReviewScalarWhereInput {
    AND: [Product_ReviewScalarWhereInput!]
    OR: [Product_ReviewScalarWhereInput!]
    NOT: [Product_ReviewScalarWhereInput!]
    id: IntFilter
    product_id: IntFilter
    score: IntFilter
  }

  input Product_ReviewCreateManyProductInput {
    id: Int
    score: Int!
  }

  input Product_ReviewUpdateWithoutProductInput {
    score: Int
  }

  input Product_ReviewUncheckedUpdateWithoutProductInput {
    id: Int
    score: Int
  }

  input Product_ReviewUncheckedUpdateManyWithoutReviewInput {
    id: Int
    score: Int
  }

  type AggregateUser @shareable {
    _count: UserCountAggregateOutputType
    _avg: UserAvgAggregateOutputType
    _sum: UserSumAggregateOutputType
    _min: UserMinAggregateOutputType
    _max: UserMaxAggregateOutputType
  }

  type AggregateReview @shareable {
    _count: ReviewCountAggregateOutputType
    _avg: ReviewAvgAggregateOutputType
    _sum: ReviewSumAggregateOutputType
    _min: ReviewMinAggregateOutputType
    _max: ReviewMaxAggregateOutputType
  }

  type AggregateProduct @shareable {
    _count: ProductCountAggregateOutputType
    _avg: ProductAvgAggregateOutputType
    _sum: ProductSumAggregateOutputType
    _min: ProductMinAggregateOutputType
    _max: ProductMaxAggregateOutputType
  }

  type UserCountAggregateOutputType @shareable {
    id: Int!
    createdAt: Int!
    username: Int!
    password: Int!
    email: Int!
    roles: Int!
    googleId: Int!
    googleProfile: Int!
    _all: Int!
  }

  type UserAvgAggregateOutputType @shareable {
    id: Float
  }

  type UserSumAggregateOutputType @shareable {
    id: Int
  }

  type UserMinAggregateOutputType @key(fields: "id") @key(fields: "email") @shareable {
    id: Int
    createdAt: DateTime
    username: String
    password: String
    email: String
    googleId: String
  }

  type UserMaxAggregateOutputType @key(fields: "id") @key(fields: "email") @shareable {
    id: Int
    createdAt: DateTime
    username: String
    password: String
    email: String
    googleId: String
  }

  type ReviewCountAggregateOutputType @shareable {
    id: Int!
    product_id: Int!
    score: Int!
    _all: Int!
  }

  type ReviewAvgAggregateOutputType @shareable {
    id: Float
    product_id: Float
    score: Float
  }

  type ReviewSumAggregateOutputType @shareable {
    id: Int
    product_id: Int
    score: Int
  }

  type ReviewMinAggregateOutputType @key(fields: "id") @key(fields: "product_id") @shareable {
    id: Int
    product_id: Int
    score: Int
  }

  type ReviewMaxAggregateOutputType @key(fields: "id") @key(fields: "product_id") @shareable {
    id: Int
    product_id: Int
    score: Int
  }

  type ProductCountOutputType @shareable {
    review: Int!
  }

  type ProductCountAggregateOutputType @shareable {
    id: Int!
    _all: Int!
  }

  type ProductAvgAggregateOutputType @shareable {
    id: Float
  }

  type ProductSumAggregateOutputType @shareable {
    id: Int
  }

  type ProductMinAggregateOutputType @key(fields: "id") @shareable {
    id: Int
  }

  type ProductMaxAggregateOutputType @key(fields: "id") @shareable {
    id: Int
  }
`;
