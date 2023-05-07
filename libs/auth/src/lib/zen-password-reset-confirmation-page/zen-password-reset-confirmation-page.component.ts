import { Component } from '@angular/core';

import { ZenPasswordResetConfirmationComponent } from '../zen-password-reset-confirmation/zen-password-reset-confirmation.component';

@Component({
  selector: 'zen-password-reset-confirmation-page',
  templateUrl: 'zen-password-reset-confirmation-page.component.html',
  standalone: true,
  imports: [ZenPasswordResetConfirmationComponent],
})
export class ZenPasswordResetConfirmationPageComponent {}
