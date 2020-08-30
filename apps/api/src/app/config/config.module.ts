import { Global, Module } from '@nestjs/common';

import { environment } from '../../environments/environment';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [{ provide: ConfigService, useValue: environment }],
  exports: [ConfigService],
})
export class ConfigModule {}
