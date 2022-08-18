import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-manage-account',
  templateUrl: 'zen-manage-account.component.html',
})
export class ZenManageAccountComponent {
  constructor(public auth: AuthService) {}
}
