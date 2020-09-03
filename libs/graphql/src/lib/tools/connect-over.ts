type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

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
