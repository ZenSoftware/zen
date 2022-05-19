import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../auth';
import { ConfigService } from '../config';
import { AuthSession } from '../graphql/models';
import { AuthController } from './auth.controller';

describe('AuthSession query string', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getAuthSession: () => {
              return <AuthSession>{
                id: 1,
                roles: ['Super', 'Registered'],
                expiresIn: 123,
                rememberMe: true,
                token: 'abc.def_+/ghi.jkl==',
              };
            },
          },
        },
        {
          provide: ConfigService,
          useValue: <ConfigService>{
            oauth: { loginConfirmedURL: 'http://localhost:4200/#/login-confirmed' },
          },
        },
      ],
    }).compile();

    await module.resolve(AuthService);
    controller = module.get(AuthController);
  });

  it('constructs a query string from an AuthSession', () => {
    const redirectUrl = controller.getLoginConfirmedURL(null);
    expect(redirectUrl).toEqual(
      'http://localhost:4200/#/login-confirmed?id=1&roles=Super%2CRegistered&expiresIn=123&rememberMe=true&token=abc.def_%252B%252Fghi.jkl%253D%253D'
    );

    // const authSession: AuthSession = {
    //   id: 1,
    //   roles: ['Super', 'Registered'],
    //   expiresIn: 123,
    //   rememberMe: true,
    //   token: 'abc.def_+/ghi.jkl==',
    // };

    // const uriEncodedAuthSession = { ...authSession };
    // uriEncodedAuthSession.token = encodeURIComponent(authSession.token);

    // const searchParams = new URLSearchParams(Object.entries(uriEncodedAuthSession as object));
    // const loginConfirmedUrl = 'http://localhost:4200/#/login-confirmed';
    // const redirectUrl = loginConfirmedUrl + '?' + searchParams;
    // expect(redirectUrl).toEqual(
    //   'http://localhost:4200/#/login-confirmed?id=1&roles=Super%2CRegistered&expiresIn=123&rememberMe=true&token=abc.def_%252B%252Fghi.jkl%253D%253D'
    // );

    // const reconstructed: AuthSession = {
    //   id: parseInt(searchParams.get('id')),
    //   expiresIn: parseInt(searchParams.get('expiresIn')),
    //   rememberMe: searchParams.get('rememberMe') === 'true' ? true : false,
    //   roles: searchParams.get('roles') ? searchParams.get('roles').split(',') : [],
    //   token: decodeURIComponent(searchParams.get('token')),
    // };
    // expect(reconstructed).toEqual(authSession);
  });
});
