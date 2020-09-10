import { ISendMailOptions, MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '../config';
import { JwtService } from '../jwt';
import { PasswordResetContext } from './templates';

type MailTemplate = 'verify-email' | 'password-reset';

type MailOptions = ISendMailOptions & { template?: MailTemplate };

@Injectable()
export class MailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  send(options: MailOptions) {
    return this.mailer.sendMail(options);
  }

  sendPasswordReset(to: string) {
    const token = this.jwtService.sign({ email: to }, { expiresIn: '1d' });

    const context: PasswordResetContext = {
      resetUrl: 'https://zensoftware.ca/#/password-reset-confirmation?token=' + encodeURI(token),
    };

    this.send({
      template: 'password-reset',
      to,
      subject: `${this.config.smtp.fromName} Password Reset`,
      context,
    }).then();
  }
}
