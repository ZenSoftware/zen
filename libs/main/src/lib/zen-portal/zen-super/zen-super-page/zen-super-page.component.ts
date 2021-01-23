import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Environment } from '@zen/common';

@Component({
  selector: 'zen-super-page',
  templateUrl: 'zen-super-page.component.html',
})
export class ZenSuperPageComponent {
  constructor(private http: HttpClient, private env: Environment) {}

  migrate() {
    console.log('Migration started...');
    this.http
      .post(`${this.env.url.api}/tools/migrate`, {}, { withCredentials: true })
      .subscribe(result => console.log('Migration done', result));
  }
}
