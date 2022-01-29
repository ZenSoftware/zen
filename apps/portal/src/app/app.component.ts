import { Component } from '@angular/core';
import { AuthService } from '@zen/auth';

@Component({
  selector: 'zen-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
