import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'zen-dashboard',
  templateUrl: 'zen-dashboard.component.html',
  standalone: true,
  imports: [TranslatePipe],
})
export class ZenDashboardComponent {}
