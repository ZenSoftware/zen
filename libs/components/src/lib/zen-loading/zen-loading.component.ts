import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'zen-loading',
  templateUrl: 'zen-loading.component.html',
  styleUrl: 'zen-loading.component.scss',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgClass],
})
export class ZenLoadingComponent {
  @Input() backdrop = true;
}
