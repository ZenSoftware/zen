import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from '@zen/common';

export const PublicRegistrationGuard = () =>
  inject(Environment).publicRegistration || inject(Router).parseUrl('/login');
