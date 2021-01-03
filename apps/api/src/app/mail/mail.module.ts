import path from 'path';

import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';

import { environment } from '../../environments/environment';
import { JwtModule } from '../jwt';
import { MailService } from './mail.service';

@Module({
  imports: [
    JwtModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: `smtps://${environment.smtp.login}:${environment.smtp.password}@${environment.smtp.server}`,
        defaults: {
          from: `"${environment.smtp.fromName}" <${environment.smtp.fromEmail}>`,
        },
        template: {
          dir: path.join(__dirname, 'mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
