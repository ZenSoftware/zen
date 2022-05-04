import { containsNestedCreate } from './forbid-nested-create.guard';

describe('ForbidNestedCreateGuard', () => {
  it(`determines if args contains a "create" field`, () => {
    const args1 = {
      data: {
        text: 'sample',
        author: { connect: { id: 1 } },
        comment: { create: { text: 'commenting' } },
      },
    };
    expect(containsNestedCreate(args1)).toEqual(true);
    expect(containsNestedCreate(args1, { allow: ['comment'] })).toEqual(false);

    const args2 = {
      data: {
        stub: null,
        stub2: undefined,
        author: { create: { username: 'user1' } },
        comment: { create: { text: 'commenting' } },
      },
    };
    expect(containsNestedCreate(args2)).toEqual(true);
    expect(containsNestedCreate(args2, { allow: ['author'] })).toEqual(true);
    expect(containsNestedCreate(args2, { allow: ['comment'] })).toEqual(true);
    expect(containsNestedCreate(args2, { allow: ['author', 'comment'] })).toEqual(false);
  });
});
