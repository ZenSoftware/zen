import { ISendMailOptions, MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { ConfigService } from '../config';
import { JwtService } from '../jwt';
import { GeneralContext, PasswordResetContext } from './templates';

type MailOptions = ISendMailOptions & { template?: string };

@Injectable()
export class MailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}
  //--------------------------------------------------------------------------
  send(options: MailOptions) {
    return this.mailer.sendMail(options);
  }
  //--------------------------------------------------------------------------
  sendGeneral(options: { to: string; subject: string; context: GeneralContext }) {
    return this.send({
      template: 'general',
      to: options.to,
      subject: options.subject,
      context: options.context,
    }).then();
  }
  //--------------------------------------------------------------------------
  sendPasswordReset(user: User) {
    const token = this.jwtService.sign({ username: user.username }, { expiresIn: '1d' });

    const context: PasswordResetContext = {
      siteUrl: this.config.siteUrl,
      resetUrl: `${this.config.siteUrl}/#/password-reset-confirmation?token=${encodeURI(token)}`,
    };

    return this.send({
      template: 'password-reset',
      to: user.email,
      subject: `Password Reset Request`,
      context,
    }).then();
  }
}
