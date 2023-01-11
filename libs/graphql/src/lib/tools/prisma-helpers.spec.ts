import { selectMany, selectOne } from './prisma-helpers';

describe('selectOne', () => {
  it('produces correct select objects', () => {
    expect(selectOne(1)).toEqual({ id: 1 });
    expect(selectOne('a')).toEqual({ id: 'a' });
    expect(selectOne({ id: 2, ex: 'example' })).toEqual({ id: 2 });
    expect(selectOne({ id: 2, ex: 'example' }, 'ex')).toEqual({ ex: 'example' });
    expect(selectOne({ id: 2, ex: 'example' }, 'out', 'ex')).toEqual({ out: 'example' });
    expect(selectOne(-1)).toEqual(undefined);
    expect(selectOne('')).toEqual(undefined);
    expect(selectOne(undefined)).toEqual(undefined);
    expect(selectOne(null)).toEqual(undefined);
  });
});

describe('selectMany', () => {
  it('produces correct select objects', () => {
    const exampleArray = [
      { id: 1, ex: 'a' },
      { id: 2, ex: 'b' },
      { id: 3, ex: '' },
      { id: undefined },
      { id: null },
      { id: -1 },
      { id: '' },
      undefined,
      null,
    ];

    expect(selectMany([-1, 1, 2, 2, null, undefined])).toEqual([{ id: 1 }, { id: 2 }]);
    expect(selectMany(['a', 'b', '', null, undefined])).toEqual([{ id: 'a' }, { id: 'b' }]);
    expect(selectMany(exampleArray)).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    expect(selectMany(exampleArray, 'ex')).toEqual([{ ex: 'a' }, { ex: 'b' }]);
    expect(selectMany(exampleArray, 'out', 'ex')).toEqual([{ out: 'a' }, { out: 'b' }]);
    expect(selectMany([])).toEqual([]);
    expect(selectMany(undefined)).toEqual([]);
    expect(selectMany(null)).toEqual([]);
  });
});
