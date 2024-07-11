import { Component } from '@angular/core';
import { ZenAccountInfoComponent, ZenPasswordChangeComponent } from '@zen/auth';

@Component({
  selector: 'zen-settings',
  templateUrl: 'zen-settings.component.html',
  standalone: true,
  imports: [ZenAccountInfoComponent, ZenPasswordChangeComponent],
})
export class ZenSettingsComponent {}
