import { GqlErrors } from './graphql-errors';

describe('GqlErrors', () => {
  it('', () => {
    const errors = new GqlErrors({
      graphQLErrors: [
        { extensions: { exception: { response: 'TEST_CODE' } } },
        { extensions: { exception: { response: 'OTHER_CODE' } } },
      ],
    });

    expect(errors.parsed).toEqual(['TEST_CODE', 'OTHER_CODE']);
    expect(errors.find(e => e === 'TEST_CODE')).toEqual('TEST_CODE');
    expect(errors.find(e => e === 'OTHER_CODE')).toEqual('OTHER_CODE');
    expect(errors.find(e => e === 'NON_EXISTENT')).toEqual(undefined);
  });
});
