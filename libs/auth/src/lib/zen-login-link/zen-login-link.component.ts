import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

import { AuthService } from '../auth.service';
import { IfLoggedInDirective } from '../directives/if-logged-in.directive';

@Component({
  selector: 'zen-login-link',
  templateUrl: 'zen-login-link.component.html',
  standalone: true,
  imports: [NgIf, IfLoggedInDirective, RouterLink, AsyncPipe],
})
export class ZenLoginLinkComponent {
  @Input() displayLogout = true;
  displayLogin$: Observable<boolean>;

  constructor(public auth: AuthService, router: Router) {
    this.displayLogin$ = router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url.split('?')[0] !== '/login')
    );
  }
}
