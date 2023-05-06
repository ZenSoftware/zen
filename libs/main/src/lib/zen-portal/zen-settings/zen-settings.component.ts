import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@zen/auth';
import { ZenPasswordChangeComponent } from '@zen/auth';

@Component({
  selector: 'zen-settings',
  templateUrl: 'zen-settings.component.html',
  standalone: true,
  imports: [NgIf, ZenPasswordChangeComponent, AsyncPipe],
})
export class ZenSettingsComponent {
  constructor(public auth: AuthService) {}
}
