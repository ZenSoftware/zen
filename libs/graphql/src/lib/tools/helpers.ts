/**
 * Omits `id` and `__typename` properties from an object
 */

export function omitIdAndTypename<T>(obj: T): T extends object ? Omit<T, '__typename' | 'id'> : T {
  if (typeof obj === 'object' && obj !== null) {
    delete (<any>obj).__typename;
    delete (<any>obj).id;
  }

  return obj as any;
}
