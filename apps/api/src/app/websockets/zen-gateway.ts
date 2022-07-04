/**
 * https://gabrieltanner.org/blog/nestjs-realtime-chat/
 */
import { HttpException, Logger, UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
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
  /**
   * key: client.id
   * value: User
   */
  clientIdToUserMap = new Map<string, Partial<User>>();

  /**
   * key: user.id
   * value: array of clients user is currently connected with
   */
  userIdToClientsMap = new Map<User['id'], Socket[] | undefined>();

  constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ZenGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    const user = this.clientIdToUserMap.get(client.id);
    this.logger.log(`Recieved emit from ${user?.username}:`, payload);
    this.emitToUser(user.id, 'msgToClient', payload); // Echo to all devices user is connected with
  }

  /**
   * @description Emit to all devices user is connected with.
   */
  emitToUser(userId: User['id'], eventName: string, ...args: any[]) {
    const userClients = this.userIdToClientsMap.get(userId);
    for (const userClient of userClients) {
      userClient.emit(eventName, args);
    }
  }

  afterInit(server: Server) {
    this.logger.log('ZenGateway initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);

    const user = this.clientIdToUserMap.get(client.id);
    const clients = this.userIdToClientsMap.get(user.id);
    const withoutClient = clients.filter(c => c !== client);

    console.log('Client disconnecting.  User client count:', clients.length);
    console.log('New client count:', withoutClient.length);

    if (withoutClient.length === 0) this.userIdToClientsMap.delete(user.id);
    else this.userIdToClientsMap.set(user.id, withoutClient);

    this.clientIdToUserMap.delete(client.id);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authorization?.substring(7);

    let requestUser: RequestUser;
    try {
      requestUser = this.auth.authorizeJwt(token);
      if (!requestUser) return; // new UnauthorizedException();
    } catch (error) {
      Logger.error('ZenGateway authorization failed', error);
      return; // new UnauthorizedException('Unauthorized connection to Socket.IO');
    }

    const user = await this.prisma.user.findFirst({
      where: { id: requestUser.id },
      select: {
        id: true,
        roles: true,
        username: true,
      },
    });

    // if (!user.roles.includes('Super')) {
    //   Logger.error('User is not super');
    //   return;
    // }

    this.clientIdToUserMap.set(client.id, user);

    const userClients = this.userIdToClientsMap.get(user.id);
    if (!userClients || userClients.length === 0) {
      this.userIdToClientsMap.set(user.id, [client]); // Initialize map
    } else {
      userClients.push(client);
    }

    this.logger.log(`User connected ${user?.username}`);
    this.logger.log(`Client ID: ${client.id}`);
  }
}
