import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { loggedInVar } from '@zen/graphql/client';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (loggedInVar()) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
