import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'zen-password-change',
  templateUrl: 'zen-password-change.component.html',
})
export class ZenPasswordChangeComponent {
  @Output() changed = new EventEmitter<never>();
}
