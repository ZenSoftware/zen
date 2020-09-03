import { RequireAtLeastOne } from './type-pickers';

export function connectOverMany(obj: Array<RequireAtLeastOne<any, 'id'>>) {
  if (obj)
    return {
      connect: obj.map(o => ({ id: o.id })),
    };

  return undefined;
}

export function connectOverOne(obj: RequireAtLeastOne<any, 'id'>) {
  if (obj)
    return {
      connect: { id: obj.id },
    };

  return undefined;
}
