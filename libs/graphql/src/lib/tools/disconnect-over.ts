import { RequireAtLeastOne } from './type-pickers';

export function disconnectOverMany(obj: Array<RequireAtLeastOne<any, 'id'>>) {
  if (obj)
    return {
      disconnect: obj.map(o => ({ id: o.id })),
    };

  return undefined;
}
