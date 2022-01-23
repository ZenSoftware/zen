import { MailerOptions } from '@nest-modules/mailer';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { UploadOptions } from 'graphql-upload';

export class EnvironmentBase {
  readonly siteUrl: string;
  readonly production: boolean;
  readonly expressPort: string | number;
  readonly cors?: any | boolean;
  readonly graphql: {
    readonly sandbox: boolean; // http://localhost:7080/graphql
    readonly trace?: boolean;
    readonly introspection: boolean;
    readonly uploads?: UploadOptions;
  };
  readonly publicRegistration: boolean;
  readonly jwtOptions: JwtModuleOptions;
  readonly expiresInRememberMe: number;
  readonly mail: Omit<MailerOptions, 'template'>;
  readonly throttle: ThrottlerModuleOptions;
}
