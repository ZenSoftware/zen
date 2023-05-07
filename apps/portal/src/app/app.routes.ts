import { Route } from '@angular/router';
import { AUTH_ROUTES } from '@zen/auth';
import { MAIN_ROUTES } from '@zen/main';

export const APP_ROUTES: Route[] = [...AUTH_ROUTES, ...MAIN_ROUTES];
