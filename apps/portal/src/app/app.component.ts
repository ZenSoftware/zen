import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthService, IfLoggedInDirective, RolesDirective, ZenLoginLinkComponent } from '@zen/auth';
import { ZenLayoutComponent } from '@zen/layout';

@Component({
  standalone: true,
  imports: [
    IfLoggedInDirective,
    MatListModule,
    RolesDirective,
    RouterModule,
    ZenLayoutComponent,
    ZenLoginLinkComponent,
  ],
  selector: 'zen-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
