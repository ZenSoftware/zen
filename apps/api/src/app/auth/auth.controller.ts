import { URLSearchParams } from 'url';

import { Controller, Get, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, RequestUser } from '@zen/nest-auth';
import { Response } from 'express';

import { ConfigService } from '../config';
import { AuthService } from './auth.service';
import { EmailTakenExceptionFilter } from './strategies/email-taken-exception.filter';

@Controller('auth')
@UseFilters(EmailTakenExceptionFilter)
export class AuthController {
  constructor(private readonly auth: AuthService, private readonly config: ConfigService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Guard redirects
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@CurrentUser() user: RequestUser, @Res() res: Response) {
    const url = await this.getLoginConfirmedURL(user);
    res.redirect(url);
  }

  async getLoginConfirmedURL(user: RequestUser) {
    const authSession = await this.auth.getAuthSession(user, false);
    const token = encodeURIComponent(authSession.token);
    const queryParams = new URLSearchParams({ token });
    return this.config.oauth!.loginConfirmedURL + '?' + queryParams;
  }
}
