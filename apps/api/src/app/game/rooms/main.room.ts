import { Client, Room } from '@colyseus/core';
import { Logger } from '@nestjs/common';
import { MyRoomState, Player } from '@zen/common';

import { AuthService } from '../../auth';

const logger = new Logger('MainRoom');

export class MainRoom extends Room<MyRoomState> {
  auth: AuthService = null as any;
  boxData = {
    targetId: null,
    position: null,
    quaternion: null,
  };

  constructor() {
    super();
  }

  onCreate(options: any) {
    this.auth = options.auth;

    this.setState(new MyRoomState());
    this.setSimulationInterval(() => this.onUpdate());

    this.onMessage('playData', (client, message) => {
      this.state.players.get(client.sessionId)!.playerData = message;
    });

    this.onMessage('boxUpdate', (client, message) => {
      this.boxData = message;
    });

    logger.log('Created');
  }

  onJoin(client: Client, options: { token: string }) {
    const player = new Player();
    player.name = `Player ${this.clients.length}`;
    this.state.players.set(client.sessionId, player);

    logger.log(`Joined: ${client.sessionId}`);
  }

  onUpdate() {
    this.broadcast('boxUpdate', this.boxData);

    this.state.players.forEach((player, sessionId) => {
      player.position.x = player.playerData.position.x;
      player.position.y = player.playerData.position.y;
      player.position.z = player.playerData.position.z;

      player.quaternion.x = player.playerData.quaternion.x;
      player.quaternion.y = player.playerData.quaternion.y;
      player.quaternion.z = player.playerData.quaternion.z;
      player.quaternion.w = player.playerData.quaternion.w;
    });
  }

  onLeave(client: Client, options: any) {
    this.state.players.delete(client.sessionId);

    logger.log(`Left: ${client.sessionId} `);
  }

  onDispose() {
    //
  }
}
