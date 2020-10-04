import { Component } from '@angular/core';
import { AuthRegisterGQL } from '@zen/graphql';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  constructor(private authRegisterGQL: AuthRegisterGQL) {}

  createUser() {
    this.authRegisterGQL
      .mutate({
        data: {
          email: 'peter@zensoftware.ca',
          password: 'TempTemp',
          firstName: 'Peter',
        },
      })
      .subscribe(({ data }) => console.log('Created', data?.authRegister));
  }
}
