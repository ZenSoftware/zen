import { RequireAtLeastOne } from './type-pickers';

export function connectOne(
  item: RequireAtLeastOne<any, 'id'> | number | string | null | undefined
) {
  if (item !== undefined || item !== null) {
    if (typeof item === 'object') {
      return {
        connect: { id: (item as any).id },
      };
    } else if (typeof item === 'number' || typeof item === 'string') {
      return {
        connect: { id: item },
      };
    }
  }

  return undefined;
}

export function connectMany(
  list:
    | Array<RequireAtLeastOne<any, 'id'> | null | undefined>
    | Array<number | null | undefined>
    | Array<string | null | undefined>
    | null
    | undefined
) {
  if (list) {
    const cleanedList = (list as any[]).filter(x => x !== null && x !== undefined);

    if (cleanedList.length > 0) {
      return {
        connect: cleanedList.map(item => {
          if (typeof item === 'object') {
            return { id: item.id };
          } else if (typeof item === 'number' || typeof item === 'string') {
            return { id: item };
          }
          throw new Error(`Could not serialize item for 'connect' paramater.`);
        }),
      };
    }
  }

  return undefined;
}

export function set(
  list:
    | Array<RequireAtLeastOne<any, 'id'> | null | undefined>
    | Array<number | null | undefined>
    | Array<string | null | undefined>
    | null
    | undefined
) {
  if (list) {
    const cleanedList = (list as any[]).filter(x => x !== null && x !== undefined);

    if (cleanedList.length > 0) {
      return {
        set: cleanedList.map(item => {
          if (typeof item === 'object') {
            return { id: item.id };
          } else if (typeof item === 'number' || typeof item === 'string') {
            return { id: item };
          }
          throw new Error(`Could not serialize item for 'set' paramater.`);
        }),
      };
    }
  }

  return undefined;
}

export function disconnectMany(
  list:
    | Array<RequireAtLeastOne<any, 'id'> | null | undefined>
    | Array<number | null | undefined>
    | Array<string | null | undefined>
    | null
    | undefined
) {
  if (list) {
    const cleanedList = (list as any[]).filter(x => x !== null && x !== undefined);

    if (cleanedList.length > 0) {
      return {
        disconnect: cleanedList.map(item => {
          if (typeof item === 'object') {
            return { id: item.id };
          } else if (typeof item === 'number' || typeof item === 'string') {
            return { id: item };
          }
          throw new Error(`Could not serialize item for 'disconnect' paramater.`);
        }),
      };
    }
  }

  return undefined;
}
