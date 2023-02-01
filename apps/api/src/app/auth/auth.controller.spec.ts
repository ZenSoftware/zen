import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '../config';
import { AuthSession } from '../graphql/models';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getAuthSession: () => {
              const authSession: Pick<AuthSession, 'token'> = {
                token: 'abc.def_+/ghi.jkl==',
              };

              return Promise.resolve(authSession);
            },
          },
        },
        {
          provide: ConfigService,
          useValue: <ConfigService>{
            oauth: { loginConfirmedURL: 'http://site.com/login-confirmed' },
          },
        },
      ],
    }).compile();

    controller = module.get(AuthController);
  });

  it('constructs a valid query string from an AuthSession', () => {
    controller.getLoginConfirmedURL(undefined as any).then(url => {
      expect(url).toEqual(
        'http://site.com/login-confirmed?token=abc.def_%252B%252Fghi.jkl%253D%253D'
      );
    });
  });
});
