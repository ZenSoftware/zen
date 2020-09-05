import { RequireAtLeastOne } from './type-pickers';

/**
 * Prisma one helpers
 */

type OneArgs = RequireAtLeastOne<any, 'id'> | number | string | null | undefined;

export function selectOne(item: OneArgs) {
  if (item !== undefined || item !== null) {
    const typeofItem = typeof item;

    if (
      typeofItem === 'object' &&
      (<any>item).id !== null &&
      (<any>item).id !== undefined &&
      (<any>item).id !== ''
    ) {
      return { id: (<any>item).id };
    } else if (typeofItem === 'number') {
      return { id: item };
    } else if (typeofItem === 'string') {
      if (item !== '') return { id: item };
    }
  }

  return undefined;
}

// export function connectOne(item: OneArgs) {
//   const result = selectOne(item);
//   if (result) return { connect: result };
//   else return undefined;
// }

/**
 * Prisma many helpers
 */

type ManyArgs =
  | Array<RequireAtLeastOne<any, 'id'> | null | undefined>
  | Array<number | null | undefined>
  | Array<string | null | undefined>
  | null
  | undefined;

export function selectMany(input: ManyArgs) {
  if (input) {
    const items = (input as any[]).filter(x => x !== null && x !== undefined);

    if (items.length > 0) {
      const result = items.reduce((accum: any[], item) => {
        const typeofItem = typeof item;

        if (
          typeofItem === 'object' &&
          item.id !== null &&
          item.id !== undefined &&
          item.id !== ''
        ) {
          accum.push({ id: item.id });
        } else if (typeofItem === 'number') {
          accum.push({ id: item });
        } else if (typeofItem === 'string') {
          if (item !== '') accum.push({ id: item });
        }

        return accum;
      }, []);

      if (result.length > 0) return result as Array<{ id: any }>;
    }
  }

  return undefined;
}

// export function connectMany(list: ManyArgs) {
//   const result = selectMany(list);
//   if (result) return { connect: result };
//   else return undefined;
// }

// export function deleteMany(list: ManyArgs) {
//   const result = selectMany(list);
//   if (result) return { delete: result };
//   else return undefined;
// }

// export function setMany(list: ManyArgs) {
//   const result = selectMany(list);
//   if (result) return { set: result };
//   else return undefined;
// }

// export function disconnectMany(list: ManyArgs) {
//   const result = selectMany(list);
//   if (result) return { disconnect: result };
//   else return undefined;
// }
