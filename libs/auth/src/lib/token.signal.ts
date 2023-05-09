import { signal } from '@angular/core';
import ls from 'localstorage-slim';

const localStorageToken: string | null = ls.get('token', { decrypt: true });
export const token = signal(localStorageToken);
