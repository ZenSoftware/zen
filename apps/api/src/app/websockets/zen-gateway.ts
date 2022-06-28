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
import { User } from '@prisma/client';
import { Server, Socket } from 'socket.io';

import { environment } from '../../environments/environment';
import { AuthService, RequestUser } from '../auth';
import { PrismaService } from '../prisma';

@WebSocketGateway(environment.socketioPort, {
  /** @todo verify cors */
  cors: environment.cors,
  // transports: ['websocket'],
})
export class ZenGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  userMap = new Map<string, Pick<User, 'id' | 'roles' | 'username'>>();

  constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ZenGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    const user = this.userMap.get(client.id);
    this.logger.log(`Recieved emit from ${user.username}:`, payload);

    /** @todo send message to all devices user is connected with */

    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('ZenGateway initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.userMap.delete(client.id);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authorization?.substring(7);
    const requestUser = this.auth.authorizeJwt(token);

    const user = await this.prisma.user.findFirst({
      where: { id: requestUser.id },
      select: {
        id: true,
        roles: true,
        username: true,
      },
    });

    this.userMap.set(client.id, user);

    this.logger.log(`User connected ${user.username}`);
    this.logger.log(`Client ID: ${client.id}`);
  }
}
