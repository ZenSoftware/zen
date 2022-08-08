import { MailerOptions } from '@nestjs-modules/mailer';
import { NestApplicationOptions } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { OTLPExporterNodeConfigBase } from '@opentelemetry/otlp-exporter-base';
import { UploadOptions } from 'graphql-upload';
import { StrategyOptions as GoogleStrategyOptions } from 'passport-google-oauth20';

export class EnvironmentBase {
  readonly siteUrl: string;
  readonly production: boolean;
  readonly expressPort: string | number;
  readonly cors?: NestApplicationOptions['cors'];
  readonly graphql: {
    readonly sandbox: boolean; // http://localhost:7080/graphql
    readonly trace?: boolean;
    readonly introspection: boolean;
    readonly uploads?: UploadOptions;
    readonly csrfPrevention?: boolean;
  };
  readonly publicRegistration: boolean;
  readonly jwtOptions: JwtModuleOptions;
  readonly expiresInRememberMe: number;
  readonly mail: Omit<MailerOptions, 'template'>;
  readonly throttle: ThrottlerModuleOptions;
  readonly oauth?: {
    loginConfirmedURL: string;
    google?: GoogleStrategyOptions;
  };
  readonly openTelemetry?:
    | false
    | {
        serviceName: string;
        exporters: {
          enableConsole?: boolean;
          enableJaeger?: boolean;
          enableOtlp?: boolean;
        };
        collectorOptions?: OTLPExporterNodeConfigBase;
      };
}
