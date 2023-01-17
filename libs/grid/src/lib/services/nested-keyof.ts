/**
 * Utility type, that exposes all the key paths of an object, including the nested ones. Links to blog posts:
 * - [TypeScript Utility: keyof nested object](https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3)
 * - [Advanced TypeScript: Type-Level Nested Object Paths](https://javascript.plainenglish.io/advanced-typescript-type-level-nested-object-paths-7f3d8901f29a)
 */
export type NestedKeyOf<T extends object> = {
  [Key in keyof T & (string | number)]: NonNullable<T[Key]> extends Array<any>
    ? `${Key}`
    : NonNullable<T[Key]> extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<NonNullable<T[Key]>>}`
    : `${Key}`;
}[keyof Omit<T, '__typename'> & (string | number)];
