import { NestedKeyOf } from './nested-keyof';

describe('NestedKeyOf', () => {
  it('should compile with correct typings', () => {
    const obj = {
      a: 1,
      b: '2',
      c: {
        d: 3,
        e: {
          f: 4,
          g: {
            h: 5,
          },
        },
      },
      i: [1, 2, 3],
    } as const;

    const keys1: NestedKeyOf<typeof obj> = 'a';
    const keys2: NestedKeyOf<typeof obj> = 'b';
    const keys3: NestedKeyOf<typeof obj> = 'c.d';
    const keys4: NestedKeyOf<typeof obj> = 'c.e.f';
    const keys5: NestedKeyOf<typeof obj> = 'c.e.g.h';
    const keys6: NestedKeyOf<typeof obj> = 'i.0';
    const keys7: NestedKeyOf<typeof obj> = 'i.1';
    const keys8: NestedKeyOf<typeof obj> = 'i.2';
  });
});
