import { omit } from 'lodash-es';

/**
 * Omits `__typename` and `id` properties from an object
 */
export function makeSetObject(obj: object | undefined) {
  return omit(obj, ['__typename', 'id']);
}

/**
 * Makes a Prisma update object from a value object
 */
export function makeUpdateObject(obj: object) {
  if (!obj) return undefined;

  const update = Object.entries(obj).reduce((accum: { [k: string]: unknown }, [key, val]) => {
    accum[key] = Array.isArray(val) ? val : { set: val };
    return accum;
  }, {});

  return { update };
}

/**
 * Makes a Prisma create object from a value object
 */
export function makeCreateObject(obj: object) {
  if (!obj) return undefined;

  const create = Object.entries(obj).reduce((accum: { [k: string]: unknown }, [key, val]) => {
    accum[key] = val;
    return accum;
  }, {});

  return { create };
}
