import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from '@zen/common';
import { loggedInVar } from '@zen/graphql/client';

export const LoginPageGuard = () => {
  const router = inject(Router);
  const env = inject(Environment);
  return loggedInVar() ? router.parseUrl(env.url.loginRedirect) : true;
};
