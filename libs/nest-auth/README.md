# Nest Authorization

The `@zen/nest-auth` library contains the common guards & decorators needed to implement authorization for a Nest app. The library implements both Role-based access control (RBAC) and Attributes-based access control (ABAC). All guards and decorators work with both HTTP & GraphQL.

## ABAC
[@casl/prisma](https://casl.js.org/v6/en/package/casl-prisma) is used to implement ABAC over the Prisma models for a given Nest app. The npm script `gen:api` will generate the typings necessary to define CASL abilities with strict typings. There are two source files that centralize the configuration of CASL for the API. These are `casl.factory.ts` & `default-fields.ts`.

`apps/api/src/app/auth/casl/casl.factory.ts`
```ts
export class AppCaslFactory extends CaslFactory {
  async createAbility(user: RequestUser<Role>) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    if (user.roles.includes('Super')) {
      can('manage', 'all');
    } else {
      // ... Customize user permissions here
    }

    return build();
  }
}
```

Default fields must be defined explicitly to be included during Prisma queries to ensure that they exist during authorization.  Any fields that CASL ability rules are based on should be included here.  As an example:

`apps/api/src/app/auth/casl/default-fields.ts`
```ts
import { DefaultFields } from '../../prisma';

const defaultFields: DefaultFields = {
  User: { id: true, roles: true },
  Blog: { authorId: true },
  ...
};
```

You can then utilize `CaslGuard` in conjunction with the parameter decorator `CaslAbility` to inject the current user's ability.

```ts
@UseGuards(CaslGuard)
async updateBlog(
  @CaslAbility() ability: AppAbility,
) { 
  if(ability.can('update', subject('Blog', { authorId: 'abc123' }))) {
    ...
  }
}
```

To get all the records from the database the user has access to, you can utilize the parameter decorator `CaslAccessible`.

```ts
@UseGuards(CaslGuard)
async getBlogs(
  @CaslAccessible('Blog') accessibleWhereInput: Prisma.BlogWhereInput
) { 
  const accessibleBlogs = await prisma.blog.findMany({
    where: {
      AND: [
        accessibleWhereInput,
        { /* business related conditions */ }
      ]
    }
  });
}
```
---
## RBAC
```js
// @todo write RBAC docs
```
