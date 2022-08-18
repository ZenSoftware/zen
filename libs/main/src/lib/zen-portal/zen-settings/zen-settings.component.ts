import { Component } from '@angular/core';
import { AuthService } from '@zen/auth';

@Component({
  selector: 'zen-settings',
  templateUrl: 'zen-settings.component.html',
})
export class ZenSettingsComponent {
  constructor(public auth: AuthService) {}
}
