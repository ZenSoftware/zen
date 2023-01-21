import { rbacLogic } from './roles.guard';

describe('rbac-logic', () => {
  it('should pass when user has one of the defined roles', () => {
    expect(rbacLogic(['Editor'], ['Admin', 'Editor'])).toEqual(true);
  });

  it('should pass if user has Super role but not explicitly defined', () => {
    expect(rbacLogic(['Super'], ['Admin', 'Editor'])).toEqual(true);
  });

  it('should throw if user does not contain any of the defined roles', () => {
    expect(rbacLogic(['Registered'], ['Admin', 'Editor'])).toEqual(false);
  });
});
