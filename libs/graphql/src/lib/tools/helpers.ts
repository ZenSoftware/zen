import { omit } from 'lodash-es';

/**
 * Omits `id` and `__typename` properties from an object
 */
export function omitIdAndTypename(obj: object | undefined | null) {
  return omit(obj, ['__typename', 'id']);
}
