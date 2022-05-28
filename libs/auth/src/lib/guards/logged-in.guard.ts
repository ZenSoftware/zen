import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { loggedInVar } from '@zen/graphql/client';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router) {}

  canActivate() {
    return loggedInVar() ? true : this.router.parseUrl('/login');
  }

  canActivateChild() {
    return this.canActivate();
  }

  canLoad() {
    return this.canActivate();
  }
}
