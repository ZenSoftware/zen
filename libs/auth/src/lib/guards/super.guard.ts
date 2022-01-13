import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Role } from '@zen/graphql';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class SuperGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.userHasRole(Role.Super) ? true : this.router.createUrlTree(['/login']);
  }
}
