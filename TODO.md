# ⛩ Zen ⛩
#### TODO:
- [X] Refactor authorization flows to work with the user's username instead of email
- [x] Make emails unique errors
- [x] Build welcome email trigger
- [X] Include a K8S secrets example
- [ ] Build a password change form
- [ ] Create a GraphQLUpload example
- [ ] Create a GraphQL subscription example
- [X] Take lazy loading structure from Tu, to load the portal seperately from the Main module.
  - [X] Seperate all of ZenPortal module to lazy load seperately
  - [X] Setup lazy loading of zen-super module
- [ ] Consider extracting out portal settings with a database seed, via Prisma migrate.
  - [ ] Sign-up via email vs username
  - [ ] Configure JWT expiresIn time
- [ ] Research NEST request throttling over specific mutations
  - [ ] Throttling decorators that take a `{ timeFrame: number; maxRequests: number; }`
- [ ] Build <zen-errors> under @zen/components to NgModel bind to GqlErrors