import { Logger } from '@nestjs/common';
import { Client, Room } from 'colyseus';

import { AuthService } from '../../auth';
import { MyRoomState, Player } from './room-state';

const logger = new Logger('MainRoom');

export class MainRoom extends Room<MyRoomState> {
  auth: AuthService = null as any;

  constructor() {
    super();
    this.setState(new MyRoomState());
  }

  async onCreate(options: any) {
    logger.log('MainRoom created');
    this.auth = options.auth;

    this.onMessage('updatePosition', (client, data) => {
      logger.log('UPDATE POSITION', data);
      const player = this.state.players.get(client.sessionId) as Player;
      player.x = data.x;
      player.y = data.y;
      player.z = data.z;
    });
  }

  async onJoin(client: Client, options: { token: string }) {
    const user = await this.auth.authorizeJwt(options.token);
    logger.log(`MainRoom - User with id ${user?.id} joined`);

    const player = new Player();

    // place Player at a random position
    const FLOOR_SIZE = 500;
    player.x = -(FLOOR_SIZE / 2) + Math.random() * FLOOR_SIZE;
    player.y = -1;
    player.z = -(FLOOR_SIZE / 2) + Math.random() * FLOOR_SIZE;

    this.state.players.set(client.sessionId, player);
  }

  async onLeave(client: Client, options: any) {
    logger.log(`Client ${client.sessionId} left`);
    this.state.players.delete(client.sessionId);
  }

  async onDispose() {
    //
  }
}
