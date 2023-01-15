import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import type { ICaslFactory } from './casl/casl-factory.interface';
import { CASL_FACTORY_TOKEN } from './casl/casl-factory.token';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [PassportModule],
})
export class NestAuthModule {
  /**
   * @param caslFactory Class that implements ICaslFactory
   */
  static register(caslFactory: Type<ICaslFactory>): DynamicModule {
    const providers: Provider[] = [
      {
        provide: CASL_FACTORY_TOKEN,
        useClass: caslFactory,
      },
    ];

    return {
      module: NestAuthModule,
      providers: providers,
      exports: providers,
    };
  }
}
