import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Role } from '@zen/common';

import { AuthService } from '../auth.service';

/**
 * Angular route guard
 */
export class RolesGuard {
  static has(...roles: Role[]): CanMatchFn {
    return () => inject(AuthService).userHasRole(roles) || inject(Router).parseUrl('/login');
  }

  static not(...roles: Role[]): CanMatchFn {
    return () => inject(AuthService).userNotInRole(roles) || inject(Router).parseUrl('/login');
  }
}
