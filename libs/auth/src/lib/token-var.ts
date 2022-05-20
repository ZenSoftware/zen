import { makeVar } from '@apollo/client/core';
import ls from 'localstorage-slim';

const token: string = ls?.get('token', { decrypt: true }) ?? '';
export const tokenVar = makeVar<string | null>(token);
