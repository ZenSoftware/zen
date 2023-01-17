/**
 * TypeScript Utility keyof nested object: [blog post](https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3)
 */
export type NestedKeyOf<T extends object> = {
  [Key in keyof T & (string | number)]: T[Key] extends object
    ? // @ts-ignore
      `${Key}` | `${Key}.${NestedKeyOf<Omit<T[Key], '__typename'>>}`
    : `${Key}`;
}[keyof Omit<T, '__typename'> & (string | number)];
