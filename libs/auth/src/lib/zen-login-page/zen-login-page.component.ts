import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRegisterGQL } from '@zen/graphql';

@Component({
  selector: 'zen-login-page',
  templateUrl: 'zen-login-page.component.html',
})
export class ZenLoginPageComponent {
  constructor(private router: Router, private authRegisterGQL: AuthRegisterGQL) {}

  onLoggedIn() {
    this.router.navigateByUrl('/');
  }

  // createUser() {
  //   this.authRegisterGQL
  //     .mutate({
  //       data: {
  //         email: 'admin@temp.com',
  //         password: 'TempTemp',
  //       },
  //     })
  //     .subscribe(({ data }) => console.log('Created', data?.authRegister));
  // }
}
