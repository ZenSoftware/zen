# ⛩ Zen ⛩

#### Nest + Prisma + Angular 🏮 Full Stack GraphQL Starter Kit

---

What is really nice about Nest and Angular is that their programming idioms carry over seamlessly between the two, allowing for frontend devs to contribute to the backend. Though, there are complexities in creating the GraphQL endpoint that exposes the various CRUD operations over the Prisma data model on the backend.  A combination between Nest + Prisma + Angular has provided for new capabilities that the industry has not really seen before. This project code generates all the boilerplate required in bridging these 3 technologies together.

There is a tremendous amount of value to be gained by treating the `schema.prisma` file as the single source of truth and then code generating everything else from that. It guarantees consistency between the frontend and backend. It also centralizes the CRUD operations over all the Prisma models via a single import endpoint.

This project also provides solutions for the hardest parts of user authentication as well. I have strictly kept to the Angular and Nest best practices that are being utilized within the ecosystem. This project is an attempt to package the sum total of all the lessons I have learned and making it publicly available to the community. All the services being generated should be fairly self explanatory and lots of useful npm scripts have been provided for the various stages of development to deployment. Better documentation will come with time. 🍜

> 🎐 New contributors are welcome!

---

## 🍣 Project Setup Instructions - [GitHub Repo](https://github.com/ZenSoftware/Zen)

**Requirements**

- [Node v18](https://nodejs.org/)
- [Docker](https://www.docker.com/) or [Rancher Desktop](https://rancherdesktop.io/)

```bash
# Project setup steps
git clone https://github.com/ZenSoftware/zen.git --depth=1
cd zen
cp .env.example .env

# Substitute npm for pnpm if you are using that
npm i
docker-compose up -d
npm run prisma:migrate
```

```bash
# Start the Nest API
npm run start:api

# Start the Angular site at localhost:4200
npm start
```

```bash
# Reload Apollo VSCode extension via command palette
>Apollo: Reload schema
```

---

## 🥢 GraphQL Features

- [x] [Nest GraphQL](https://docs.nestjs.com/graphql/resolvers) resolvers to [Prisma Client](https://www.prisma.io).
- [x] [Apollo GraphQL SDL bindings to Prisma](https://paljs.com/generator/sdl) generated via [Pal.js CLI](https://paljs.com/cli/generator)! Thank you [**@AhmedElywa**](https://github.com/paljs) 🎎
- [x] [PrismaSelect](https://paljs.com/plugins/select/) to eliminate overfetching.  Queries are delegated to Prisma which solve the GraphQL N+1 problem for free.
- [x] Custom npm scripts to code generate the Nest GraphQL api on Prisma schema changes.
- [x] [@graphql-codegen/typescript-apollo-angular](https://graphql-code-generator.com/docs/plugins/typescript-apollo-angular) of [apollo-angular](https://www.apollographql.com/docs/angular/) services to enable simple, type safe access to the GraphQL API within Angular. 🎀 Modern dev tooling configured for the project, allowing for [Apollo extension for VS Code](https://www.apollographql.com/docs/devtools/editor-plugins/) to provide auto-completion within `gql` tags for all `.ts` files.
- [x] An Angular `GraphQLModule` to simplify the configuration of the `ApolloClient` to enable/disable the varying `ApolloLink` features.
  - [x] [HttpBatchLink](https://apollo-angular.com/docs/data/network#httpclient-1) for batching several GraphQL requests that occur within a short debounce interval. This really helps to alleviate network congestion.
  - [x] [UploadLink](https://www.npmjs.com/package/apollo-upload-client) to give `ApolloClient` HTTP multi-part form requests capabilities. Enabling the uploading of files via [GraphQLUpload](https://github.com/jaydenseric/graphql-upload).
  - [x] [GraphQLWsLink](https://www.apollographql.com/docs/react/data/subscriptions/#2-initialize-a-graphqlwslink) for GraphQL subscriptions over websockets.

---

## 🍱 API Authentication, Performance & Scaling

- [x] [Nest authentication](https://docs.nestjs.com/techniques/authentication), user registration and login system designed specifically to work for an [Angular SPA (single page application)](https://angular.io/). This project provides responsive, "mobile first" interfaces for the standard set of authentication features.
- [x] `New account component`
- [x] `Login component` with remember me option.
- [x] `Sign in with Google` via OpenID Connect.
- [x] `Forgot password component` and full password reset flow.
- [x] `Password change component` for user dashboards.
- [x] [Nest guards & directives](https://github.com/ZenSoftware/zen/blob/base/apps/api/src/app/auth) for both RBAC & ABAC authorization schemes.  ABAC is implemented with [@casl/prisma](https://casl.js.org/v6/en/package/casl-prisma) & [@casl/angular](https://casl.js.org/v6/en/package/casl-angular).  The user's CASL rules are sent from the server to the client and updates the `@casl/angular` ability.  This unifies the permissions across both the server and the client. Fully exploiting CASL's isomorphic capabilities.
- [x] `Angular route guards` and `Angular directives` to show/hide content depending on the user's roles or CASL abilities.

---

## 🍵 Modern Web Components and Responsive UIs

- [x] SASS chosen as the CSS transpiler of choice.
- [x] [Angular Material](https://material.angular.io/) components & theme.
- [x] Mobile first approach to build the framework's core components (login form, etc).
- [x] Directly import [Bootstrap reset, utilities, & grid](https://www.amadousall.com/the-good-parts-of-bootstrap-4-you-are-missing-in-your-angular-material-projects/) features through SCSS imports and exclude the Bootstrap theme and conflicting component styles. These features are missing from Angular Material and greatly simplify the creation of responsive, mobile first applications.
- [x] [Bootswatch](https://bootswatch.com/) SCSS variables integrated for a large assortment of high quality color themes to choose from.

---

### 🎏 Optional Tech Integrations

- [x] [Electron](https://www.electronjs.org/) branch with new npm script `npm run start:electron` to launch the app within Electron.
- [ ] [Capacitor](https://capacitorjs.com/) branch - planned
- [x] [SocketIO](https://socket.io/) branch demonstrates how to implement a Nest WebSocket Gateway with user authentication.
- [x] [Kendo UI](https://www.telerik.com/kendo-angular-ui/components/grid/) branch - which includes [@zen/grid](https://github.com/ZenSoftware/zen/tree/kendo/libs/grid).  `<zen-grid>` renders robust and reliable data grids over all of the Prisma models within the project, with minimal configuration needed.
- [x] [OpenTelemetry](https://opentelemetry.io/) branch demonstrates how to integrate and expose telemetry data for the API server.

---

## 🍡 Developer Operations

- [x] [Nx for project management](https://nx.dev/angular) to allow for the use of [Nx Console extensions for VSCode](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console). Nx Console is a GUI interface for monorepos that adds a lot of modern developer conveniences. It also helps to simplify the use of the various Angular & Nest code generation schematics available in the ecosystem.
- [x] Strict typings with Typescript for everything. Even the code generation tools are written in Typescript.
- [x] [Angular Language Service for VSCode](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) for modern IDE tooling.
- [x] npm scripts for versioned releases of the Nest **api** server as a containerized Docker image. [node:18-alpine](https://hub.docker.com/_/node?tab=description&ref=hackernoon.com) is used as the Docker container base image and the appropriate `tsconfig.app.json` configurations are being applied for the Nest app.
- [x] Example [Kubernetes](https://kubernetes.io/) deployment scripts.
- [x] Enforced code formatting via [Prettier](https://prettier.io/) & [import-sort](https://www.npmjs.com/package/prettier-plugin-import-sort), guaranteeing all contributions to the project are standardized with predictable structure and clear legibility.
- [x] [Commitizen](https://github.com/commitizen/cz-cli) for standardizing git commits.
- [x] [@nestjs-modules/mailer](https://github.com/nest-modules/mailer) for automated emailing and pre-configured [Handlebars e-mail templates](https://handlebarsjs.com/guide/#what-is-handlebars) for the various web portal's emailing needs. Handlebars has similar double bracket `{{contextField}}` template interpolation, akin to Angular templates. Custom HTML e-mail triggers within Nest are made very simple by simply passing a `JSON context` and the template's `filename` as parameters to the class injectable `MailService`.
