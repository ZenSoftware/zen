import { URLSearchParams } from 'url';

import { AuthSession } from '../graphql/models';

describe('AuthSession query string', () => {
  const loginConfirmedUrl = 'http://localhost:4200/#/login-confirmed';

  it('constructs a query string from an AuthSession', () => {
    const authSession: AuthSession = {
      id: 1,
      roles: ['Super', 'Registered'],
      expiresIn: 123,
      rememberMe: true,
      token: 'abc.def_+/ghi.jkl==',
    };

    const uriEncodedAuthSession = { ...authSession };
    uriEncodedAuthSession.token = encodeURIComponent(authSession.token);

    const searchParams = new URLSearchParams(Object.entries(uriEncodedAuthSession as object));
    const redirectUrl = loginConfirmedUrl + '?' + searchParams;
    expect(redirectUrl).toEqual(
      'http://localhost:4200/#/login-confirmed?id=1&roles=Super%2CRegistered&expiresIn=123&rememberMe=true&token=abc.def_%252B%252Fghi.jkl%253D%253D'
    );

    const reconstructed: AuthSession = {
      id: parseInt(searchParams.get('id')),
      expiresIn: parseInt(searchParams.get('expiresIn')),
      rememberMe: searchParams.get('rememberMe') === 'true' ? true : false,
      roles: searchParams.get('roles') ? searchParams.get('roles').split(',') : [],
      token: decodeURIComponent(searchParams.get('token')),
    };
    expect(reconstructed).toEqual(authSession);
  });
});
