import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'zen-loading',
  templateUrl: 'zen-loading.component.html',
  styleUrls: ['zen-loading.component.scss'],
  standalone: true,
  imports: [NgClass, MatProgressSpinnerModule],
})
export class ZenLoadingComponent {
  @Input() backdrop = true;
}
