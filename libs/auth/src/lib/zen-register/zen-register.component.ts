import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { verticalAccordion } from '@zen/components/animations';
import { AuthSession } from '@zen/graphql';

import { ZenRegisterFormComponent } from '../zen-register-form/zen-register-form.component';

@Component({
  selector: 'zen-register',
  templateUrl: 'zen-register.component.html',
  animations: [...verticalAccordion],
  standalone: true,
  imports: [TranslateModule, ZenRegisterFormComponent],
})
export class ZenRegisterComponent {
  @Output() registered = new EventEmitter<AuthSession>();
}
