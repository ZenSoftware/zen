import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '@zen/common';
import { ZenSnackbarError } from '@zen/components';
import { AuthExchangeTokenGQL } from '@zen/graphql';

import { AuthService } from '../auth.service';
import { tokenVar } from '../token-var';

@Component({
  selector: 'zen-login-confirmed',
  template: ``,
  standalone: true,
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
    const token = decodeURIComponent(query['token']);
    tokenVar(token);

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
