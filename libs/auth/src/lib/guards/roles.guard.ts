import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Role } from '@zen/common';

import { AuthService } from '../auth.service';

/**
 * Produces Angular functional route guards
 */
export class RolesGuard {
  /**
   * Produces Angular functional route guards that check if the user has at least one of the given roles.
   * Redirects to the login page otherwise.
   */
  static has(...roles: Role[]): CanMatchFn {
    return () => inject(AuthService).userHasRole(roles) || inject(Router).parseUrl('/login');
  }

  /**
   * Produces Angular functional route guards that check if the user does not have any of the given roles.
   * Redirects to the login page otherwise.
   */
  static not(...roles: Role[]): CanMatchFn {
    return () => inject(AuthService).userNotInRole(roles) || inject(Router).parseUrl('/login');
  }
}
