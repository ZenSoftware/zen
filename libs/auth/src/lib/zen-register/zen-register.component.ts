import { Component, EventEmitter, Output } from '@angular/core';

import { verticalAccordion } from '../animations';

@Component({
  selector: 'zen-register',
  templateUrl: 'zen-register.component.html',
  animations: [...verticalAccordion],
})
export class ZenRegisterComponent {
  @Output() registered = new EventEmitter();

  onRegisterd() {
    this.registered.emit();
  }
}
