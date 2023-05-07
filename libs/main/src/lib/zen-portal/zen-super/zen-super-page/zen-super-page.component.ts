import { Component } from '@angular/core';

import { ZenSampleSubscriptionComponent } from '../zen-sample-subscription/zen-sample-subscription.component';
import { ZenSampleUploadComponent } from '../zen-sample-upload/zen-sample-upload.component';
import { ZenUserGridComponent } from '../zen-user-manager';

@Component({
  selector: 'zen-super-page',
  templateUrl: 'zen-super-page.component.html',
  standalone: true,
  imports: [ZenSampleSubscriptionComponent, ZenSampleUploadComponent, ZenUserGridComponent],
})
export class ZenSuperPageComponent {}
