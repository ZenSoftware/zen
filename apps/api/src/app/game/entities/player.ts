import { Schema, type } from '@colyseus/schema';

export class Position extends Schema {
  @type('number') x = 0;
  @type('number') y = 0;
  @type('number') z = 0;
}

export class Quaternion extends Schema {
  @type('number') x = 0;
  @type('number') y = 0;
  @type('number') z = 0;
  @type('number') w = 0;
}

export class Player extends Schema {
  @type('string') name: string;
  @type(Position) position = new Position();
  @type(Quaternion) quaternion = new Quaternion();
  playerData = { position: { x: 0, y: 0, z: 0 }, quaternion: { x: 0, y: 0, z: 0, w: 0 } };
}
