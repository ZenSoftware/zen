import { Logger, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsException,
} from '@nestjs/websockets';
import { RequestUser } from '@zen/nest-auth';
import { Socket } from 'socket.io';

import { AppAbility, AuthService } from '../auth';
import { AllExceptionsFilter } from './all-exceptions.filter';

type UserWithAbility = RequestUser & { ability: AppAbility };

@UseFilters(new AllExceptionsFilter())
export class BaseGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  logger = new Logger('SocketIO');
  clientIdToUserMap = new Map<string, UserWithAbility>();
  userIdToClientsMap = new Map<RequestUser['id'], Socket[]>();

  constructor(public readonly auth: AuthService) {}

  /**
   * Emit to all connected devices for a given user
   */
  broadcastToUser(user: RequestUser, eventName: string, ...args: any[]) {
    const userClients = this.userIdToClientsMap.get(user.id);
    if (userClients) {
      for (const client of userClients) {
        client.emit(eventName, args);
      }
    }
  }

  getUserByClientId(clientId: string) {
    return this.clientIdToUserMap.get(clientId) as UserWithAbility;
  }

  getClientsByUserId(userId: RequestUser['id']) {
    return this.userIdToClientsMap.get(userId) as Socket[];
  }

  afterInit() {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    const user = this.clientIdToUserMap.get(client.id);

    if (user) {
      const clients = this.userIdToClientsMap.get(user.id);

      if (clients) {
        const remainingClients = clients.filter(c => c !== client);

        if (remainingClients.length === 0) this.userIdToClientsMap.delete(user.id);
        else this.userIdToClientsMap.set(user.id, remainingClients);

        this.clientIdToUserMap.delete(client.id);

        this.logger.log(
          `Disconnected ${user.id} with ${remainingClients.length} connected devices remaining`
        );
      }
    }
  }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization?.substring(7);
      if (!token) throw new WsException('No authorization token provided');

      const requestUser = await this.auth.authorizeJwt(token);
      if (!requestUser) throw new WsException('JWT failed to authorize');

      const ability = await this.auth.createAbility(requestUser);
      const user: UserWithAbility = {
        ...requestUser,
        ability,
      };

      if (!user) throw new WsException('User not found');
      this.clientIdToUserMap.set(client.id, user);

      const userClients = this.userIdToClientsMap.get(user.id);
      if (!userClients || userClients.length === 0) {
        // Initialize user's client list
        this.userIdToClientsMap.set(user.id, [client]);
      } else {
        userClients.push(client);
      }

      this.logger.log(`Connected ${user.id} with client id ${client.id}`);
    } catch (error) {
      this.logger.error(error);
      client.disconnect();
      return;
    }
  }
}
