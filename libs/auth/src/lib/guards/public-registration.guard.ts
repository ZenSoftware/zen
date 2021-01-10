import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Environment } from '@zen/common';

@Injectable({
  providedIn: 'root',
})
export class PublicRegistrationGuard implements CanActivate {
  constructor(private env: Environment) {}

  canActivate() {
    return this.env.publicRegistration;
  }
}
