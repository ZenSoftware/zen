import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Environment } from '@zen/common';

@Injectable({
  providedIn: 'root',
})
export class PublicRegistrationGuard implements CanActivate {
  constructor(private router: Router, private env: Environment) {}

  canActivate() {
    return this.env.publicRegistration ? true : this.router.createUrlTree(['']);
  }
}
