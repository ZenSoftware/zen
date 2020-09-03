import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Environment } from '@zen/common';
import { GraphQLModule } from '@zen/graphql';
import { MainModule } from '@zen/main';
import Cookies from 'js-cookie';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MainModule,
    GraphQLModule.forRoot({
      batchOptions: {
        uri: environment.url.graphql,
        batchMax: 250,
        withCredentials: true,
      },
      uploadOptions: {
        uri: environment.url.graphql,
        mutationNames: [],
        credentials: 'include',
      },
      websocketOptions: {
        uri: environment.url.graphqlSubscriptions,
        options: {
          reconnect: true,
          connectionParams: () => ({ token: Cookies.get('jwt') }),
        },
      },
    }),
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: Environment, useValue: environment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
