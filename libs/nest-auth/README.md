# Nest Authorization

The `@zen/nest-auth` library contains the common guards & decorators needed to implement authorization for a Nest app. The library implements both Role-based access control (RBAC) and Attributes-based access control (ABAC). All guards and decorators work with both HTTP & GraphQL.  Utilizing JWTs, the Authorization is 100% stateless allowing for horizontal scaling of container replicas in production.

---
## RBAC

`RolesGuard` verifies that the JWT passes verification, extracts the `RequestUser` from the JWT payload and makes it available to be injected via the `CurrentUser` parameter decorator. `RolesGuard` takes a list of roles for its parameters and checks if the user has at least one of them. The list of static roles for the project can be editted at `libs/common/src/lib/role.ts`.  The following will require the user to have either the `Admin` or `Moderator` roles.

```ts
@UseGuards(RolesGuard('Admin', 'Moderator'))
accountInfo(@CurrentUser() user: RequestUser) { ... }
```

The following will require the user to have both the `Admin` and `Moderator` roles.

```ts
@UseGuards(RolesGuard('Admin'), RolesGuard('Moderator'))
accountInfo(@CurrentUser() user: RequestUser) { ... }
```

If no roles are passed as parameters, it will only verify that the request has a valid JWT and extracts the `RequestUser` to be ready for injection via `CurrentUser`.

```ts
@UseGuards(RolesGuard())
accountInfo(@CurrentUser() user: RequestUser) { ... }
```

The `AllowAnonymous` decorator allows access for non-authenticated users to individual endpoints. Works with both `RolesGuard` and `CaslGuard`.  The following will allow non-authenticated users access to the `getBlog` endpoint but require a user to have the `Moderator` role for the `editBlog` endpoint.

```ts
@Controller('blog')
@UseGuards(RolesGuard('Moderator'))
export class BlogController {
  @Get()
  @AllowAnonymous()
  getBlog() { ... }
  
  @Put()
  editBlog() { ... }
}
```

---

## ABAC
[@casl/prisma](https://casl.js.org/v6/en/package/casl-prisma) is used to implement ABAC over the Prisma schema. The npm script `gen:api` will generate the typings necessary to define CASL abilities with strict typings. There are two source files that centralize the configuration of CASL for the API. These are `casl.factory.ts` & `default-fields.ts`.

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

A powerful feature of tightly integrating CASL with Prisma is the ability to simply get all the records from the database the user has access to.  You can utilize the parameter decorator `CaslAccessible` that takes a Prisma model name as a parameter. It will construct the WhereInput given the defined `read` abilities defined in the CASL factory above.  You can then apply the WhereInput as an `AND` condition in your Prisma query to narrow queries to only accessible records the user has access to.

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

