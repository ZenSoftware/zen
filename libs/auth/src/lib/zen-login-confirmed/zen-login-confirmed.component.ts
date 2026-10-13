import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '@zen/common';
import { ZenSnackbarError, ZenSnackbarModule } from '@zen/components';
import { AuthExchangeTokenGQL } from '@zen/graphql';

import { AuthService } from '../auth.service';
import { token } from '../token.signal';

/**
 * OIDC providers will redirect to this component after a successful login.
 * A JWT is provided in the query string, which is exchanged for a session.
 */
@Component({
  selector: 'zen-login-confirmed',
  template: ``,
  standalone: true,
  imports: [ZenSnackbarModule],
})
export class ZenLoginConfirmedComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private env = inject(Environment);
  private auth = inject(AuthService);
  private snackbarError = inject(ZenSnackbarError);
  private authExchangeTokenGQL = inject(AuthExchangeTokenGQL);

  constructor() {
    const query = this.route.snapshot.queryParams;
    const queryToken = decodeURIComponent(query['token']);
    token.set(queryToken);

    this.authExchangeTokenGQL
      .fetch({
        variables: {
          data: { rememberMe: true },
        },
        fetchPolicy: 'no-cache',
      })
      .subscribe({
        next: ({ data }) => {
          if (data) {
            this.auth.setSession(data.authExchangeToken);
            this.router.navigateByUrl(this.env.url.loginRedirect);
          }
        },
        error: e => {
          this.snackbarError.open(e);
          this.auth.logout();
        },
      });
  }
}
