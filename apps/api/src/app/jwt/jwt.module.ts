import { Global, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { environment } from '../../environments/environment';

@Global()
@Module({
  imports: [NestJwtModule.register(environment.jwtOptions)],
  exports: [NestJwtModule],
})
export class JwtModule {}
