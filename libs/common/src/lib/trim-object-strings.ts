const isObject = (x: any) => typeof x === 'object' && x !== null && !Array.isArray(x);

/**
 * Recursively finds all the string values on an object and trims the leading & trailing whitespace.
 * Mutates the input object and returns it.
 * @param options defaults to { convertEmptyStringTo: null }
 *
 * @example
 * ```ts
 * trimObjectStrings({
 *   a: ' a ',
 *   b: { c: ' c ' },
 *   d: 123
 * });
 * ```
 * ```ts
 * {
 *   a: 'a',
 *   b: { c: 'c' },
 *   d: 123
 * }
 * ```
 *
 * @example
 * ```ts
 * trimObjectStrings({ a: ''});
 * ```
 * ```ts
 * { a: null }
 * ```
 *
 * @example
 * ```ts
 * trimObjectStrings({ a: ''}, { convertEmptyStringTo: '' });
 * ```
 * ```ts
 * { a: '' }
 * ```
 */
export function trimObjectStrings<T extends object>(
  obj: T,
  options: { convertEmptyStringTo: any } = {
    convertEmptyStringTo: null,
  }
): T {
  if (obj) {
    for (const [key, value] of Object.entries(obj)) {
      if (isObject(value)) {
        trimObjectStrings(value, options);
      } else if (typeof value === 'string') {
        (<any>obj)[key] = value.trim();
        if ((<any>obj)[key] === '') {
          (<any>obj)[key] = options.convertEmptyStringTo;
        }
      }
    }
  }

  return obj;
}
