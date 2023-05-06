import { Component, EventEmitter, Output } from '@angular/core';

import { ZenLoginFormComponent } from '../zen-login-form/zen-login-form.component';

@Component({
  selector: 'zen-login',
  templateUrl: 'zen-login.component.html',
  standalone: true,
  imports: [ZenLoginFormComponent],
})
export class ZenLoginComponent {
  @Output() loggedIn = new EventEmitter<never>();
}
