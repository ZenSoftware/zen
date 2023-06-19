import { Component } from '@angular/core';

import { ZenBabylonComponent } from '../zen-babylon';
import { ZenFabricComponent } from '../zen-fabric';

@Component({
  selector: 'zen-dashboard',
  templateUrl: 'zen-dashboard.component.html',
  standalone: true,
  imports: [ZenFabricComponent, ZenBabylonComponent],
})
export class ZenDashboardComponent {}
