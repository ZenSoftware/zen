# ⛩ Zen ⛩
## Modern Full Stack Web Portal built with Nest and Angular
### 🤹 Currently under development - New contributors are welcome!🌱
You may open a git issue if you are interested in contributing! 🍰

<div style="text-align:center">
<a href="https://zensoftware.github.io/Zen/" target="_blank"><h4>Zen Docs<h4></a>

<a href="https://github.com/ZenSoftware/Zen" target="_blank"><h4>GitHub repo ZenSoftware/Zen<h4></a>
</div>

---

## GraphQL Ambitions
- [X] [Nest GraphQL](https://docs.nestjs.com/graphql/resolvers) resolvers as a gateway to [Prisma Client](https://www.prisma.io/docs/understand-prisma/prisma-in-your-stack/graphql).
- [X] [Prisma Case Insensitive Filtering](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/case-sensitivity) For case-insensitive querying of text.
- [X] [PrismaSelect](https://paljs.com/plugins/select/) to solve the N+1 problem for all queries for free.
- [X] [PrismaDelete](https://paljs.com/plugins/delete) to add `CASCADE` and `SET_NULL` deletion capabilities to Prisma. These features have yet to be implemented by the core Prisma team.  This project will convert to the approach directly supported by Prisma when the official feature becomes available.
- [X] [Nest GraphQL SDL generation](https://docs.nestjs.com/graphql/generating-sdl) to enable auto-completion using a tool like [Apollo extension for VS Code](https://www.apollographql.com/docs/devtools/editor-plugins/)
- [X] [Code generation](https://graphql-code-generator.com/docs/plugins/typescript-apollo-angular) of [apollo-angular](https://www.apollographql.com/docs/angular/) services to enable simple, type safe access to the GraphQL API within Angular. 🎀
- [X] An Angular `GraphQLModule` to simplify the configuration of the `ApolloClient` to enable/disable the varying `ApolloLink` features.
- [X] [HttpBatchLink](https://apollo-angular.com/docs/data/network#httpclient-1) for batching several GraphQL requests that occur within a short debounce interval. This really helps to alleviate network congestion.
- [X] [UploadLink](https://www.npmjs.com/package/apollo-upload-client) to give `ApolloClient` HTTP multi-part form requests capabilities.  Enabling the uploading of files via `GraphQLUpload`.
- [X] [WebSocketLink](https://www.apollographql.com/docs/react/data/subscriptions/#2-initialize-a-websocketlink) for GraphQL subscriptions over websockets.
---

## API Authentication, Performance & Scaling Ambitions
- [ ] [Nest authentication](https://docs.nestjs.com/techniques/authentication) integration, user creation, and login system designed specifically to work for an [Angular SPA (single page application)](https://angular.io/).  This project will provide responsive, "mobile first" interfaces for the standard set of authentication features (sign up, login, password change).  
- [ ] Angular route guards and Angular directives to show/hide content depending on user permissions.
- [ ] [Nest authorization directives](https://docs.nestjs.com/techniques/authentication#extending-guards) for server side [role-based access control](https://en.wikipedia.org/wiki/Role-based_access_control?oldformat=true) to allow for declarative, fine grained security control over all GraphQL queries and mutations.
- [x] 100% stateless web server authentication via [JWT (Javascript Web Tokens)](https://docs.nestjs.com/techniques/authentication#jwt-functionality). Keeping the API stateless will enable horizontal scaling of container replicas of the api in production.

---

## Modern Web Components and Styling Ambitions
- [x] SASS chosen as the css transpiler of choice
- [ ] [Angular Material](https://material.angular.io/) components & theme.
- [ ] Directly import [Bootstrap reset, utilities, & grid](https://www.amadousall.com/the-good-parts-of-bootstrap-4-you-are-missing-in-your-angular-material-projects/) features through SASS imports, and exclude the Bootstrap theme and component styles. These features are missing from Angular Material, and greatly simplify the creation of responsive, mobile first applications.

---

## Project & Dev Tools Ambitions

- [x] [Nx for project management](https://nx.dev/angular) to allow for the use of [Nx Console extensions for VSCode](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console).  Nx Console is a GUI interface for monorepos that adds a lot of modern developer conveniences.  It also helps to simplify the use of the various Angular & Nest code generation schematics available in the ecosystem.
- [x] [Angular Language Service for VSCode](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) for modern IDE tooling.
- [x] NPM scripts for versioned releases of the **api** server as a containerized Docker image.  [node:14-alpine](https://hub.docker.com/_/node?tab=description&ref=hackernoon.com) is used as the Docker container base image, and the appropriate `tsconfig.app.json` configurations are being applied for the Node v14 Nest app.
- [x] Enforced code formatting via [Prettier](https://prettier.io/) & [import-sort](https://www.npmjs.com/package/prettier-plugin-import-sort), guaranteeing all contributions to the project are standardized with predictable structure, and clear legibility.
- [X] [Compodoc](https://compodoc.app/) to generate Nest & Angular documentation.
