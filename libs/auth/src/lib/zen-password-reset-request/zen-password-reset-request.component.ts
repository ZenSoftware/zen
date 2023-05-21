import { Component, EventEmitter, Output } from '@angular/core';

import { verticalAccordion } from '../animations';
import { ZenPasswordResetRequestFormComponent } from '../zen-password-reset-request-form/zen-password-reset-request-form.component';

@Component({
  selector: 'zen-password-reset-request',
  templateUrl: './zen-password-reset-request.component.html',
  animations: [...verticalAccordion],
  standalone: true,
  imports: [ZenPasswordResetRequestFormComponent],
})
export class ZenPasswordResetRequestComponent {
  @Output() sent = new EventEmitter<never>();
}
