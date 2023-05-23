import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { AuthService } from '../auth.service';

/**
 * Angular functional route guard that only allows logged in users access to the route and redirects to the login page otherwise.
 */
export const LoggedInGuard: CanMatchFn = () =>
  inject(AuthService).loggedIn() ? true : inject(Router).parseUrl('/login');
