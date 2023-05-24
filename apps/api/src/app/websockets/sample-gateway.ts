import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { environment } from '../../environments/environment';
import { BaseGateway } from './base-gateway';

@WebSocketGateway(environment.socketio.port, {
  namespace: 'sample',
  cors: environment.cors,
})
export class SampleGateway extends BaseGateway {
  logger = new Logger('SampleGateway');

  @SubscribeMessage('msgToServer')
  msgToServer(client: Socket, payload: unknown): void {
    const user = this.getUserByClientId(client.id);
    this.broadcastToUser(user, 'msgToClient', payload);
  }
}
