import { Module } from '@nestjs/common';

import { ZenAuthModule } from '../auth';
import { PrismaModule } from '../prisma';
import { SampleGateway } from './sample-gateway';

@Module({
  imports: [PrismaModule, ZenAuthModule],
  providers: [SampleGateway],
})
export class WebsocketsModule {}
