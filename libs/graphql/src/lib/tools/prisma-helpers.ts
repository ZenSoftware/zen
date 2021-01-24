/**
 * ## Cleans & transforms input into a select object
 *
 * @example
 * selectOne(1); // Defaults to 'id'
 * {id: 1}
 *
 * @example
 * selectOne('a'); // Defaults to 'id'
 * {id: "a"}
 *
 * @example
 * selectOne({id: 2, ex: 'example'}); // Defaults to 'id'
 * {id: 2}
 *
 * @example
 * selectOne({id: 2, ex: 'example'}, 'ex');
 * {ex: "example"}
 *
 * @example
 * selectOne({id: 2, ex: 'example'}, 'out', 'ex');
 * {out: "example"}
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
 * selectOne(undefined);
 * undefined
 *
 * @example
 * selectOne(null);
 * undefined
 *
 * @param input - Array of items to be cleaned and serialized
 * @param outputField  - Output field name of the return objects. Defaults to `'id'` and `inputField = outputField` if `inputField` is not specified.
 * @param inputField - Input field name to select over. Defaults to `'id'` and `inputField = outputField` if `inputField` is not specified.
 * @return `{outputField: number | string} | undefined` - Cleaned and serialized array of select objects.
 * `outputField` will be used for `inputField` if `inputField` is not specified.
 */
export function selectOne<T, R>(
  item: T | number | string | null | undefined,
  outputField?: keyof R,
  inputField?: keyof T
): { [P in keyof R]: any } {
  if (!outputField) (<any>outputField) = 'id';
  if (!inputField) (<any>inputField) = outputField;

  if (item !== undefined && item !== null) {
    const typeofItem = typeof item;

    if (
      typeofItem === 'object' &&
      (<any>item)[inputField] !== null &&
      (<any>item)[inputField] !== undefined &&
      (<any>item)[inputField] !== -1 &&
      (<any>item)[inputField] !== ''
    ) {
      const obj: any = new Object();
      obj[outputField] = (<any>item)[inputField];
      return obj;
    } else if (typeofItem === 'number' && item !== -1) {
      const obj: any = new Object();
      obj[outputField] = item;
      return obj;
    } else if (typeofItem === 'string' && item !== '') {
      const obj: any = new Object();
      obj[outputField] = item;
      return obj;
    }
  }

  return <any>undefined;
}

/**
 * ## Cleans & transforms array into select objects
 *
 * @example
 * selectMany([1, 2, -1, null, undefined]); // Defaults to 'id'
 * [
 *   {id: 1},
 *   {id: 2}
 * ]
 *
 * @example
 * selectMany(['a', 'b', '', null, undefined]); // Defaults to 'id'
 * [
 *   {id: "a"},
 *   {id: "b"}
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
 *   null
 * ];
 *
 * @example
 * selectMany(exampleArray); // Defaults to 'id'
 * [
 *   {id: 1},
 *   {id: 2},
 *   {id: 3}
 * ]
 *
 * @example
 * selectMany(exampleArray, 'ex');
 * [
 *   {ex: "a"},
 *   {ex: "b"}
 * ]
 *
 * @example
 * selectMany(exampleArray, 'out', 'ex');
 * [
 *   {out: "a"},
 *   {out: "b"}
 * ]
 *
 * @example
 * selectMany([]);
 * []
 *
 * @example
 * selectMany(undefined);
 * []
 *
 * @example
 * selectMany(null);
 * []
 *
 * @param input - Array of items to be cleaned and serialized
 * @param outputField  - Output field name of the return objects. Defaults to `'id'` and `inputField = outputField` if `inputField` is not specified.
 * @param inputField - Input field name to select over. Defaults to `'id'` and `inputField = outputField` if `inputField` is not specified.
 * @return `Array<{outputField: number | string}> | undefined` - Cleaned and serialized array of select objects.
 */
export function selectMany<T, R>(
  input: Array<T | null | undefined> | null | undefined,
  outputField?: keyof R,
  inputField?: keyof T
): Array<{ [P in keyof R]: any }> {
  if (!outputField) (<any>outputField) = 'id';
  if (!inputField) (<any>inputField) = outputField;

  if (input) {
    const items = (input as any[]).filter(x => x !== null && x !== undefined);

    if (items.length > 0) {
      const result = items.reduce((accum: any[], item) => {
        const typeofItem = typeof item;

        if (
          typeofItem === 'object' &&
          item[inputField] !== null &&
          item[inputField] !== undefined &&
          item[inputField] !== -1 &&
          item[inputField] !== ''
        ) {
          const obj: any = new Object();
          obj[outputField] = item[inputField];
          accum.push(obj);
        } else if (typeofItem === 'number' && item !== -1) {
          const obj: any = new Object();
          obj[outputField] = item;
          accum.push(obj);
        } else if (typeofItem === 'string' && item !== '') {
          const obj: any = new Object();
          obj[outputField] = item;
          accum.push(obj);
        }

        return accum;
      }, []);

      return result as Array<any>;
    }
  }

  return <any>[];
}
