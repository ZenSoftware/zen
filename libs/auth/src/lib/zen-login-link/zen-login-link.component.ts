import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, filter, map } from 'rxjs';

import { AuthService } from '../auth.service';
import { IfLoggedInDirective } from '../directives/if-logged-in.directive';

@Component({
  selector: 'zen-login-link',
  templateUrl: 'zen-login-link.component.html',
  standalone: true,
  imports: [AsyncPipe, IfLoggedInDirective, RouterLink, TranslateModule],
})
export class ZenLoginLinkComponent {
  @Input() displayLogout = true;
  displayLogin$: Observable<boolean>;

  constructor(
    public auth: AuthService,
    router: Router
  ) {
    // only show the login link if not on the login page
    this.displayLogin$ = router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url.split('?')[0] !== '/login')
    );
  }
}
