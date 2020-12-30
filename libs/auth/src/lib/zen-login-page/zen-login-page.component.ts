import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'zen-login-page',
  templateUrl: 'zen-login-page.component.html',
})
export class ZenLoginPageComponent {
  constructor(private router: Router) {}

  onLoggedIn() {
    this.router.navigateByUrl('/');
  }
}
