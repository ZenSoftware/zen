import { Component, EventEmitter, Output } from '@angular/core';

import { verticalAccordion } from '../animations';

@Component({
  selector: 'zen-password-reset-request',
  templateUrl: './zen-password-reset-request.component.html',
  animations: [...verticalAccordion],
})
export class ZenPasswordResetRequestComponent {
  @Output() sent = new EventEmitter();
}
