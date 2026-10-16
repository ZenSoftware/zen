import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-account-info',
  templateUrl: 'zen-account-info.component.html',
  standalone: true,
  imports: [AsyncPipe, TranslatePipe],
})
export class ZenAccountInfoComponent {
  public auth = inject(AuthService);
}
