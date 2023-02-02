import { SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { BaseGateway } from './base-gateway';

export class SampleGateway extends BaseGateway {
  @SubscribeMessage('msgToServer')
  msgToServer(client: Socket, payload: unknown): void {
    const user = this.getUserByClientId(client.id);
    this.broadcastToUser(user, 'msgToClient', payload);
  }
}
