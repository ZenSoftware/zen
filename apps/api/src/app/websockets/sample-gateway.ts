import { Logger } from '@nestjs/common';
import { SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { BaseGateway } from './base-gateway';

export class SampleGateway extends BaseGateway {
  logger = new Logger('SampleGateway');

  @SubscribeMessage('msgToServer')
  msgToServer(client: Socket, payload: unknown): void {
    const user = this.getUserByClientId(client.id);
    this.broadcastToUser(user, 'msgToClient', payload);
  }
}
