import { makeVar } from '@apollo/client/core';
import ls from 'localstorage-slim';

const token: string | null = ls?.get('token', { decrypt: true });
export const tokenVar = makeVar<string | null>(token);
