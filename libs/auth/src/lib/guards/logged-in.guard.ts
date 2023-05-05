import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { loggedInVar } from '@zen/graphql/client';

export const LoggedInGuard = () => (loggedInVar() ? true : inject(Router).parseUrl('/login'));
