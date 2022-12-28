import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '@zen/common';
import { ZenSnackbarErrorService } from '@zen/components';
import { AuthExchangeTokenGQL, parseGqlErrors } from '@zen/graphql';
import { catchError } from 'rxjs';

import { AuthService } from '../auth.service';
import { tokenVar } from '../token-var';

@Component({
  selector: 'zen-login-confirmed',
  template: ``,
})
export class ZenLoginConfirmedComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private env: Environment,
    private auth: AuthService,
    private snackbarError: ZenSnackbarErrorService,
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
      .pipe(catchError(parseGqlErrors))
      .subscribe({
        next: ({ data: { authExchangeToken } }) => {
          this.auth.setSession(authExchangeToken);
          this.router.navigateByUrl(this.env.url.loginRedirect);
        },
        error: errors => {
          this.snackbarError.open(errors);
          this.auth.logout();
        },
      });
  }
}
