import { Module } from '@nestjs/common';

import { ZenGateway } from './zen-gateway';

@Module({ providers: [ZenGateway] })
export class WebsocketsModule {}
