import { Component } from '@angular/core';
import { Environment } from '@zen/common';

@Component({
  selector: 'zen-logo',
  templateUrl: './zen-logo.component.html',
})
export class ZenLogoComponent {
  constructor(public env: Environment) {}
}
