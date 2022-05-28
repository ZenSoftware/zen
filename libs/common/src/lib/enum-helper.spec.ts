import { EnumHelper } from './enum-helper';

describe('EnumHelper', () => {
  it('gets keys & values from numeric enums', () => {
    enum Plain {
      First,
      Second,
      Third,
    }

    const keys = EnumHelper.keys(Plain);
    expect(keys).toEqual(['First', 'Second', 'Third']);

    const values = EnumHelper.values(Plain);
    expect(values).toEqual([0, 1, 2]);

    const keyValues = EnumHelper.keyValues(Plain);
    expect(keyValues).toEqual([
      { key: 'First', value: 0 },
      { key: 'Second', value: 1 },
      { key: 'Third', value: 2 },
    ]);
  });

  it('gets keys & values from string enums', () => {
    enum Roles {
      Super = 'super',
      Admin = 'admin',
    }

    const keys = EnumHelper.keys(Roles);
    expect(keys).toEqual(['Super', 'Admin']);

    const values = EnumHelper.values(Roles);
    expect(values).toEqual(['super', 'admin']);

    const keyValues = EnumHelper.keyValues(Roles);
    expect(keyValues).toEqual([
      { key: 'Super', value: 'super' },
      { key: 'Admin', value: 'admin' },
    ]);
  });

  it('gets keys & values from heterogeneous enums', () => {
    enum Hetero {
      First = 1,
      Second = 'second',
      Third = 3,
    }

    const keys = EnumHelper.keys(Hetero);
    expect(keys).toEqual(['First', 'Second', 'Third']);

    const values = EnumHelper.values(Hetero);
    expect(values).toEqual([1, 'second', 3]);

    const keyValues = EnumHelper.keyValues(Hetero);
    expect(keyValues).toEqual([
      { key: 'First', value: 1 },
      { key: 'Second', value: 'second' },
      { key: 'Third', value: 3 },
    ]);
  });
});
