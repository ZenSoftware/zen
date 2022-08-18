import { Component } from '@angular/core';
import { AuthService } from '@zen/auth';

@Component({
  selector: 'zen-manage-account',
  templateUrl: 'zen-manage-account.component.html',
})
export class ZenManageAccountComponent {
  constructor(public auth: AuthService) {}
}
