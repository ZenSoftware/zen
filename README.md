# ⛩ Zen ⛩ 
#### Nest + Prisma + Angular 🏮 Full Stack Starter Kit 

---

## 🏯 Project Founder's Notes

What is really nice about Nest and Angular is that their programming idioms carry over seamlessly between the two, allowing for front-end devs to contribute to the back-end.  Though, there are complexities in creating the GraphQL endpoint that exposes the various CRUD operations over the Prisma data model on the back-end.  If that piece of the problem could be code generated entirely, it would allow for virtually anyone to be a full stack developer.  A combination between Nest + Prisma + Angular has provided for new capabilities that the industry has not really seen before. This project code generates all the boilerplate required in bridging these 3 technologies together.

There is a tremendous amount of value to be gained by treating the `schema.prisma` file as the single source of truth, and then code generating everything else from that.  It guarantees consistency between the front-end and back-end.  It also centralizes the CRUD operations over all the Prisma models via a single import endpoint.

This project also provides solutions for the hardest parts of user authentication as well.  I have strictly kept to the Angular and Nest best practices that are being utilized within the ecosystem.  This project is an attempt to package the sum total of all the lessons I have learned, and making it publicly available to the community.  All the services being generated should be fairly self explanatory, and lots of useful NPM scripts have been provided for the various stages of development to deployment.  Better documentation will come with time. 🍜

New contributors are welcome!

> 🎐 "Give more than you take" ~ Peter Hoang

---

## 🍣 Project Setup Instructions - [GitHub Repo](https://github.com/ZenSoftware/Zen)

**Requirements**

- [Node v16](https://nodejs.org/)
- [Docker](https://www.docker.com/)

```bash
# Project setup steps
git clone https://github.com/ZenSoftware/zen.git --depth=1
cd zen
# Rename .env.example to .env
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

- [x] [Nest GraphQL](https://docs.nestjs.com/graphql/resolvers) resolvers as a gateway to [Prisma Client](https://www.prisma.io).
- [x] [Apollo GraphQL SDL bindings to Prisma](https://paljs.com/generator/sdl) generated via [Pal.js CLI](https://paljs.com/cli/generator)!  Thank you [**@AhmedElywa**](https://github.com/paljs) 🎎
- [x] [PrismaSelect](https://paljs.com/plugins/select/) to solve the N+1 problem for all queries for free.
- [x] Custom npm scripts to code generate the Nest GraphQL gateway on Prisma schema changes.
- [x] [Code generation](https://graphql-code-generator.com/docs/plugins/typescript-apollo-angular) of [apollo-angular](https://www.apollographql.com/docs/angular/) services to enable simple, type safe access to the GraphQL API within Angular. 🎀 Modern dev tooling configured for the project, allowing for [Apollo extension for VS Code](https://www.apollographql.com/docs/devtools/editor-plugins/) to provide auto-completion within `gql` tags for all `.ts` files. 
- [x] An Angular `GraphQLModule` to simplify the configuration of the `ApolloClient` to enable/disable the varying `ApolloLink` features.
  - [x] [HttpBatchLink](https://apollo-angular.com/docs/data/network#httpclient-1) for batching several GraphQL requests that occur within a short debounce interval. This really helps to alleviate network congestion.
  - [x] [UploadLink](https://www.npmjs.com/package/apollo-upload-client) to give `ApolloClient` HTTP multi-part form requests capabilities. Enabling the uploading of files via [GraphQLUpload](https://github.com/jaydenseric/graphql-upload).
  - [x] [WebSocketLink](https://www.apollographql.com/docs/react/data/subscriptions/#2-initialize-a-websocketlink) for GraphQL subscriptions over websockets.

---

## 🍱 API Authentication, Performance & Scaling

- [X] [Nest authentication](https://docs.nestjs.com/techniques/authentication), user registration, and login system designed specifically to work for an [Angular SPA (single page application)](https://angular.io/). This project will provide responsive, "mobile first" interfaces for the standard set of authentication features.
- [X] `New account component`
- [x] `Login component` with remember me option
- [X] `Forgot password component` and full password reset flow.
- [X] `Password change component` for user dashboards
- [X] `Angular route guards` and `Angular directives` to show/hide content depending on user's roles.
- [X] [Nest authorization directives](https://docs.nestjs.com/techniques/authentication#extending-guards) for server side [role-based access control](https://en.wikipedia.org/wiki/Role-based_access_control?oldformat=true) to allow for declarative, fine grained security control over all GraphQL queries and mutations. Follow the [Git Issue here](https://github.com/ZenSoftware/Zen/issues/7).
- [x] 100% stateless web server authentication via [JWT (Javascript Web Tokens)](https://docs.nestjs.com/techniques/authentication#jwt-functionality). Keeping the API stateless enables horizontal scaling of container replicas in production.

---

## 🍵 Modern Web Components and Responsive UIs

- [x] SASS chosen as the CSS transpiler of choice
- [x] [Angular Material](https://material.angular.io/) components & theme.
- [X] Mobile first approach to build the framework's core components (login form, etc).
- [x] Directly import [Bootstrap reset, utilities, & grid](https://www.amadousall.com/the-good-parts-of-bootstrap-4-you-are-missing-in-your-angular-material-projects/) features through SASS imports, and exclude the Bootstrap theme and conflicting component styles. These features are missing from Angular Material, and greatly simplify the creation of responsive, mobile first applications.
- [x] [Bootswatch](https://bootswatch.com/) SASS variables integrated for an assortment of well-built dark and light Bootstrap themes available to choose from.
- [x] [Angular Material Design Palette Generator](http://mcg.mbitson.com/) simplifies choosing any primary and accent Material Design colors for the app.

---

## 🍡 Project & Dev Tools

- [x] [Nx for project management](https://nx.dev/angular) to allow for the use of [Nx Console extensions for VSCode](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console). Nx Console is a GUI interface for monorepos that adds a lot of modern developer conveniences. It also helps to simplify the use of the various Angular & Nest code generation schematics available in the ecosystem.
- [x] Strict typings with Typescript for everything.  Even the code generation tools are written in Typescript.
- [x] [Angular Language Service for VSCode](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) for modern IDE tooling.
- [x] NPM scripts for versioned releases of the Nest **api** server as a containerized Docker image. [node:16-alpine](https://hub.docker.com/_/node?tab=description&ref=hackernoon.com) is used as the Docker container base image, and the appropriate `tsconfig.app.json` configurations are being applied for the Nest app.
- [x] Example [Kubernetes](https://kubernetes.io/) deployment scripts
- [x] Enforced code formatting via [Prettier](https://prettier.io/) & [import-sort](https://www.npmjs.com/package/prettier-plugin-import-sort), guaranteeing all contributions to the project are standardized with predictable structure, and clear legibility.
- [X] [@nest-modules/mailer](https://www.npmjs.com/package/@nest-modules/mailer) for automated emailing, and pre-configured [Handlebars e-mail templates](https://handlebarsjs.com/guide/#what-is-handlebars) for the various web portal's emailing needs. Handlebars has similar double bracket `{{contextField}}` template interpolation, akin to Angular templates. Custom HTML e-mail triggers within Nest are made very simple by simply passing a `JSON context` and the template's `file name` as parameters to the class injectable `MailService`.  The [apps/api/src/app/mail/templates](https://github.com/ZenSoftware/Zen/tree/main/apps/api/src/app/mail/templates) directory is a **conventions first approach**.
- [x] [Compodoc](https://compodoc.app/) to generate Nest & Angular documentation.
