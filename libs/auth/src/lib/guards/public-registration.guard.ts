import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Environment } from '@zen/common';

export const PublicRegistrationGuard: CanMatchFn = () =>
  inject(Environment).publicRegistration || inject(Router).parseUrl('/login');
