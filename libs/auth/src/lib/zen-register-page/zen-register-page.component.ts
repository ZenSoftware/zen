import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSession } from '@zen/graphql';

import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-register-page',
  templateUrl: 'zen-register-page.component.html',
})
export class ZenRegisterPageComponent {
  constructor(private router: Router, private auth: AuthService) {}

  registered(authSession: AuthSession) {
    this.auth.setSession(authSession);
    this.router.navigateByUrl('/');
  }
}
