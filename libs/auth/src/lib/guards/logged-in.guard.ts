import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { AuthService } from '../auth.service';

export const LoggedInGuard: CanMatchFn = () =>
  inject(AuthService).loggedIn() ? true : inject(Router).parseUrl('/login');
