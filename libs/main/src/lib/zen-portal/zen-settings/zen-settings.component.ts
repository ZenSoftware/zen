import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ZenAccountInfoComponent, ZenPasswordChangeComponent } from '@zen/auth';

@Component({
  selector: 'zen-settings',
  templateUrl: 'zen-settings.component.html',
  standalone: true,
  imports: [TranslatePipe, ZenAccountInfoComponent, ZenPasswordChangeComponent],
})
export class ZenSettingsComponent {}
