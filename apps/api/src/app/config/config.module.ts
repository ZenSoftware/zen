import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { environment } from '../../environments/environment';

@Global()
@Module({
  providers: [{ provide: ConfigService, useValue: environment }],
  exports: [ConfigService],
})
export class ConfigModule {}
