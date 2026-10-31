// Source code from https://github.com/unlight/prisma-graphql-type-decimal
import { Decimal } from '@prisma/client/runtime/library.js';
import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from 'graphql';

const config: GraphQLScalarTypeConfig<null | string | number | Decimal, string> = {
  name: 'Decimal',
  description: 'An arbitrary-precision Decimal type',
  /**
   * Value sent to the client
   */
  serialize(value) {
    // console.log('serialize value', value.constructor.name);
    return String(value);
  },
  /**
   * Value from the client
   */
  parseValue(value) {
    return new Decimal(value as Decimal.Value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
      return new Decimal(ast.value);
    }
    // eslint-disable-next-line unicorn/no-null
    return null;
  },
};

export const GraphQLDecimal = new GraphQLScalarType(config);

export function createDecimalFromObject(object: any) {
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return Object.create(Decimal.prototype, {
    d: { value: object.d },
    e: { value: object.e },
    s: { value: object.s },
  }) as Decimal;
}

interface TransformFunctionParams {
  value: any;
}

export function transformToDecimal({ value }: TransformFunctionParams) {
  if (value == null) return value;
  return Array.isArray(value) ? value.map(createDecimalFromObject) : createDecimalFromObject(value);
}
