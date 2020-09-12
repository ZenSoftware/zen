import { makeVar } from '@apollo/client/core';

export { makeVar } from '@apollo/client/core';
export const loggedInVar = makeVar(false);
export const userRolesVar = makeVar<string[]>([]);
