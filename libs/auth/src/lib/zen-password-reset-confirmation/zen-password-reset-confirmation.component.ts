import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'zen-password-reset-confirmation',
  templateUrl: 'zen-password-reset-confirmation.component.html',
})
export class ZenPasswordResetConfirmationComponent {
  @Output() confirmed = new EventEmitter<never>();
}
