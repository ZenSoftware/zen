import { Schema, type } from '@colyseus/schema';

export class Vec3 extends Schema {
  @type('number') x = 0;
  @type('number') y = 0;
  @type('number') z = 0;
}

export class Vec4 extends Schema {
  @type('number') x = 0;
  @type('number') y = 0;
  @type('number') z = 0;
  @type('number') w = 0;
}

export class Player extends Schema {
  @type('string') name = '';
  @type(Vec3) position = new Vec3();
  @type(Vec4) quaternion = new Vec4();
  // @type(Vec3) linearVelocity = new Vec3();
  // @type(Vec3) angularVelocity = new Vec3();

  playerData = { position: { x: 0, y: 0, z: 0 }, quaternion: { x: 0, y: 0, z: 0, w: 0 } };
}
