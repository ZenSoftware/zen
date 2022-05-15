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

      return this.router.parseUrl(this.env.url.loginRedirect);
    } catch (error) {
      this.zenSnackbarError.open({ message: 'Failed to login', error });
      return this.router.parseUrl('/login');
    }
  }
}
