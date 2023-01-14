import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CASL_FACTORY_TOKEN } from './casl/casl-factory.token';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [PassportModule],
})
export class NestAuthModule {
  /**
   * @param caslFactory Class that implements ICaslFactory
   */
  static register(caslFactory: Type<any>): DynamicModule {
    const providers: Provider[] = [
      {
        provide: CASL_FACTORY_TOKEN,
        useClass: caslFactory,
      },
    ];

    return {
      global: true,
      module: NestAuthModule,
      providers: providers,
      exports: providers,
    };
  }
}
