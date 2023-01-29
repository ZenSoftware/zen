import { Provider } from '@nestjs/common';

import { DefaultFields } from '../../prisma';

/**
 * Default fields to include for Prisma queries to ensure that they exist during authorization.
 * Any fields that Casl ability rules are based on should be included here.
 * @see [Pal.js Select docs](https://paljs.com/plugins/select/#api)
 */
const defaultFields: DefaultFields = {
  // ... Add default fields here
};

export const DEFAULT_FIELDS_TOKEN = 'DEFAULT_FIELDS';

export const defaultFieldsProvider: Provider = {
  provide: DEFAULT_FIELDS_TOKEN,
  useValue: defaultFields,
};
