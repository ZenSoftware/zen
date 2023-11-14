import { Component } from '@angular/core';

import { ZenPasswordResetRequestComponent } from '../zen-password-reset-request/zen-password-reset-request.component';

@Component({
  selector: 'zen-password-reset-request-page',
  templateUrl: 'zen-password-reset-request-page.component.html',
  standalone: true,
  imports: [ZenPasswordResetRequestComponent],
})
export class ZenPasswordResetRequestPageComponent {}
