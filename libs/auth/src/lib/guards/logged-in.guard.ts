import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { loggedInVar } from '@zen/graphql/client';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  canActivate() {
    return loggedInVar() ? true : this.router.parseUrl('/login');
  }

  canLoad() {
    return this.canActivate();
  }
}
