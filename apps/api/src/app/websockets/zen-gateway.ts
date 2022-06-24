/**
 * https://gabrieltanner.org/blog/nestjs-realtime-chat/
 */
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { environment } from '../../environments/environment';

@WebSocketGateway(environment.socketioPort, {
  /** @todo verify cors */
  cors: environment.cors,
  // transports: ['websocket'],
})
export class ZenGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ZenGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log('Recieved emit', payload);
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    /** @todo Needs guard auth flow here */
    console.log('HEADERS:', client.handshake.headers.authorization);
    this.logger.log(`Client connected: ${client.id}`);
    this.logger.log(`Client query:`, client.handshake.query);
  }
}
