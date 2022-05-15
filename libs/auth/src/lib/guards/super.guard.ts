import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Role } from '@zen/graphql';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class SuperGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad() {
    return this.auth.userHasRole(Role.Super) ? true : this.router.parseUrl('/login');
  }
}
