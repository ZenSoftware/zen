import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Ability, PureAbility } from '@casl/ability';
import { AbilityModule } from '@casl/angular';
import { createPrismaAbility } from '@casl/prisma';
import { AuthInterceptor, ZenAuthModule, tokenVar } from '@zen/auth';
import { Environment } from '@zen/common';
import { ZenGraphQLModule } from '@zen/graphql';
import { possibleTypes, typePolicies } from '@zen/graphql/client';
import { ZenLayoutModule } from '@zen/layout';
import { ZenMainModule } from '@zen/main';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AbilityModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    RouterModule.forRoot([]),
    ZenAuthModule,
    ZenLayoutModule,
    ZenMainModule,
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
        mutationNames: ['SampleUpload', 'SampleUploadMany'],
        headers: { 'Apollo-Require-Preflight': 'true' },
        fetch: (input: any, init: any) => {
          init.headers['Authorization'] = 'Bearer ' + tokenVar();
          return fetch(input, init);
        },
      },
      websocketOptions: {
        url: environment.url.graphqlSubscriptions,
        connectionParams: () => ({ token: tokenVar() }),
        shouldRetry: () => true,
        retryAttempts: Infinity,
      },
    }),
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: Environment, useValue: environment },
    {
      provide: Ability,
      useValue: createPrismaAbility(undefined, {
        detectSubjectType: object => object['__typename'],
      }),
    },
    { provide: PureAbility, useExisting: Ability },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
