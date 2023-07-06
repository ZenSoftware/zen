import { Client, Room } from '@colyseus/core';
import { Logger } from '@nestjs/common';

import { AuthService } from '../../auth';
import { MyRoomState, Player } from './room-state';

const logger = new Logger('MainRoom');

export class MainRoom extends Room<MyRoomState> {
  auth: AuthService = null as any;

  constructor() {
    super();
  }

  async onCreate(options: any) {
    this.auth = options.auth;

    this.setState(new MyRoomState());

    this.onMessage('updatePosition', (client, data) => {
      const player = this.state.players.get(client.sessionId) as Player;
      player.x = data.x;
      player.y = data.y;
      player.z = data.z;
    });

    logger.log('Created');
  }

  async onJoin(client: Client, options: { token: string }) {
    // get the RequestUser from the JWT token
    const user = await this.auth.authorizeJwt(options.token);

    const player = new Player();

    // place Player at a random position
    const FLOOR_SIZE = 500;
    player.x = -(FLOOR_SIZE / 2) + Math.random() * FLOOR_SIZE;
    player.y = 200;
    player.z = -(FLOOR_SIZE / 2) + Math.random() * FLOOR_SIZE;

    this.state.players.set(client.sessionId, player);

    logger.log(`Joined: ${client.sessionId} `);
  }

  async onLeave(client: Client, options: any) {
    this.state.players.delete(client.sessionId);
    logger.log(`Left: ${client.sessionId} `);
  }

  async onDispose() {
    //
  }
}
