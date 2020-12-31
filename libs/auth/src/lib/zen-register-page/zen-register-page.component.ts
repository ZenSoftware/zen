import { Component } from '@angular/core';

@Component({
  selector: 'zen-register-pagee',
  templateUrl: 'zen-register-page.component.html',
})
export class ZenRegisterPageComponent {
  constructor() {}

  onRegisterd() {
    console.log('Registered');
  }
}
