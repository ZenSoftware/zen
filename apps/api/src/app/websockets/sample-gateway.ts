import { SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { AuthService } from '../auth';
import { BaseGateway } from './base-gateway';

export class SampleGateway extends BaseGateway {
  constructor(auth: AuthService) {
    super(auth);
  }

  @SubscribeMessage('msgToServer')
  msgToServer(client: Socket, payload: unknown): void {
    const user = this.getUserByClientId(client.id);
    this.broadcastToUser(user, 'msgToClient', payload);
  }
}
