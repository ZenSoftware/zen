import { Logger, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { User } from '@prisma/client';
import { Server, Socket } from 'socket.io';

import { environment } from '../../environments/environment';
import { AuthService, RequestUser } from '../auth';
import { PrismaService } from '../prisma';
import { AllExceptionsFilter } from './all-exceptions.filter';

@WebSocketGateway(environment.socketio.port, {
  cors: environment.cors,
})
export class ZenGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('ZenGateway');
  clientIdToUserMap = new Map<string, Partial<User>>();
  userIdToClientsMap = new Map<User['id'], Socket[]>();

  constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

  @SubscribeMessage('msgToServer')
  @UseFilters(new AllExceptionsFilter())
  handleMessage(client: Socket, payload: unknown): void {
    const user = this.clientIdToUserMap.get(client.id);
    this.logger.log(`msgToServer by ${user?.username}`, payload);
    this.emitToUser(user.id, 'msgToClient', payload); // Echo to all connected devices of user
  }

  /**
   * @description Emit to all connected devices for a given user
   */
  emitToUser(userId: User['id'], eventName: string, ...args: any[]) {
    const userClients = this.userIdToClientsMap.get(userId);
    userClients.map(client => client.emit(eventName, args));
  }

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    const user = this.clientIdToUserMap.get(client.id);
    const clients = this.userIdToClientsMap.get(user.id);
    const remainingClients = clients.filter(c => c !== client);

    if (remainingClients.length === 0) this.userIdToClientsMap.delete(user.id);
    else this.userIdToClientsMap.set(user.id, remainingClients);

    this.clientIdToUserMap.delete(client.id);

    this.logger.log(
      `Disconnected ${user.username} with ${remainingClients.length} connected devices remaining`
    );
  }

  async handleConnection(client: Socket, ...args: any[]) {
    let requestUser: RequestUser;

    try {
      const token = client.handshake.headers.authorization?.substring(7);
      requestUser = this.auth.authorizeJwt(token);
      if (!requestUser) {
        client.disconnect();
        return;
      }
    } catch (error) {
      this.logger.error('Authorization failed', error);
      client.disconnect();
      return;
    }

    const user = await this.prisma.user.findFirst({
      where: { id: requestUser.id },
      select: {
        id: true,
        roles: true,
        username: true,
      },
    });

    this.clientIdToUserMap.set(client.id, user);

    const userClients = this.userIdToClientsMap.get(user.id);
    if (!userClients || userClients.length === 0) {
      this.userIdToClientsMap.set(user.id, [client]); // Initialize map
    } else {
      userClients.push(client);
    }

    this.logger.log(`Connected ${user?.username} with client id ${client.id}`);
  }
}
