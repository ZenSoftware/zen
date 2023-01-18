import { NestedKeyOf } from './nested-keyof';

export type SampleFields = {
  __typename?: 'Sample';
  a?: number | null;
  b?: number | null;
  c?: {
    __typename?: 'C';
    d?: number | null;
    e?: {
      __typename?: 'E';
      f?: Array<number> | null;
      g?: {
        __typename?: 'G';
        h?: number | null;
      } | null;
    } | null;
  } | null;
};

describe('NestedKeyOf', () => {
  it('compiles using available paths', () => {
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
