module.exports = queryName => {
  return `  @Query()
  async ${queryName}(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.${queryName}(parent, PrismaSelectArgs(info, args), context);
  }\n\n`;
};
