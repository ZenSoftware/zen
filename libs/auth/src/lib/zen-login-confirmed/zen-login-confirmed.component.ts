import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '@zen/common';
import { ZenSnackbarError, ZenSnackbarModule } from '@zen/components';
import { AuthExchangeTokenGQL } from '@zen/graphql';

import { AuthService } from '../auth.service';
import { token } from '../token.signal';

/**
 * OIDC providers will redirect to this component after a successful login.
 */
@Component({
  selector: 'zen-login-confirmed',
  template: ``,
  standalone: true,
  imports: [ZenSnackbarModule],
})
export class ZenLoginConfirmedComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private env: Environment,
    private auth: AuthService,
    private snackbarError: ZenSnackbarError,
    private authExchangeTokenGQL: AuthExchangeTokenGQL
  ) {
    const query = this.route.snapshot.queryParams;
    const queryToken = decodeURIComponent(query['token']);
    token.set(queryToken);

    this.authExchangeTokenGQL
      .fetch(
        {
          data: { rememberMe: true },
        },
        {
          fetchPolicy: 'no-cache',
        }
      )
      .subscribe({
        next: ({ data: { authExchangeToken } }) => {
          this.auth.setSession(authExchangeToken);
          this.router.navigateByUrl(this.env.url.loginRedirect);
        },
        error: e => {
          this.snackbarError.open(e);
          this.auth.logout();
        },
      });
  }
}
