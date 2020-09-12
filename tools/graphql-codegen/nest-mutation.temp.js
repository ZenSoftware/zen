module.exports = mutationName => {
  return `  @Mutation()
  async ${mutationName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.${mutationName}(parent, PrismaSelectArgs(info, args), ctx);
  }\n\n`;
};
