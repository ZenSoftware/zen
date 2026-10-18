import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
} from '@angular/router';
import { Ability } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { authInterceptorFn, token } from '@zen/auth';
import { Environment } from '@zen/common';
import { ZenGraphQLModule } from '@zen/graphql';
import { possibleTypes, typePolicies } from '@zen/graphql/client';

import { environment } from '../environments/environment';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation(), withHashLocation()),
    { provide: Environment, useValue: environment },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    {
      provide: Ability,
      useValue: createPrismaAbility(undefined, {
        detectSubjectType: object => object['__typename'],
      }),
    },
    importProvidersFrom(
      ZenGraphQLModule.forRoot({
        cacheOptions: {
          possibleTypes,
          typePolicies,
        },
        batchOptions: {
          uri: environment.url.graphql,
          batchMax: 250,
        },
        uploadOptions: {
          uri: environment.url.graphql,
          operationNames: ['SampleUpload', 'SampleUploadMany'],
          headers: { 'Apollo-Require-Preflight': 'true' },
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          fetch: (input, init: any) => {
            init.headers['Authorization'] = 'Bearer ' + token();
            return fetch(input, init);
          },
        },
        websocketOptions: {
          url: environment.url.graphqlSubscriptions,
          connectionParams: () => ({ token: token() }),
          shouldRetry: () => true,
          retryAttempts: Infinity,
        },
      })
    ),
  ],
};
