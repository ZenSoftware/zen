/**
 * ## Clean & transform input into a select object
 *
 * @example
 * selectOne(1); // Defaults to 'id'
 * {id: 1}
 *
 * @example
 * selectOne('a'); // Defaults to 'id'
 * {id: 'a'}
 *
 * @example
 * selectOne({id: 2, ex: 'example'}); // Defaults to 'id'
 * {id: 2}
 *
 * @example
 * selectOne({id: 2, ex: 'example'}, 'ex');
 * {ex: 'example'}
 *
 * @example
 * selectOne({id: 2, ex: 'example'}, 'ex', 'out');
 * {out: 'example'}
 *
 * @example
 * selectOne(-1);
 * undefined
 *
 * @example
 * selectOne('');
 * undefined
 *
 * @example
 * selectOne(null);
 * undefined
 *
 * @example
 * selectOne(undefined);
 * undefined
 *
 * @param input - Array of items to be cleaned and serialized
 * @param inputFieldName - The input field name to select over. Defaults to `'id'`
 * @param outputFieldName  - The output field name of the return objects. Defaults to `'id'`
 * @return `{outputFieldName: number | string} | undefined` - Cleaned and serialized array of select objects.
 * The `inputFieldName` will be used for the output objects if the `outputFieldName` is not specified.
 */
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
 * ## Clean & transform array into select objects
 *
 * @example
 * selectMany([1, 2, -1, null, undefined]); // Defaults to 'id'
 * [
 *   {id: 1},
 *   {id: 2},
 * ]
 *
 * @example
 * selectMany(['a', 'b', '', null, undefined]); // Defaults to 'id'
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
 * selectMany(exampleArray); // Defaults to 'id'
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
 * @example
 * selectMany([]);
 * undefined
 *
 * @param input - Array of items to be cleaned and serialized
 * @param inputFieldName - The input field name to select over. Defaults to `'id'`
 * @param outputFieldName  - The output field name of the return objects. Defaults to `'id'`
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
