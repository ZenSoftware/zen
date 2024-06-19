import { MailerOptions } from '@nestjs-modules/mailer';
import { NestApplicationOptions } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { UploadOptions } from 'graphql-upload/graphqlUploadExpress.js';
import { HelmetOptions } from 'helmet';
import { StrategyOptions as GoogleStrategyOptions } from 'passport-google-oauth20';

export abstract class EnvironmentBase {
  readonly siteUrl: string;
  readonly production: boolean;
  readonly expressPort: string | number;
  readonly cors?: NestApplicationOptions['cors'];
  readonly helmet?: boolean | HelmetOptions;
  readonly graphql: {
    readonly subscriptions?: boolean;
    readonly sandbox?: boolean;
    readonly introspection?: boolean;
    readonly csrfPrevention?: boolean;
    readonly uploads?: UploadOptions;
  };
  readonly publicRegistration: boolean;
  readonly jwtOptions: JwtModuleOptions;
  readonly expiresInRememberMe: number;
  readonly mail: Omit<MailerOptions, 'template'>;
  readonly throttle: ThrottlerModuleOptions;
  /** We are utilizing [hash-wasm](https://github.com/Daninet/hash-wasm) for our implementation of bcrypt */
  readonly bcrypt?: {
    /** @default 12 */
    costFactor?: number;
    /**
     * In bytes (there are 8 bits in a byte)
     * @default 16 (128 bits)
     **/
    saltSize?: number;
  };
  readonly oauth?: {
    loginConfirmedURL: string;
    google?: GoogleStrategyOptions;
  };
  readonly openTelemetry?:
    | false
    | {
        serviceName: string;
        exporters: {
          trace?: ConstructorParameters<typeof OTLPTraceExporter>[0];
          traceConsole?: boolean;
          meter?: ConstructorParameters<typeof OTLPMetricExporter>[0];
          meterConsole?: boolean;
        };
      };
}
