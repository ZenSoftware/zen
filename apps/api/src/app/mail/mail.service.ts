import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '../config';
import { JwtService } from '../jwt';
import { User } from '../prisma';
import { GeneralContext, PasswordResetContext } from './contexts';

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
    Logger.log(`Sent ${options.template} email to ${options.to}`);
    return this.mailer.sendMail(options).catch(e => Logger.error(e, options));
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
    const token = this.jwtService.sign({ sub: user.id, aud: user.email }, { expiresIn: '1d' });

    const context: PasswordResetContext = {
      siteUrl: this.config.siteUrl,
      resetUrl: `${this.config.siteUrl}/password-reset-confirmation?token=${encodeURI(token)}`,
    };

    return this.send({
      template: 'password-reset',
      to: user.email,
      subject: `Password Reset Request`,
      context,
    }).then();
  }
}
