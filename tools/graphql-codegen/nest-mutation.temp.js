module.exports = mutationName => {
  return `  @Mutation()
  async ${mutationName}(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.${mutationName}(parent, PrismaSelectArgs(info, args), context);
  }\n\n`;
};
