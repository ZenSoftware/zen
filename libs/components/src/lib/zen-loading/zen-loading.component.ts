import { Component, Input } from '@angular/core';

@Component({
  selector: 'zen-loading',
  templateUrl: 'zen-loading.component.html',
  styleUrls: ['zen-loading.component.scss'],
})
export class ZenLoadingComponent {
  @Input() backdrop = true;
}
