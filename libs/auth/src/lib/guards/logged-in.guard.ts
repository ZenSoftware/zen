import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { loggedInVar } from '@zen/graphql/client';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad() {
    return loggedInVar() ? true : this.router.createUrlTree(['/login']);
  }
}
