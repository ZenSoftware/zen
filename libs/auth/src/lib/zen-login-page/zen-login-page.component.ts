import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-login-page',
  templateUrl: 'zen-login-page.component.html',
})
export class ZenLoginPageComponent {
  constructor(private router: Router, private auth: AuthService) {
    if (auth.loggedIn) this.router.navigateByUrl('/');
  }

  onLoggedIn() {
    this.router.navigateByUrl('/');
  }
}
