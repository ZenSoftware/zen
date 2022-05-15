import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Environment } from '@zen/common';
import { ZenSnackbarErrorService } from '@zen/components';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class LoginConfirmedGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private env: Environment,
    private zenSnackbarError: ZenSnackbarErrorService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const query = route.queryParams;

    try {
      this.auth.setSession({
        id: parseInt(query['id']),
        expiresIn: parseInt(query['expiresIn']),
        rememberMe: query['rememberMe'] === 'true' ? true : false,
        roles: query['roles'] ? query['roles'].split(',') : [],
        token: decodeURIComponent(query['token']),
      });

      /**
       * It would be preferable to use `skipLocationChange` from `NavigationExtras` to not save the route
       * in the browser history.  Though this is currently not supported.  Reference issue:
       * [NavigationExtras when returning URLTree from guard](https://github.com/angular/angular/issues/27148).
       * If a user signs out and presses the back button and resolves back to the `/login-confirmed` route,
       * the user will be unintentionally signed back in.
       */
      return this.router.parseUrl(this.env.url.loginRedirect);
    } catch (error) {
      this.zenSnackbarError.open({ message: 'Failed to login', error });
      return this.router.parseUrl('/login');
    }
  }
}
