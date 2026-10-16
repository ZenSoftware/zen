import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../auth.service';
import { ZenPasswordChangeFormComponent } from '../zen-password-change-form/zen-password-change-form.component';

@Component({
  selector: 'zen-password-change',
  templateUrl: 'zen-password-change.component.html',
  standalone: true,
  imports: [AsyncPipe, TranslatePipe, ZenPasswordChangeFormComponent],
})
export class ZenPasswordChangeComponent {
  @Output() changed = new EventEmitter<never>();
  auth = inject(AuthService);
}
