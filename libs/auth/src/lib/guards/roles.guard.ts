import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Role } from '@zen/graphql';

import { AuthService } from '../auth.service';

export class RolesGuard {
  static for(...roles: Role[]) {
    @Injectable({
      providedIn: 'root',
    })
    class RoleCheck implements CanActivate, CanLoad {
      constructor(private auth: AuthService, private router: Router) {}

      canActivate() {
        return this.auth.userHasRole(roles) ? true : this.router.parseUrl('/login');
      }

      canLoad() {
        return this.canActivate();
      }
    }

    return RoleCheck;
  }
}
