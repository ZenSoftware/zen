import { Module } from '@nestjs/common';
import { ThrottlerModule } from 'nestjs-throttler';

import { ZenAuthModule } from './auth';
import { ConfigModule } from './config';
import { ToolsController } from './controllers';
import { ZenGraphQLModule } from './graphql';
import { JwtModule } from './jwt';
import { PrismaModule } from './prisma';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 10,
      ttl: 60,
    }),
    ZenAuthModule,
    ConfigModule,
    JwtModule,
    ZenGraphQLModule,
    PrismaModule,
  ],
  controllers: [ToolsController],
})
export class AppModule {}
