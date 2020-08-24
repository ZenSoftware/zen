import { Module } from '@nestjs/common';

import { ConfigModule } from './config';
import { ToolsController } from './controllers';
// import { AuthModule } from './auth';
import { ZenGraphQLModule } from './graphql';
import { JwtModule } from './jwt';

@Module({
  imports: [ConfigModule, JwtModule, ZenGraphQLModule],
  controllers: [ToolsController],
})
export class AppModule {}
