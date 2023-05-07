import { Component, EventEmitter, Output } from '@angular/core';

import { ZenPasswordChangeFormComponent } from '../zen-password-change-form/zen-password-change-form.component';

@Component({
  selector: 'zen-password-change',
  templateUrl: 'zen-password-change.component.html',
  standalone: true,
  imports: [ZenPasswordChangeFormComponent],
})
export class ZenPasswordChangeComponent {
  @Output() changed = new EventEmitter<never>();
}
