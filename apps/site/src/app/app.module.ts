import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '@zen/graphql';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, GraphQLModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
