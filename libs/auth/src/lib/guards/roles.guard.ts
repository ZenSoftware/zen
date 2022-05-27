import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { Role } from '@zen/graphql';

import { AuthService } from '../auth.service';

export class RolesGuard {
  static for(...roles: Role[]) {
    @Injectable({
      providedIn: 'root',
    })
    class RolesCheck implements CanActivate, CanActivateChild, CanLoad {
      constructor(private auth: AuthService, private router: Router) {}

      canActivate() {
        return this.auth.userHasRole(roles) ? true : this.router.parseUrl('/login');
      }

      canActivateChild() {
        return this.canActivate();
      }

      canLoad() {
        return this.canActivate();
      }
    }

    return RolesCheck;
  }
}
