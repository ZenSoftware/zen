import { containsNestedCreate } from './reject-nested-create.guard';

describe('RejectNestedCreateGuard', () => {
  it(`determines args contains a "create" field`, () => {
    const args = {
      data: {
        text: 'sample',
        published: true,
        stub: null,
        stub2: undefined,
        author: {
          create: {
            username: 'mean_human',
            password: '12345678',
            email: 'you@got.hacked',
            roles: ['Super'],
          },
        },
      },
    };

    expect(containsNestedCreate(args)).toEqual(true);
  });

  it(`determines args does not contain a "create" field`, () => {
    const args = {
      data: {
        text: 'sample',
        published: true,
        author: { connect: { id: 1 } },
      },
    };

    expect(containsNestedCreate(args)).toEqual(false);
  });
});
