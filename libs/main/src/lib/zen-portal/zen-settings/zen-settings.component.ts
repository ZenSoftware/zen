import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ZenAccountInfoComponent, ZenPasswordChangeComponent } from '@zen/auth';

@Component({
  selector: 'zen-settings',
  templateUrl: 'zen-settings.component.html',
  standalone: true,
  imports: [TranslateModule, ZenAccountInfoComponent, ZenPasswordChangeComponent],
})
export class ZenSettingsComponent {}
