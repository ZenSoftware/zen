import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@zen/common';

import { AuthService } from '../auth.service';

export class RolesGuard {
  static has(...roles: Role[]) {
    return () => inject(AuthService).userHasRole(roles) || inject(Router).parseUrl('/login');
  }

  static not(...roles: Role[]) {
    return () => inject(AuthService).userNotInRole(roles) || inject(Router).parseUrl('/login');
  }
}
