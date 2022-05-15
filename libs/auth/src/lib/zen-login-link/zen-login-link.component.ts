import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-login-link',
  templateUrl: 'zen-login-link.component.html',
})
export class ZenLoginLinkComponent {
  @Input() displayLogout = true;
  displayLogin$: Observable<boolean>;

  constructor(public auth: AuthService, private router: Router) {
    this.displayLogin$ = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        if (event.url === '/login') return false;
        return true;
      })
    );
  }
}
