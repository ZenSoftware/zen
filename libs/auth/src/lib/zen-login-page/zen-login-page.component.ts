import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loggedInVar } from '@zen/graphql/client';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-login-page',
  templateUrl: 'zen-login-page.component.html',
  animations: [...verticalAccordion],
})
export class ZenLoginPageComponent {
  constructor(private router: Router, private auth: AuthService) {
    if (loggedInVar()) this.router.navigateByUrl('/');
  }

  onLoggedIn() {
    this.router.navigateByUrl('/');
  }
}
