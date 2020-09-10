import { __decorate, __metadata, __param } from "tslib";
import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelectArgs } from '../prisma-select-args';
import resolvers from '../prisma/Comment/resolvers';
export const CommentTypeDef = null;
// export const CommentTypeDef = gql`
//   extend type Query {
//     sampleCommentQuery: Comment!
//   }
//   extend type Mutation {
//     sampleCommentMutation(args: Int!): Boolean
//   }
//   extend type Comment {
//     sampleCommentField: String
//   }
// `;
let CommentResolver = class CommentResolver {
    async findOneComment(parent, info, args, context) {
        return resolvers.Query.findOneComment(parent, PrismaSelectArgs(info, args), context);
    }
    async findManyComment(parent, info, args, context) {
        return resolvers.Query.findManyComment(parent, PrismaSelectArgs(info, args), context);
    }
    async findManyCommentCount(parent, info, args, context) {
        return resolvers.Query.findManyCommentCount(parent, PrismaSelectArgs(info, args), context);
    }
    async createOneComment(parent, info, args, context) {
        return resolvers.Mutation.createOneComment(parent, PrismaSelectArgs(info, args), context);
    }
    async updateOneComment(parent, info, args, context) {
        return resolvers.Mutation.updateOneComment(parent, PrismaSelectArgs(info, args), context);
    }
    async deleteOneComment(parent, info, args, context) {
        return resolvers.Mutation.deleteOneComment(parent, PrismaSelectArgs(info, args), context);
    }
    async upsertOneComment(parent, info, args, context) {
        return resolvers.Mutation.upsertOneComment(parent, PrismaSelectArgs(info, args), context);
    }
    async deleteManyComment(parent, info, args, context) {
        return resolvers.Mutation.deleteManyComment(parent, PrismaSelectArgs(info, args), context);
    }
    async updateManyComment(parent, info, args, context) {
        return resolvers.Mutation.updateManyComment(parent, PrismaSelectArgs(info, args), context);
    }
};
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "findOneComment", null);
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "findManyComment", null);
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "findManyCommentCount", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createOneComment", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "updateOneComment", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "deleteOneComment", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "upsertOneComment", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "deleteManyComment", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "updateManyComment", null);
CommentResolver = __decorate([
    Resolver('Comment')
], CommentResolver);
export { CommentResolver };
//# sourceMappingURL=Comment.js.map