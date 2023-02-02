import { Logger, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { RequestUser } from '@zen/nest-auth';
import { Server, Socket } from 'socket.io';

import { environment } from '../../environments/environment';
import { AppAbility, AuthService } from '../auth';
import { PrismaService, User } from '../prisma';
import { AllExceptionsFilter } from './all-exceptions.filter';

type UserWithAbility = Partial<User> & { ability: AppAbility };

@WebSocketGateway(environment.socketio.port, {
  cors: environment.cors,
})
export class ZenGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('ZenGateway');
  clientIdToUserMap = new Map<string, UserWithAbility>();
  userIdToClientsMap = new Map<User['id'], Socket[]>();

  constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

  @SubscribeMessage('msgToServer')
  @UseFilters(new AllExceptionsFilter())
  handleMessage(client: Socket, payload: unknown): void {
    const user = this.clientIdToUserMap.get(client.id);
    if (user) {
      this.logger.log(`msgToServer by ${user?.username}`, payload);
      // Echo to all connected devices of user
      this.broadcastToUser(user.id as User['id'], 'msgToClient', payload);
    }
  }

  /**
   * Emit to all connected devices for a given user
   */
  broadcastToUser(userId: User['id'], eventName: string, ...args: any[]) {
    const userClients = this.userIdToClientsMap.get(userId);
    if (userClients) {
      for (const client of userClients) {
        client.emit(eventName, args);
      }
    }
  }

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    const user = this.clientIdToUserMap.get(client.id);

    if (user) {
      const clients = this.userIdToClientsMap.get(user.id as User['id']);

      if (clients) {
        const remainingClients = clients.filter(c => c !== client);

        if (remainingClients.length === 0) this.userIdToClientsMap.delete(user.id as User['id']);
        else this.userIdToClientsMap.set(user.id as User['id'], remainingClients);

        this.clientIdToUserMap.delete(client.id);

        this.logger.log(
          `Disconnected ${user.username} with ${remainingClients.length} connected devices remaining`
        );
      }
    }
  }

  async handleConnection(client: Socket, ...args: any[]) {
    let requestUser: RequestUser | null;

    try {
      const token = client.handshake.headers.authorization?.substring(7);
      if (!token) throw new WsException('No authorization token provided');

      requestUser = await this.auth.authorizeJwt(token);
      if (!requestUser) throw new WsException('JWT failed to authorize');

      const user = (await this.prisma.user.findUnique({
        where: { id: requestUser.id },
        select: {
          id: true,
          roles: true,
          username: true,
        },
      })) as UserWithAbility;

      user.ability = await this.auth.createAbility(requestUser);

      if (!user) throw new WsException('User not found');
      this.clientIdToUserMap.set(client.id, user);

      const userClients = this.userIdToClientsMap.get(user.id as User['id']);
      if (!userClients || userClients.length === 0) {
        // Initialize user's client list
        this.userIdToClientsMap.set(user.id as User['id'], [client]);
      } else {
        userClients.push(client);
      }

      this.logger.log(`Connected ${user?.username} with client id ${client.id}`);
    } catch (error) {
      this.logger.error('Authorization failed', error);
      client.disconnect();
      return;
    }
  }
}
