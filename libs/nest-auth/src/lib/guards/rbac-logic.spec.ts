import { ForbiddenException } from '@nestjs/common';

import { rbacLogic } from './rbac-logic';

describe('rbac-logic', () => {
  it('validates roles correctly', () => {
    // Allow anonymous users for classes not decorated with Roles and handlers not decorated with Roles
    expect(rbacLogic([], [], [])).toEqual(true);
    expect(rbacLogic(null, null, null)).toEqual(true);
    expect(rbacLogic(undefined, undefined, undefined)).toEqual(true);

    // Super gets unlimited access
    expect(rbacLogic(['Super'], ['Admin'], ['Reviewer'])).toEqual(true);

    // Class check
    expect(() => rbacLogic([], ['Admin'], [])).toThrow(ForbiddenException);
    expect(() => rbacLogic(null, ['Admin'], [])).toThrow(ForbiddenException);
    expect(() => rbacLogic(undefined, ['Admin'], [])).toThrow(ForbiddenException);

    // Handler check
    expect(() => rbacLogic([], [], ['Admin'])).toThrow(ForbiddenException);
    expect(() => rbacLogic(null, [], ['Admin'])).toThrow(ForbiddenException);
    expect(() => rbacLogic(undefined, [], ['Admin'])).toThrow(ForbiddenException);

    // Class "or" check
    expect(rbacLogic(['Editor'], ['Admin', 'Editor'], [])).toEqual(true);

    // Handler "or" check
    expect(rbacLogic(['Editor'], [], ['Admin', 'Editor'])).toEqual(true);

    // Handler presedence check
    expect(() => rbacLogic(['Editor'], ['Editor', 'Admin'], ['Admin'])).toThrow(ForbiddenException);
  });
});
