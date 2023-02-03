export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
