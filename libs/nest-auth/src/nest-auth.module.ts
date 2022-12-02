import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [PassportModule],
})
export class NestAuthModule {
  static register(options) {
    return {
      module: NestAuthModule,
      providers: [
        {
          provide: 'CASL_FACTORY',
          useValue: options.caslAbilityFactory,
        },
      ],
    };
  }
}
