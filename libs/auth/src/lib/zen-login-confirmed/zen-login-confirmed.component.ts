import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '@zen/common';
import { ZenSnackbarErrorService } from '@zen/components';

import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-login-confirmed',
  template: ``,
})
export class ZenLoginConfirmedComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private env: Environment,
    private auth: AuthService,
    private zenSnackbarError: ZenSnackbarErrorService
  ) {}

  ngOnInit(): void {
    const query = this.route.snapshot.queryParams;

    try {
      this.auth.setSession({
        id: parseInt(query['id']),
        expiresIn: parseInt(query['expiresIn']),
        rememberMe: query['rememberMe'] === 'true' ? true : false,
        roles: query['roles'] ? query['roles'].split(',') : [],
        token: decodeURIComponent(query['token']),
      });

      this.router.navigate([this.env.url.loginRedirect], { replaceUrl: true });
    } catch (error) {
      this.zenSnackbarError.open({ message: 'Failed to login', error });
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }
}
