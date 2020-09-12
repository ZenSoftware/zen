module.exports = queryName => {
  return `  @Query()
  async ${queryName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.${queryName}(parent, PrismaSelectArgs(info, args), ctx);
  }\n\n`;
};
