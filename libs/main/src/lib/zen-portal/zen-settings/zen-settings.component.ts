import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService, ZenAccountInfoComponent, ZenPasswordChangeComponent } from '@zen/auth';

@Component({
  selector: 'zen-settings',
  templateUrl: 'zen-settings.component.html',
  standalone: true,
  imports: [AsyncPipe, ZenAccountInfoComponent, ZenPasswordChangeComponent],
})
export class ZenSettingsComponent {
  constructor(public auth: AuthService) {}
}
