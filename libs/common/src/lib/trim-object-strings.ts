const isObject = (x: any) => typeof x === 'object' && x !== null && !Array.isArray(x);

/**
 * Recursively finds all the string values on an object and trims the leading & trailing whitespace.
 * Mutates the input object.
 * @param defaults to { convertEmptyStringTo: 'null' }
 */
export function trimObjectStrings(
  object: { [key: string]: any },
  options: { convertEmptyStringTo: 'null' | 'undefined' | 'emptyString' } = {
    convertEmptyStringTo: 'null',
  }
) {
  if (object) {
    for (const [key, value] of Object.entries(object)) {
      if (isObject(value)) {
        trimObjectStrings(value, options);
      } else if (typeof value === 'string') {
        object[key] = value.trim();
        if (object[key] === '') {
          if (options?.convertEmptyStringTo === 'null') object[key] = null;
          else if (options?.convertEmptyStringTo === 'undefined') object[key] = undefined;
        }
      }
    }
  }

  return object;
}
