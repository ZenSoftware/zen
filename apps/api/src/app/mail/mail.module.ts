import path from 'path';

import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '../config';
import { JwtModule } from '../jwt';
import { MailService } from './mail.service';

@Module({
  imports: [
    JwtModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        ...config.mail,

        template: {
          dir: path.join(__dirname, 'mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
