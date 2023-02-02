import { Logger } from '@nestjs/common';
import { SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { AuthService } from '../auth';
import { BaseGateway } from './base-gateway';

const logger = new Logger('SocketIO');

export class SampleGateway extends BaseGateway {
  constructor(auth: AuthService) {
    super(auth);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: unknown): void {
    const user = this.clientIdToUserMap.get(client.id);
    if (user) {
      logger.log(`msgToServer by ${user.id}`, payload);
      // Echo to all connected devices for the user
      this.broadcastToUser(user.id, 'msgToClient', payload);
    }
  }
}
