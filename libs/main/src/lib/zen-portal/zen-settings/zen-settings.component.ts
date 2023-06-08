import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@zen/auth';
import { ZenAccountInfoComponent, ZenPasswordChangeComponent } from '@zen/auth';

@Component({
  selector: 'zen-settings',
  templateUrl: 'zen-settings.component.html',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, NgIf, ZenAccountInfoComponent, ZenPasswordChangeComponent],
})
export class ZenSettingsComponent {
  constructor(public auth: AuthService) {}
}
