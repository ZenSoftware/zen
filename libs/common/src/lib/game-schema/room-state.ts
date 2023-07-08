import { MapSchema, Schema, type } from '@colyseus/schema';

import { Player } from './player';

export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}
