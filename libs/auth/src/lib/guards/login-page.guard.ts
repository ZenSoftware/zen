import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Environment } from '@zen/common';

import { AuthService } from '../auth.service';

/**
 * Redirects to the login redirect URL set in the environment variables if the user is already logged in.
 * This is for when the app loads and the user is already logged in they are redirected appropriately instead of seeing the login page.
 */
export const LoginPageGuard: CanMatchFn = () => {
  const router = inject(Router);
  const env = inject(Environment);
  const auth = inject(AuthService);
  return auth.loggedIn ? router.parseUrl(env.url.loginRedirect) : true;
};
