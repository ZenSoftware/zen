import { RequireAtLeastOne } from './type-pickers';

export function disconnectOverMany(obj: Array<RequireAtLeastOne<any, 'id'>>) {
  if (obj) {
    if (obj.length !== 0)
      return {
        disconnect: obj.map(o => ({ id: o.id })),
      };
  }

  return undefined;
}
