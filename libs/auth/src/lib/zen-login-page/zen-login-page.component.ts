import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from '@zen/common';
import { loggedInVar } from '@zen/graphql/client';

import { verticalAccordion } from '../animations';

@Component({
  selector: 'zen-login-page',
  templateUrl: 'zen-login-page.component.html',
  animations: [...verticalAccordion],
})
export class ZenLoginPageComponent {
  constructor(private router: Router, private env: Environment) {
    if (loggedInVar()) this.router.navigateByUrl(env.authenticatedRedirectPath);
  }

  onLoggedIn() {
    this.router.navigateByUrl(this.env.authenticatedRedirectPath);
  }
}
