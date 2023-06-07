import { Component } from '@angular/core';

import { ZenFabricComponent } from '../zen-fabric';

@Component({
  selector: 'zen-dashboard',
  templateUrl: 'zen-dashboard.component.html',
  standalone: true,
  imports: [ZenFabricComponent],
})
export class ZenDashboardComponent {}
