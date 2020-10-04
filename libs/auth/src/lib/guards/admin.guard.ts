import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Role } from '@zen/graphql';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate() {
    if (this.auth.userHasRole(Role.Admin)) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
