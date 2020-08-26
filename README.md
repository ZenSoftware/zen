# ⛩ Zen ⛩ Nest + Angular - Modern, Full Stack, Web Portal Starter Project
## 🤹 Currently under development 🌱

---

## GraphQL Ambitions
- [ ] [Nest GraphQL](https://docs.nestjs.com/graphql/resolvers) resolvers as a gateway to [Prisma Client](https://www.prisma.io/docs/understand-prisma/prisma-in-your-stack/graphql).

- [ ] [Prisma relay cursor connections](https://github.com/devoxa/prisma-relay-cursor-connection#readme) for robust, and correct pagination of data.
- [ ] [PrismaSelect](https://paljs.com/plugins/select/) to solve the N+1 problem.
- [ ] [PrismaDelete](https://paljs.com/plugins/delete) to add `CASCADE` and `SET_NULL` deletion capabilities to Prisma. These features have yet to be implemented by the core Prisma team.  This project will convert to the approach directly supported by Prisma when the official feature becomes available.
- [ ] [Nest GraphQL SDL generation](https://docs.nestjs.com/graphql/generating-sdl) to enable auto-completion in the creation of GraphQL queries by using something like [Apollo extension for VS Code](https://www.apollographql.com/docs/devtools/editor-plugins/)
- [ ] [Code generation](https://graphql-code-generator.com/docs/plugins/typescript-apollo-angular) of [apollo-angular](https://www.apollographql.com/docs/angular/) services to enable simple, type safe access to the GraphQL API within Angular.
---

## API Authentication, Performance & Scaling Ambitions
- [ ] [Nest authentication](https://docs.nestjs.com/techniques/authentication) integration, user creation, and login system designed specifically to work with an [Angular SPA (single page application)](https://angular.io/).  This project will provide responsive, "mobile first" interfaces for the varying authentication components (register, sign-up, & login).  
- [ ] Angular route guards and Angular directives to show/hide content depending on user permissions.
- [ ] [Nest authorization directives](https://docs.nestjs.com/techniques/authentication#extending-guards) for server side [role-based access control](https://en.wikipedia.org/wiki/Role-based_access_control?oldformat=true) to allow for declarative, fine grained security control over all GraphQL queries and mutations.
- [ ] For performance reasons, the [Nest Fastify adapter](https://docs.nestjs.com/techniques/performance#performance-fastify) has been chosen over the Express adapter.
- [ ] 100% stateless authentication system using [JWT (Javascript Web Tokens)](https://docs.nestjs.com/techniques/authentication#jwt-functionality) to enable horizontal scaling of container replicas of the Nest api in production.

---

## Modern Web Components and Styling Ambitions
- [x] SASS chosen as the css transpiler of choice
- [ ] [Angular Material](https://material.angular.io/) components & theme.
- [ ] Directly import [Bootstrap reset, utilities, & grid](https://www.amadousall.com/the-good-parts-of-bootstrap-4-you-are-missing-in-your-angular-material-projects/) features through SASS imports, and excluding the Bootstrap theme and component styles. These features are missing from Angular Material, and greatly simplify the creation of responsive, mobile first, Angular apps.

---

## Project & Dev Tools Ambitions

- [x] [Nx for project management](https://nx.dev/angular) to allow for the use of [Nx Console extensions for VSCode](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console).  Nx Console is a GUI interface for monorepos that adds a lot of modern developer conveniences.  It also helps to simplify the use of the various Angular & Nest code generation schematics available in the ecosystem.
- [x] [Angular Language Service for VSCode](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) for modern IDE tooling.
- [x] NPM scripts for versioned releases of the **api** server as a containerized Docker image.  [node:14-alpine](https://hub.docker.com/_/node?tab=description&ref=hackernoon.com) is used for the Docker container base image, and the appropriate `tsconfig.app.json` configurations are being applied for use with Node v14 Nest application.
- [x] Enforced code formatting using [Prettier](https://prettier.io/) & [import-sort](https://www.npmjs.com/package/prettier-plugin-import-sort), guaranteeing all contributions to the project are standardized with predictable structure, and clear legibility.
- [ ] [Compodoc](https://docs.nestjs.com/recipes/documentation) to generate Nest & Angular documentation.
