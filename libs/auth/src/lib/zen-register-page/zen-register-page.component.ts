import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'zen-register-pagee',
  templateUrl: 'zen-register-page.component.html',
})
export class ZenRegisterPageComponent {
  constructor(private router: Router) {}

  onRegisterd() {
    this.router.navigateByUrl('/');
  }
}
