import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'zen-portal',
  templateUrl: 'zen-portal-main.component.html',
  standalone: true,
  imports: [RouterOutlet],
})
export class ZenPortalMainComponent {}
