import { DMMF } from '@prisma/client/runtime';
import { GetDMMFOptions, getDMMF } from '@prisma/internals';
import gql from 'graphql-tag';

export interface SDLInputsOptions {
  dmmfOptions: GetDMMFOptions;
  excludeFields?: string[];
  filterInputs?: (input: DMMF.InputType) => DMMF.SchemaArg[];
  doNotUseFieldUpdateOperationsInput?: boolean;
}

const testedTypes: string[] = [];

const hasEmptyTypeFields = (type: string, schema: DMMF.Schema, options?: SDLInputsOptions) => {
  testedTypes.push(type);
  const inputObjectTypes = schema ? [...schema.inputObjectTypes.prisma] : [];
  if (schema?.inputObjectTypes.model) inputObjectTypes.push(...schema.inputObjectTypes.model);

  const inputType = inputObjectTypes.find(item => item.name === type);
  if (inputType) {
    if (inputType.fields.length === 0) return true;
    for (const field of inputType.fields) {
      const fieldType = getInputType(field, options);
      if (
        fieldType.type !== type &&
        fieldType.location === 'inputObjectTypes' &&
        !testedTypes.includes(fieldType.type as string)
      ) {
        const state = hasEmptyTypeFields(fieldType.type as string, schema, options);
        if (state) return true;
      }
    }
  }
  return false;
};

const getInputType = (
  field: DMMF.SchemaArg,
  options?: { doNotUseFieldUpdateOperationsInput?: boolean }
) => {
  let index = 0;
  if (
    options?.doNotUseFieldUpdateOperationsInput &&
    field.inputTypes.length > 1 &&
    (field.inputTypes[1].type as string).endsWith('FieldUpdateOperationsInput')
  ) {
    return field.inputTypes[index];
  }
  if (
    field.inputTypes.length > 1 &&
    (field.inputTypes[1].location === 'inputObjectTypes' ||
      field.inputTypes[1].isList ||
      field.inputTypes[1].type === 'Json')
  ) {
    index = 1;
  }
  return field.inputTypes[index];
};

async function generateInputsString(schema: DMMF.Schema, options?: SDLInputsOptions) {
  let fileContent = `
scalar DateTime

type BatchPayload {
  count: Int!
}
`;
  if (schema) {
    const enums = [...schema.enumTypes.prisma];
    if (schema.enumTypes.model) enums.push(...schema.enumTypes.model);
    enums.forEach(item => {
      fileContent += `enum ${item.name} {`;
      item.values.forEach(item2 => {
        fileContent += `
        ${item2}`;
      });
      fileContent += `}
  
`;
    });
    const inputObjectTypes = [...schema.inputObjectTypes.prisma];
    if (schema.inputObjectTypes.model) inputObjectTypes.push(...schema.inputObjectTypes.model);

    inputObjectTypes.forEach(input => {
      if (input.fields.length > 0) {
        fileContent += `input ${input.name} {
`;
        const inputFields =
          typeof options?.filterInputs === 'function' ? options.filterInputs(input) : input.fields;
        inputFields
          .filter(field => !options?.excludeFields?.includes(field.name))
          .forEach(async field => {
            const inputType = getInputType(field, options);

            const hasEmptyType =
              inputType.location === 'inputObjectTypes' &&
              hasEmptyTypeFields(inputType.type as string, schema, options);

            if (!hasEmptyType) {
              fileContent += `${field.name}: ${
                inputType.isList ? `[${inputType.type}!]` : inputType.type
              }${field.isRequired ? '!' : ''}
        `;
            }
          });
        fileContent += `}
    
`;
      }
    });

    schema?.outputObjectTypes.prisma
      .filter(type => type.name.includes('Aggregate') || type.name.endsWith('CountOutputType'))
      .forEach(type => {
        fileContent += `type ${type.name} {
      `;
        type.fields
          .filter(field => !options?.excludeFields?.includes(field.name))
          .forEach(field => {
            fileContent += `${field.name}: ${
              field.outputType.isList ? `[${field.outputType.type}!]` : field.outputType.type
            }${!field.isNullable ? '!' : ''}
        `;
          });
        fileContent += `}
    
`;
      });
  }
  return fileContent;
}

export const sdlInputs = async (options: SDLInputsOptions) => {
  const dmmf = await getDMMF(options.dmmfOptions);
  const inputString = await generateInputsString(dmmf.schema, options);
  return gql(inputString);
};

export const sdlInputsString = async (options: SDLInputsOptions) => {
  const dmmf = await getDMMF(options.dmmfOptions);
  return generateInputsString(dmmf.schema, options);
};
