import { __decorate, __metadata, __param } from "tslib";
import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelectArgs } from '../prisma-select-args';
import resolvers from '../prisma/Group/resolvers';
export const GroupTypeDef = null;
// export const GroupTypeDef = gql`
//   extend type Query {
//     sampleGroupQuery: Group!
//   }
//   extend type Mutation {
//     sampleGroupMutation(args: Int!): Boolean
//   }
//   extend type Group {
//     sampleGroupField: String
//   }
// `;
let GroupResolver = class GroupResolver {
    async findOneGroup(parent, info, args, context) {
        return resolvers.Query.findOneGroup(parent, PrismaSelectArgs(info, args), context);
    }
    async findManyGroup(parent, info, args, context) {
        return resolvers.Query.findManyGroup(parent, PrismaSelectArgs(info, args), context);
    }
    async findManyGroupCount(parent, info, args, context) {
        return resolvers.Query.findManyGroupCount(parent, PrismaSelectArgs(info, args), context);
    }
    async createOneGroup(parent, info, args, context) {
        return resolvers.Mutation.createOneGroup(parent, PrismaSelectArgs(info, args), context);
    }
    async updateOneGroup(parent, info, args, context) {
        return resolvers.Mutation.updateOneGroup(parent, PrismaSelectArgs(info, args), context);
    }
    async deleteOneGroup(parent, info, args, context) {
        return resolvers.Mutation.deleteOneGroup(parent, PrismaSelectArgs(info, args), context);
    }
    async upsertOneGroup(parent, info, args, context) {
        return resolvers.Mutation.upsertOneGroup(parent, PrismaSelectArgs(info, args), context);
    }
    async deleteManyGroup(parent, info, args, context) {
        return resolvers.Mutation.deleteManyGroup(parent, PrismaSelectArgs(info, args), context);
    }
    async updateManyGroup(parent, info, args, context) {
        return resolvers.Mutation.updateManyGroup(parent, PrismaSelectArgs(info, args), context);
    }
};
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "findOneGroup", null);
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "findManyGroup", null);
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "findManyGroupCount", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "createOneGroup", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "updateOneGroup", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "deleteOneGroup", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "upsertOneGroup", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "deleteManyGroup", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "updateManyGroup", null);
GroupResolver = __decorate([
    Resolver('Group')
], GroupResolver);
export { GroupResolver };
//# sourceMappingURL=Group.js.map