import { URLSearchParams } from 'url';

import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { AuthService, HttpUser, RequestUser } from '../auth';
import { ConfigService } from '../config';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService, private readonly config: ConfigService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Guard redirects
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@HttpUser() user, @Res() res: Response) {
    res.redirect(this.getLoginConfirmedURL(user));
  }

  getLoginConfirmedURL(user: RequestUser) {
    const authSession = this.auth.getAuthSession(user, true);
    authSession.token = encodeURIComponent(authSession.token);
    const queryParams = new URLSearchParams(Object.entries(authSession));
    return this.config.oauth.loginConfirmedURL + '?' + queryParams;
  }
}
