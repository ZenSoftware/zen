import { isDate } from 'lodash-es';

const isObject = (x: any) => typeof x === 'object' && x !== null && !Array.isArray(x) && !isDate(x);

/**
 * Recursively finds all the string values on an object and trims off the leading and trailing whitespace.
 * Mutates the input object.
 */
export function trimObjectStrings(
  object: { [key: string]: unknown },
  options = { convertEmptyToNull: false }
) {
  if (object) {
    for (const [key, value] of Object.entries(object)) {
      if (isObject(value)) {
        trimObjectStrings(value as any, options);
      } else if (typeof value === 'string') {
        object[key] = value.trim();
        if (options.convertEmptyToNull && object[key] === '') {
          object[key] = null;
        }
      }
    }
  }

  return object;
}
