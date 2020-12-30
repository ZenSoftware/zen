import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Role } from '@zen/graphql';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class SuperGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate() {
    if (this.auth.userHasRole(Role.Super)) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
