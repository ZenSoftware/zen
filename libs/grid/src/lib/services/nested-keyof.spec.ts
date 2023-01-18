import { NestedKeyOf } from './nested-keyof';

export type SampleFields = {
  __typename?: 'Sample';
  a?: any | null;
  b?: any | null;
  c?: {
    d?: any | null;
    e?: {
      f?: Array<any> | null;
      g?: {
        h?: any | null;
      } | null;
    } | null;
  } | null;
};

describe('NestedKeyOf', () => {
  it('should compile with correct typings', () => {
    const keys1: NestedKeyOf<SampleFields> = 'a';
    const keys2: NestedKeyOf<SampleFields> = 'b';
    const keys3: NestedKeyOf<SampleFields> = 'c';
    const keys4: NestedKeyOf<SampleFields> = 'c.d';
    const keys5: NestedKeyOf<SampleFields> = 'c.e';
    const keys6: NestedKeyOf<SampleFields> = 'c.e.f';
    const keys7: NestedKeyOf<SampleFields> = 'c.e.g';
    const keys8: NestedKeyOf<SampleFields> = 'c.e.g.h';
  });
});
