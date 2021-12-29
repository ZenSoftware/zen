import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpRequestInterceptor, ZenAuthModule, tokenVar } from '@zen/auth';
import { Environment } from '@zen/common';
import { ZenGraphQLModule } from '@zen/graphql';
import { possibleTypes, typePolicies } from '@zen/graphql/client';
import { MainModule } from '@zen/main';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MatToolbarModule,
    ZenAuthModule,
    MainModule,
    ZenGraphQLModule.forRoot({
      cacheOptions: {
        possibleTypes,
        typePolicies,
      },
      batchOptions: {
        uri: environment.url.graphql,
        batchMax: 250,
        withCredentials: true,
      },
      uploadOptions: {
        uri: environment.url.graphql,
        mutationNames: ['SampleUpload'],
        fetch: (input, init: any) => {
          init.headers.Authorization = 'Bearer ' + tokenVar();
          return fetch(input, init);
        },
      },
      websocketOptions: {
        uri: environment.url.graphqlSubscriptions,
        options: {
          reconnect: true,
          connectionParams: () => ({ token: tokenVar() }),
        },
      },
    }),
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: Environment, useValue: environment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
