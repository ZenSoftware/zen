import { Component, EventEmitter, Output } from '@angular/core';
import { AuthSession } from '@zen/graphql';

import { verticalAccordion } from '../animations';
import { ZenRegisterFormComponent } from '../zen-register-form/zen-register-form.component';

@Component({
  selector: 'zen-register',
  templateUrl: 'zen-register.component.html',
  animations: [...verticalAccordion],
  standalone: true,
  imports: [ZenRegisterFormComponent],
})
export class ZenRegisterComponent {
  @Output() registered = new EventEmitter<AuthSession>();
}
