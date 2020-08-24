import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@zen/api-interfaces';
import { Environment } from '@zen/common';

@Component({
  selector: 'portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>(`${this.env.appUrl.api}/hello`);

  constructor(private http: HttpClient, private env: Environment) {
    document.title = 'Zen Software';
  }
}
