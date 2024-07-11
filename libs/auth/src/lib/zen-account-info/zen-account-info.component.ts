import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-account-info',
  templateUrl: 'zen-account-info.component.html',
  standalone: true,
  imports: [AsyncPipe, TranslateModule],
})
export class ZenAccountInfoComponent {
  constructor(public auth: AuthService) {}
}
