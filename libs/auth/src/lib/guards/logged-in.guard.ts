import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

export const LoggedInGuard = () =>
  inject(AuthService).loggedIn ? true : inject(Router).parseUrl('/login');
