export function assertType<T>(obj: unknown = {}): T {
  return obj as T;
}
