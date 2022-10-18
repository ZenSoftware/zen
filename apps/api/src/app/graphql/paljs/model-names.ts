import { RenameRootFields, RenameTypes, wrapSchema } from '@graphql-tools/wrap';
import { GraphQLSchema } from 'graphql';

export const modelNames = () => {
  return ['User'];
};

//This subgraph's name is set to "Product".
//Input type args is modified to be preceded by "Product_" because inputs are merged using the intersection strategy in the current version of Apollo Federation and directives are not supported with input types.
export const renamedInputTypesSchema = async (schema: GraphQLSchema) => {
  const typeMap = schema.getTypeMap();
  const models: string = modelNames().join('|');
  const inputTypes = Object.keys(typeMap).filter(type => {
    const inputTypesRegex = new RegExp(
      `(${models})(WhereInput|OrderByWithRelationInput|WhereUniqueInput|OrderByWithAggregationInput|ScalarWhereWithAggregatesInput|CreateInput|UncheckedCreateInput|UpdateInput|UncheckedUpdateInput|CreateManyInput|UpdateManyMutationInput|UncheckedUpdateManyInput|CountOrderByAggregateInput|AvgOrderByAggregateInput|MaxOrderByAggregateInput|MinOrderByAggregateInput|SumOrderByAggregateInput|Create.*?Input|Update.*?Input|Unchecked.*?Input)`
    );
    return type.match(inputTypesRegex)?.input;
  });

  return wrapSchema({
    schema: schema,
    transforms: [
      new RenameTypes(name => (inputTypes.includes(name) ? `Product_${name}` : name)),
      new RenameRootFields((operation, fieldName) =>
        (operation == 'Query' || operation == 'Mutation') &&
        fieldName != '_entities' &&
        fieldName != '_service' &&
        fieldName != 'sampleUpload' &&
        fieldName != 'sampleUploadMany'
          ? `Product_${fieldName}`
          : fieldName
      ),
    ],
  });
};
