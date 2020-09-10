import { __decorate, __metadata, __param } from "tslib";
import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelectArgs } from '../prisma-select-args';
import resolvers from '../prisma/Post/resolvers';
export const PostTypeDef = null;
// export const PostTypeDef = gql`
//   extend type Query {
//     samplePostQuery: Post!
//   }
//   extend type Mutation {
//     samplePostMutation(args: Int!): Boolean
//   }
//   extend type Post {
//     samplePostField: String
//   }
// `;
let PostResolver = class PostResolver {
    async findOnePost(parent, info, args, context) {
        return resolvers.Query.findOnePost(parent, PrismaSelectArgs(info, args), context);
    }
    async findManyPost(parent, info, args, context) {
        return resolvers.Query.findManyPost(parent, PrismaSelectArgs(info, args), context);
    }
    async findManyPostCount(parent, info, args, context) {
        return resolvers.Query.findManyPostCount(parent, PrismaSelectArgs(info, args), context);
    }
    async createOnePost(parent, info, args, context) {
        return resolvers.Mutation.createOnePost(parent, PrismaSelectArgs(info, args), context);
    }
    async updateOnePost(parent, info, args, context) {
        return resolvers.Mutation.updateOnePost(parent, PrismaSelectArgs(info, args), context);
    }
    async deleteOnePost(parent, info, args, context) {
        return resolvers.Mutation.deleteOnePost(parent, PrismaSelectArgs(info, args), context);
    }
    async upsertOnePost(parent, info, args, context) {
        return resolvers.Mutation.upsertOnePost(parent, PrismaSelectArgs(info, args), context);
    }
    async deleteManyPost(parent, info, args, context) {
        return resolvers.Mutation.deleteManyPost(parent, PrismaSelectArgs(info, args), context);
    }
    async updateManyPost(parent, info, args, context) {
        return resolvers.Mutation.updateManyPost(parent, PrismaSelectArgs(info, args), context);
    }
};
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "findOnePost", null);
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "findManyPost", null);
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "findManyPostCount", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createOnePost", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updateOnePost", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deleteOnePost", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "upsertOnePost", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deleteManyPost", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updateManyPost", null);
PostResolver = __decorate([
    Resolver('Post')
], PostResolver);
export { PostResolver };
//# sourceMappingURL=Post.js.map