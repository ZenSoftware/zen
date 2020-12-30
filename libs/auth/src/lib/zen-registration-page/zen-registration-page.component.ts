import { Component } from '@angular/core';

@Component({
  selector: 'zen-registration-pagee',
  templateUrl: 'zen-registration-page.component.html',
})
export class ZenRegistrationPageComponent {
  constructor() {}

  onRegisterd() {
    console.log('Registered');
  }
}
