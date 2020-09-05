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
