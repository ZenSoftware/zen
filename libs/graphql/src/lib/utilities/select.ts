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
 * @param input - Item to be serialized as a select object.
 * @param outputField  - Output field name of the return objects. Defaults to `'id'` and `inputField = outputField` if `inputField` is not specified.
 * @param inputField - Input field name to select over. Defaults to `'id'` and `inputField = outputField` if `inputField` is not specified.
 * @return `{outputField: number | string} | undefined` - Cleaned and serialized select object.
 */
export function selectOne<T>(
  item: T | number | string | null | undefined,
  outputField: string = 'id',
  inputField?: keyof T
): { [outputField: string]: any } {
  if (!inputField) (<string>inputField) = outputField;

  if (item !== undefined && item !== null) {
    const obj: Record<string, any> = {};
    const typeofItem = typeof item;

    if (
      typeofItem === 'object' &&
      (<any>item)[inputField] !== null &&
      (<any>item)[inputField] !== undefined &&
      (<any>item)[inputField] !== ''
    ) {
      obj[outputField] = (<any>item)[inputField];
      return obj;
    } else if (typeofItem === 'number' || (typeofItem === 'string' && item !== '')) {
      obj[outputField] = item;
      return obj;
    }
  }

  return undefined as any;
}

/**
 * ## Cleans & transforms array into select objects
 * Removes duplicates, null/undefined and empty strings.
 *
 * @example
 * selectMany([1, 2, 2, null, undefined]); // Defaults to 'id'
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
 *   { id: '' },
 *   {},
 *   undefined,
 *   null,
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
 * @param input - Iterable of items to be cleaned and serialized as select objects.
 * @param outputField  - Output field name of the return objects. Defaults to `'id'` and `inputField = outputField` if `inputField` is not specified.
 * @param inputField - Input field name to select over. Defaults to `'id'` and `inputField = outputField` if `inputField` is not specified.
 * @return `Array<{outputField: number | string}> | undefined` - Cleaned and serialized array of select objects.
 */
export function selectMany<T>(
  input: Iterable<T | null | undefined> | null | undefined,
  outputField: string = 'id',
  inputField?: keyof T
): Array<{ [outputField: string]: any }> {
  if (!inputField) (<string>inputField) = outputField;

  if (input) {
    const items = Array.from(input).filter(x => x !== null && x !== undefined);

    if (items.length > 0) {
      const ids = items.reduce((accum: Set<T | null | undefined>, item) => {
        if (typeof item === 'object') {
          accum.add((<any>item)[inputField]);
        } else {
          accum.add(item);
        }

        return accum;
      }, new Set<T | null | undefined>());

      return Array.from(ids)
        .filter(id => id !== null && id !== undefined && id !== '')
        .map(id => ({ [outputField]: id }));
    }
  }

  return [];
}
