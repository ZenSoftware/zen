import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-login-link',
  templateUrl: 'zen-login-link.component.html',
})
export class ZenLoginLinkComponent {
  constructor(public auth: AuthService) {}
}
