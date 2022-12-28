import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'zen-login',
  templateUrl: 'zen-login.component.html',
})
export class ZenLoginComponent {
  @Output() loggedIn = new EventEmitter<never>();
}
