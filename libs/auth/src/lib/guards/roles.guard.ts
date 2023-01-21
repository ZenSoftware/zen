import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanMatch, Router } from '@angular/router';
import { Role } from '@zen/common';

import { AuthService } from '../auth.service';

export class RolesGuard {
  static has(...roles: Array<Role>) {
    @Injectable({
      providedIn: 'root',
    })
    class HasRoles implements CanActivate, CanActivateChild, CanMatch {
      constructor(public auth: AuthService, public router: Router) {}

      canActivate() {
        return this.auth.userHasRole(roles as string[]) ? true : this.router.parseUrl('/login');
      }

      canActivateChild() {
        return this.canActivate();
      }

      canMatch() {
        return this.canActivate();
      }
    }

    return HasRoles;
  }

  static not(...roles: string[]) {
    @Injectable({
      providedIn: 'root',
    })
    class NotRoles implements CanActivate, CanActivateChild, CanMatch {
      constructor(public auth: AuthService, public router: Router) {}

      canActivate() {
        return this.auth.userNotInRole(roles as string[]) ? true : this.router.parseUrl('/login');
      }

      canActivateChild() {
        return this.canActivate();
      }

      canMatch() {
        return this.canActivate();
      }
    }

    return NotRoles;
  }
}
