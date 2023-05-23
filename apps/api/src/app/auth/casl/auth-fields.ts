import { Provider } from '@nestjs/common';

import { DefaultFields } from '../../prisma';

/**
 * Default fields to include with Prisma transactions to ensure that they exist during authorization.
 * Any fields that Casl ability rules are based on should be included here.
 * @see [Pal.js Select docs](https://paljs.com/plugins/select/#api)
 */
const authFields: DefaultFields = {
  // ... List authorization fields here
};

export const AUTH_FIELDS_TOKEN = 'AUTH_FIELDS';

export const authFieldsProvider: Provider = {
  provide: AUTH_FIELDS_TOKEN,
  useValue: authFields,
};
