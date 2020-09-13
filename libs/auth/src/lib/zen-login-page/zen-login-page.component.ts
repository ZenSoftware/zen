import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'zen-login-page',
  templateUrl: 'zen-login-page.component.html',
})
export class ZenLoginPageComponent {
  @Output() loggedIn = new EventEmitter();
}
