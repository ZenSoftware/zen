import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from '@zen/common';

import { AuthService } from '../auth.service';

export const LoginPageGuard = () => {
  const router = inject(Router);
  const env = inject(Environment);
  const auth = inject(AuthService);
  return auth.loggedIn ? router.parseUrl(env.url.loginRedirect) : true;
};
