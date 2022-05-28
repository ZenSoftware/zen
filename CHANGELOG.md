## 6.0.0 (2022-05-28)

### Refactor

- **enum-helper**: renamed toKeyValueArray to keyValues
- **main**: simplified routing
- **zen-main**: renamed MainModule to ZenMainModule
- **auth**: moved auth.controller into auth folder
- **auth**: organized auth folder
- **api/controllers**: made test dependent on code

### BREAKING CHANGE

- renamed EnumHelper.toKeyValueArray to EnumHelper.keyValues

### Feat

- **auth**: added canActivateChild to RolesGuard
- **auth**: option to disable Google sign in
- **auth**: allowAnonymous decorator integrated
- **auth**: general purpose RolesGuard introduced

### Fix

- **graphql**: allow nulls to be passed to makeSetObject
- **auth**: ForbidNestedCreateGuard connectOrCreate & upsert
- **theme**: added missing /font sub path
- **apollo**: regenerate new types after Google OIDC integration
- reverted changes to Environment intended for k8s testing
- **auth**: fixed loading jwtOptions
- **auth**: fixed zen-register-form tests
- **prisma**: removed connecting to prisma upon Nest bootstrapping phase in favor of lazy connection
- **prisma**: wrap $connect() in try/catch to not exit Nest on failed DB connection
- **k8s**: fixed incorrect key values
- **api**: import dotenv the ES6 way to fix tests
- **zen-graphql**: substituted deprecated WS option isFatalConnectionProblem with shouldRetry

## z5.0.4 (2022-05-16)

### Feat

- **zen-login-link**: hide link if already on login page
- **auth**: expose userId through AuthService
- **google identity**: integrated sign in with Google
- **isstringnumber**: renamed isNumber() to isStringNumber()
- **trimobjectstrings**: added option to conver empty strings to undefined
- **api/graphql**: upload an array of files with graphql

### Refactor

- **auth**: Refactored guards returning URLTree
- **login-confirmed**: Refactored component code into a guard
- **auth**: exposed validation pipes
- **portal/auth**: renamed onSubmit() to submit()
- **sampleuploadmany**: simplified sampleUploadMany example

### Fix

- **theme**: fixed height issues with theme and <zen-layout>

### BREAKING CHANGE

- graphqlUploadExpress was refactored to be a Nest MiddlewareConsumer.  FileInfo was
refactored to FileUpload.

## z4.2.0 (2022-05-15)

### Feat

- **api/guards**: renamed RejectNestedCreateGuard to ForbidNestedCreateGuard & added options

### BREAKING CHANGE

- Renamed RejectNestedCreateGuard to ForbidNestedCreateGuard

### Refactor

- **api/guards**: implements CanActivate

### Fix

- **api/guards**: fixed null exception

## z4.1.0 (2022-05-15)

### Feat

- **api/guards**: integrated RejectNestedCreateGuard

### Refactor

- **api/guards**: moves guards into their own folder
- **codegen**: renamed PRISMA_TYPE_DEFS to PALJS_TYPE_DEFS

## z4.0.0 (2022-05-15)

## z3.2.0 (2022-05-15)

## z3.0.8 (2022-05-15)

## z3.0.0 (2022-05-15)

## z2.1.0 (2022-05-15)

## z2.0.0 (2022-05-15)

## z1.3.0 (2022-05-15)

## z1.2.1 (2022-05-15)

## z1.2.0 (2022-05-15)

## z1.1.1 (2022-05-15)

## z1.0.0 (2022-05-15)

## z0.3.0 (2022-05-15)

## z0.2.3 (2022-05-15)

## z0.2.2 (2022-05-15)

## z0.2.1 (2022-05-15)

## z0.2.0 (2022-05-15)

## z0.1.0 (2022-05-15)
