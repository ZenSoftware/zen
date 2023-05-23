import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Environment } from '@zen/common';

/**
 * Angular functional route guards that checks if the environment variables allow public registration.
 */
export const PublicRegistrationGuard: CanMatchFn = () =>
  inject(Environment).publicRegistration || inject(Router).parseUrl('/login');
