import { UnauthorizedException } from '@nestjs/common';

import { authLogic } from './auth-logic';

describe('auth-logic', () => {
  it('validates roles correctly', () => {
    // Allow anonymous users for classes not decorated with Roles and handlers not decorated with Roles
    expect(authLogic([], [], [])).toEqual(true);

    // Super gets unlimited access
    expect(authLogic(['Super'], ['Admin'], ['Reviewer'])).toEqual(true);

    // Class check
    expect(() => authLogic([], ['Admin'], [])).toThrow(UnauthorizedException);

    // Handler check
    expect(() => authLogic([], [], ['Admin'])).toThrow(UnauthorizedException);

    // Class "or" check
    expect(authLogic(['Editor'], ['Admin', 'Editor'], [])).toEqual(true);

    // Handler "or" check
    expect(authLogic(['Editor'], [], ['Admin', 'Editor'])).toEqual(true);

    // Handler presedence check
    expect(() => authLogic(['Editor'], ['Editor', 'Admin'], ['Admin'])).toThrow(
      UnauthorizedException
    );
  });
});
