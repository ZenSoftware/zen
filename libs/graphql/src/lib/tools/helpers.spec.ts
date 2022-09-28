import { omitIdAndTypename } from './helpers';

describe('omitIdAndTypename', () => {
  it('omits id and __typename fields', () => {
    expect(
      omitIdAndTypename({
        __typename: 'User',
        id: 1,
        username: 'sam',
      })
    ).toEqual({ username: 'sam' });

    expect(omitIdAndTypename(null)).toEqual(null);
    expect(omitIdAndTypename(undefined)).toEqual(undefined);
    expect(omitIdAndTypename(1)).toEqual(1);
    expect(omitIdAndTypename({})).toEqual({});
    expect(omitIdAndTypename({ annaka: '☯️' })).toEqual({ annaka: '☯️' });
    expect(omitIdAndTypename(new Date('1967-4-9'))).toEqual(new Date('1967-4-9'));
    expect(omitIdAndTypename(['hero'])).toEqual(['hero']);
  });
});
