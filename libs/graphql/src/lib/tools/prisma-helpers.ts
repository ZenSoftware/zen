export function selectOne<T, R>(
  item: T | number | string | null | undefined,
  inputFieldName?: keyof T,
  outputFieldName?: keyof R
): { [P in keyof R]: any } | undefined {
  if (!inputFieldName) (<any>inputFieldName) = 'id';
  if (!outputFieldName) (<any>outputFieldName) = inputFieldName;

  if (item !== undefined || item !== null) {
    const typeofItem = typeof item;

    if (
      typeofItem === 'object' &&
      (<any>item)[inputFieldName] !== null &&
      (<any>item)[inputFieldName] !== undefined &&
      (<any>item)[inputFieldName] !== -1 &&
      (<any>item)[inputFieldName] !== ''
    ) {
      const obj: any = new Object();
      obj[outputFieldName] = (<any>item)[inputFieldName];
      return obj;
    } else if (typeofItem === 'number' && item !== -1) {
      const obj: any = new Object();
      obj[outputFieldName] = item;
      return obj;
    } else if (typeofItem === 'string' && item !== '') {
      const obj: any = new Object();
      obj[outputFieldName] = item;
      return obj;
    }
  }

  return undefined;
}

/**
 * ## Clean and serialize a dynamic array of items
 * Takes a dynamic array of items and transforms them into a cleaned array of select objects.
 *
 * @example
 * selectMany([1, 2, -1, null, undefined]);
 * [
 *   {id: 1},
 *   {id: 2},
 * ]
 *
 * @example
 * selectMany(['a', 'b', '', null, undefined]);
 * [
 *   {id: "a"},
 *   {id: "b"},
 * ]
 *
 * @example
 * const exampleArray = [
 *   { id: 1, ex: 'a' },
 *   { id: 2, ex: 'b' },
 *   { id: 3, ex: '' },
 *   { id: undefined },
 *   { id: null },
 *   { id: -1 },
 *   { id: '' },
 *   undefined,
 *   null,
 * ];
 *
 * @example
 * selectMany(exampleArray); // Defaults to the 'id' field
 * [
 *   {id: 1},
 *   {id: 2},
 *   {id: 3},
 * ]
 *
 * @example
 * selectMany(exampleArray, 'ex');
 * [
 *   {ex: "a"},
 *   {ex: "b"},
 * ]
 *
 * @example
 * selectMany(exampleArray, 'ex', 'out');
 * [
 *   {out: "a"},
 *   {out: "b"},
 * ]
 *
 * @param input - Array of items to be cleaned and serialized
 * @param inputFieldName - The input field name to select over Defaults to `'id'`
 * @param outputFieldName  - The output field name of the result. Defaults to `'id'`
 * @return `Array<{outputFieldName: number | string}> | undefined` - Cleaned and serialized array of select objects.
 * The `inputFieldName` will be used for the output objects if the `outputFieldName` is not specified.
 */
export function selectMany<T, R>(
  input: Array<T | null | undefined> | null | undefined,
  inputFieldName?: keyof T,
  outputFieldName?: keyof R
): Array<{ [P in keyof R]: any }> | undefined {
  if (!inputFieldName) (<any>inputFieldName) = 'id';
  if (!outputFieldName) (<any>outputFieldName) = inputFieldName;

  if (input) {
    const items = (input as any[]).filter(x => x !== null && x !== undefined);

    if (items.length > 0) {
      const result = items.reduce((accum: any[], item) => {
        const typeofItem = typeof item;

        if (
          typeofItem === 'object' &&
          item[inputFieldName] !== null &&
          item[inputFieldName] !== undefined &&
          item[inputFieldName] !== -1 &&
          item[inputFieldName] !== ''
        ) {
          const obj: any = new Object();
          obj[outputFieldName] = item[inputFieldName];
          accum.push(obj);
        } else if (typeofItem === 'number' && item !== -1) {
          const obj: any = new Object();
          obj[outputFieldName] = item;
          accum.push(obj);
        } else if (typeofItem === 'string' && item !== '') {
          const obj: any = new Object();
          obj[outputFieldName] = item;
          accum.push(obj);
        }

        return accum;
      }, []);

      if (result.length > 0) return result as Array<any>;
    }
  }

  return undefined;
}
