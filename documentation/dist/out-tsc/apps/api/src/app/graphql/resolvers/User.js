import { __decorate, __metadata, __param } from "tslib";
import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelectArgs } from '../prisma-select-args';
import resolvers from '../prisma/User/resolvers';
export const UserTypeDef = null;
// export const UserTypeDef = gql`
//   extend type Query {
//     sampleUserQuery: User!
//   }
//   extend type Mutation {
//     sampleUserMutation(args: Int!): Boolean
//   }
//   extend type User {
//     sampleUserField: String
//   }
// `;
let UserResolver = class UserResolver {
    async findOneUser(parent, info, args, context) {
        return resolvers.Query.findOneUser(parent, PrismaSelectArgs(info, args), context);
    }
    async findManyUser(parent, info, args, context) {
        return resolvers.Query.findManyUser(parent, PrismaSelectArgs(info, args), context);
    }
    async findManyUserCount(parent, info, args, context) {
        return resolvers.Query.findManyUserCount(parent, PrismaSelectArgs(info, args), context);
    }
    async createOneUser(parent, info, args, context) {
        return resolvers.Mutation.createOneUser(parent, PrismaSelectArgs(info, args), context);
    }
    async updateOneUser(parent, info, args, context) {
        return resolvers.Mutation.updateOneUser(parent, PrismaSelectArgs(info, args), context);
    }
    async deleteOneUser(parent, info, args, context) {
        return resolvers.Mutation.deleteOneUser(parent, PrismaSelectArgs(info, args), context);
    }
    async upsertOneUser(parent, info, args, context) {
        return resolvers.Mutation.upsertOneUser(parent, PrismaSelectArgs(info, args), context);
    }
    async deleteManyUser(parent, info, args, context) {
        return resolvers.Mutation.deleteManyUser(parent, PrismaSelectArgs(info, args), context);
    }
    async updateManyUser(parent, info, args, context) {
        return resolvers.Mutation.updateManyUser(parent, PrismaSelectArgs(info, args), context);
    }
};
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findOneUser", null);
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findManyUser", null);
__decorate([
    Query(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findManyUserCount", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createOneUser", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateOneUser", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteOneUser", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "upsertOneUser", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteManyUser", null);
__decorate([
    Mutation(),
    __param(0, Parent()), __param(1, Info()), __param(2, Args()), __param(3, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateManyUser", null);
UserResolver = __decorate([
    Resolver('User')
], UserResolver);
export { UserResolver };
//# sourceMappingURL=User.js.map