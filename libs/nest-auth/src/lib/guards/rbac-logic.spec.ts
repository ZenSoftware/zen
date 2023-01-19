import { ForbiddenException } from '@nestjs/common';

import { rbacLogic } from './rbac-logic';

describe('rbac-logic', () => {
  it('should pass for no defined roles', () => {
    expect(rbacLogic([], [])).toEqual(true);
    expect(rbacLogic(null, null)).toEqual(true);
    expect(rbacLogic(undefined, undefined)).toEqual(true);
    expect(rbacLogic([], null)).toEqual(true);
    expect(rbacLogic([], undefined)).toEqual(true);
    expect(rbacLogic(null, [])).toEqual(true);
    expect(rbacLogic(undefined, [])).toEqual(true);
    expect(rbacLogic(null, undefined)).toEqual(true);
    expect(rbacLogic(undefined, null)).toEqual(true);
    expect(rbacLogic(['Editor'], [])).toEqual(true);
    expect(rbacLogic(['Editor'], null)).toEqual(true);
    expect(rbacLogic(['Editor'], undefined)).toEqual(true);
  });

  it('should pass when user has one of the defined roles', () => {
    expect(rbacLogic(['Editor'], ['Admin', 'Editor'])).toEqual(true);
  });

  it('should pass if user has Super role but not explicitly defined', () => {
    expect(rbacLogic(['Super'], ['Admin', 'Editor'])).toEqual(true);
  });

  it('should throw if user does not contain any of the defined roles', () => {
    expect(() => rbacLogic(['Registered'], ['Admin', 'Editor'])).toThrow(ForbiddenException);
  });
});
