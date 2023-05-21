import { Component, EventEmitter, Output } from '@angular/core';

import { ZenPasswordResetConfirmationFormComponent } from '../zen-password-reset-confirmation-form/zen-password-reset-confirmation-form.component';

@Component({
  selector: 'zen-password-reset-confirmation',
  templateUrl: 'zen-password-reset-confirmation.component.html',
  standalone: true,
  imports: [ZenPasswordResetConfirmationFormComponent],
})
export class ZenPasswordResetConfirmationComponent {
  @Output() confirmed = new EventEmitter<never>();
}
