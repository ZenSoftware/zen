import { trimObjectStrings } from './trim-object-strings';

describe('trimObjectStrings', () => {
  it('trims all strings on the object', () => {
    expect(
      trimObjectStrings({
        a: ' a ',
        b: { c: ' c ' },
        d: 123,
      })
    ).toEqual({
      a: 'a',
      b: { c: 'c' },
      d: 123,
    });
  });

  it('converts empty strings to null by default', () => {
    expect(
      trimObjectStrings({
        a: '   ',
      })
    ).toEqual({
      a: null,
    });
  });

  it('converts empty strings to provided option', () => {
    expect(
      trimObjectStrings(
        {
          a: '   ',
        },
        { convertEmptyStringTo: undefined }
      )
    ).toEqual({
      a: undefined,
    });

    expect(
      trimObjectStrings(
        {
          a: '   ',
        },
        { convertEmptyStringTo: '' }
      )
    ).toEqual({
      a: '',
    });
  });
});
