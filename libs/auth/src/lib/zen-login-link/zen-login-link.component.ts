import { Component, Input } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-login-link',
  templateUrl: 'zen-login-link.component.html',
})
export class ZenLoginLinkComponent {
  @Input() displayLogout = true;

  constructor(public auth: AuthService) {}
}
