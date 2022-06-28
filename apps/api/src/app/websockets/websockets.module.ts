import { Module } from '@nestjs/common';

import { ZenAuthModule } from '../auth';
import { PrismaModule } from '../prisma';
import { ZenGateway } from './zen-gateway';

@Module({
  imports: [PrismaModule, ZenAuthModule],
  providers: [ZenGateway],
})
export class WebsocketsModule {}
