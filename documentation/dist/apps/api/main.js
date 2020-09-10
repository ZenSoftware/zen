(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/api/src/app/app.module.ts":
/*!****************************************!*\
  !*** ./apps/api/src/app/app.module.ts ***!
  \****************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./apps/api/src/app/config/index.ts");
/* harmony import */ var _graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphql */ "./apps/api/src/app/graphql/index.ts");
/* harmony import */ var _jwt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./jwt */ "./apps/api/src/app/jwt/index.ts");
/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./prisma */ "./apps/api/src/app/prisma/index.ts");






let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_config__WEBPACK_IMPORTED_MODULE_2__["ConfigModule"], _jwt__WEBPACK_IMPORTED_MODULE_4__["JwtModule"], _graphql__WEBPACK_IMPORTED_MODULE_3__["ZenGraphQLModule"], _prisma__WEBPACK_IMPORTED_MODULE_5__["PrismaModule"]],
    })
], AppModule);



/***/ }),

/***/ "./apps/api/src/app/auth/auth.module.ts":
/*!**********************************************!*\
  !*** ./apps/api/src/app/auth/auth.module.ts ***!
  \**********************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jwt */ "./apps/api/src/app/jwt/index.ts");
/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../prisma */ "./apps/api/src/app/prisma/index.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.service */ "./apps/api/src/app/auth/auth.service.ts");
/* harmony import */ var _gql__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gql */ "./apps/api/src/app/auth/gql/index.ts");
/* harmony import */ var _jwt_strategy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./jwt.strategy */ "./apps/api/src/app/auth/jwt.strategy.ts");








let AuthModule = class AuthModule {
};
AuthModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtModule"], _prisma__WEBPACK_IMPORTED_MODULE_4__["PrismaModule"], _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["PassportModule"].register({ defaultStrategy: 'jwt' })],
        providers: [_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"], _jwt_strategy__WEBPACK_IMPORTED_MODULE_7__["JwtStrategy"], _gql__WEBPACK_IMPORTED_MODULE_6__["GqlGuard"]],
        exports: [_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtModule"], _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["PassportModule"], _gql__WEBPACK_IMPORTED_MODULE_6__["GqlGuard"], _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]],
    })
], AuthModule);



/***/ }),

/***/ "./apps/api/src/app/auth/auth.service.ts":
/*!***********************************************!*\
  !*** ./apps/api/src/app/auth/auth.service.ts ***!
  \***********************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "./apps/api/src/app/config/index.ts");
/* harmony import */ var _jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jwt */ "./apps/api/src/app/jwt/index.ts");
var _a, _b;




let AuthService = class AuthService {
    constructor(jwtService, config) {
        this.jwtService = jwtService;
        this.config = config;
    }
    setJwtCookie(res, user, rememberMe = false) {
        if (typeof rememberMe === 'string') {
            rememberMe = rememberMe === 'true';
        }
        const jwtPayload = {
            id: user.id,
            roles: user.roles ? user.roles.toString() : undefined,
        };
        const expiresIn = rememberMe
            ? this.config.rememberMeExpiresIn
            : this.config.jwtOptions.signOptions.expiresIn;
        const maxAge = expiresIn * 1000;
        const token = this.jwtService.sign(jwtPayload, { expiresIn });
        const cookieOptions = {
            maxAge,
            secure: this.config.production,
            sameSite: this.config.production ? 'strict' : 'lax',
            domain: this.config.cookieDomain,
        };
        res.cookie('jwt', token, cookieOptions);
        res.cookie('rememberMe', rememberMe, cookieOptions);
        const response = {
            id: user.id,
            maxAge: maxAge.toString(),
            roles: user.roles,
            rememberMe,
        };
        return response;
    }
};
AuthService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _jwt__WEBPACK_IMPORTED_MODULE_3__["JwtService"] !== "undefined" && _jwt__WEBPACK_IMPORTED_MODULE_3__["JwtService"]) === "function" ? _a : Object, typeof (_b = typeof _config__WEBPACK_IMPORTED_MODULE_2__["ConfigService"] !== "undefined" && _config__WEBPACK_IMPORTED_MODULE_2__["ConfigService"]) === "function" ? _b : Object])
], AuthService);



/***/ }),

/***/ "./apps/api/src/app/auth/gql/gql-user.decorator.ts":
/*!*********************************************************!*\
  !*** ./apps/api/src/app/auth/gql/gql-user.decorator.ts ***!
  \*********************************************************/
/*! exports provided: GqlUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GqlUser", function() { return GqlUser; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__);


const GqlUser = Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["createParamDecorator"])((data, context) => {
    const user = _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["GqlExecutionContext"].create(context).getContext().req.user;
    if (!user) {
        throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["UnauthorizedException"]('No user found for request');
    }
    return user;
});


/***/ }),

/***/ "./apps/api/src/app/auth/gql/gql.guard.ts":
/*!************************************************!*\
  !*** ./apps/api/src/app/auth/gql/gql.guard.ts ***!
  \************************************************/
/*! exports provided: GqlGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GqlGuard", function() { return GqlGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_4__);
var _a;





let GqlGuard = class GqlGuard extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"])('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    async canActivate(context) {
        await super.canActivate(context);
        const ctx = _nestjs_graphql__WEBPACK_IMPORTED_MODULE_3__["GqlExecutionContext"].create(context);
        const user = ctx.getContext().req.user;
        const classRoles = this.reflector.get('roles', ctx.getClass());
        const handlerRoles = this.reflector.get('roles', ctx.getHandler());
        let allowedRoles = [];
        if (classRoles)
            allowedRoles = classRoles;
        if (handlerRoles)
            allowedRoles = allowedRoles.concat(handlerRoles);
        if (allowedRoles.length === 0)
            return true;
        return user.roles && user.roles.some((userRole) => allowedRoles.includes(userRole));
    }
    getRequest(context) {
        const ctx = _nestjs_graphql__WEBPACK_IMPORTED_MODULE_3__["GqlExecutionContext"].create(context);
        return ctx.getContext().req;
    }
};
GqlGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _nestjs_core__WEBPACK_IMPORTED_MODULE_2__["Reflector"] !== "undefined" && _nestjs_core__WEBPACK_IMPORTED_MODULE_2__["Reflector"]) === "function" ? _a : Object])
], GqlGuard);



/***/ }),

/***/ "./apps/api/src/app/auth/gql/index.ts":
/*!********************************************!*\
  !*** ./apps/api/src/app/auth/gql/index.ts ***!
  \********************************************/
/*! exports provided: GqlGuard, GqlUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gql_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gql.guard */ "./apps/api/src/app/auth/gql/gql.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GqlGuard", function() { return _gql_guard__WEBPACK_IMPORTED_MODULE_0__["GqlGuard"]; });

/* harmony import */ var _gql_user_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gql-user.decorator */ "./apps/api/src/app/auth/gql/gql-user.decorator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GqlUser", function() { return _gql_user_decorator__WEBPACK_IMPORTED_MODULE_1__["GqlUser"]; });





/***/ }),

/***/ "./apps/api/src/app/auth/index.ts":
/*!****************************************!*\
  !*** ./apps/api/src/app/auth/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return _nestjs_passport__WEBPACK_IMPORTED_MODULE_0__["AuthGuard"]; });

/* harmony import */ var _auth_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.module */ "./apps/api/src/app/auth/auth.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return _auth_module__WEBPACK_IMPORTED_MODULE_1__["AuthModule"]; });

/* harmony import */ var _gql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gql */ "./apps/api/src/app/auth/gql/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GqlGuard", function() { return _gql__WEBPACK_IMPORTED_MODULE_2__["GqlGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GqlUser", function() { return _gql__WEBPACK_IMPORTED_MODULE_2__["GqlUser"]; });

/* harmony import */ var _request_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./request-user */ "./apps/api/src/app/auth/request-user.ts");
/* harmony import */ var _request_user__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_request_user__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _request_user__WEBPACK_IMPORTED_MODULE_3__) if(["AuthGuard","Role","AuthModule","GqlGuard","GqlUser","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _request_user__WEBPACK_IMPORTED_MODULE_3__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _roles_decorator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./roles.decorator */ "./apps/api/src/app/auth/roles.decorator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Roles", function() { return _roles_decorator__WEBPACK_IMPORTED_MODULE_4__["Roles"]; });

/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.service */ "./apps/api/src/app/auth/auth.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]; });

/* harmony import */ var _zen_api_interfaces__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zen/api-interfaces */ "./libs/api-interfaces/src/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return _zen_api_interfaces__WEBPACK_IMPORTED_MODULE_6__["Role"]; });










/***/ }),

/***/ "./apps/api/src/app/auth/jwt.strategy.ts":
/*!***********************************************!*\
  !*** ./apps/api/src/app/auth/jwt.strategy.ts ***!
  \***********************************************/
/*! exports provided: JwtStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtStrategy", function() { return JwtStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! passport-jwt */ "passport-jwt");
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./apps/api/src/app/config/index.ts");
var _a;





let JwtStrategy = class JwtStrategy extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["PassportStrategy"])(passport_jwt__WEBPACK_IMPORTED_MODULE_3__["Strategy"], 'jwt') {
    constructor(config) {
        super({
            secretOrKey: config.production ? config.jwtOptions.publicKey : config.jwtOptions.secret,
            jwtFromRequest: (req) => {
                if (!req.token) {
                    return req.cookies['jwt']; // HTTP request
                }
                else {
                    return req.token; // Websocket connections
                }
            },
        });
        this.config = config;
    }
    async validate(payload) {
        let roles = [];
        if (payload.roles) {
            roles = payload.roles.split(',');
        }
        const user = { id: payload.id, roles };
        return user;
    }
};
JwtStrategy = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _config__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] !== "undefined" && _config__WEBPACK_IMPORTED_MODULE_4__["ConfigService"]) === "function" ? _a : Object])
], JwtStrategy);



/***/ }),

/***/ "./apps/api/src/app/auth/request-user.ts":
/*!***********************************************!*\
  !*** ./apps/api/src/app/auth/request-user.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./apps/api/src/app/auth/roles.decorator.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/auth/roles.decorator.ts ***!
  \**************************************************/
/*! exports provided: Roles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Roles", function() { return Roles; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);

const Roles = (...roles) => Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["SetMetadata"])('roles', roles);


/***/ }),

/***/ "./apps/api/src/app/config/config.module.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/config/config.module.ts ***!
  \**************************************************/
/*! exports provided: ConfigModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigModule", function() { return ConfigModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./apps/api/src/environments/environment.ts");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config.service */ "./apps/api/src/app/config/config.service.ts");




let ConfigModule = class ConfigModule {
};
ConfigModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Global"])(),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        providers: [{ provide: _config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"], useValue: _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"] }],
        exports: [_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"]],
    })
], ConfigModule);



/***/ }),

/***/ "./apps/api/src/app/config/config.service.ts":
/*!***************************************************!*\
  !*** ./apps/api/src/app/config/config.service.ts ***!
  \***************************************************/
/*! exports provided: ConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigService", function() { return ConfigService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment.base */ "./apps/api/src/environments/environment.base.ts");



let ConfigService = class ConfigService extends _environments_environment_base__WEBPACK_IMPORTED_MODULE_2__["EnvironmentBase"] {
};
ConfigService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], ConfigService);



/***/ }),

/***/ "./apps/api/src/app/config/index.ts":
/*!******************************************!*\
  !*** ./apps/api/src/app/config/index.ts ***!
  \******************************************/
/*! exports provided: ConfigModule, ConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.module */ "./apps/api/src/app/config/config.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfigModule", function() { return _config_module__WEBPACK_IMPORTED_MODULE_0__["ConfigModule"]; });

/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.service */ "./apps/api/src/app/config/config.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfigService", function() { return _config_service__WEBPACK_IMPORTED_MODULE_1__["ConfigService"]; });





/***/ }),

/***/ "./apps/api/src/app/graphql/gql-config.service.ts":
/*!********************************************************!*\
  !*** ./apps/api/src/app/graphql/gql-config.service.ts ***!
  \********************************************************/
/*! exports provided: GqlConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GqlConfigService", function() { return GqlConfigService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "./apps/api/src/app/config/index.ts");
/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../prisma */ "./apps/api/src/app/prisma/index.ts");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resolvers */ "./apps/api/src/app/graphql/resolvers/index.ts");
var _a;






let GqlConfigService = class GqlConfigService {
    constructor(config) {
        this.config = config;
    }
    createGqlOptions() {
        return {
            typeDefs: Object(graphql__WEBPACK_IMPORTED_MODULE_2__["print"])(_resolvers__WEBPACK_IMPORTED_MODULE_5__["ALL_TYPE_DEFS"]),
            installSubscriptionHandlers: true,
            debug: !this.config.production,
            playground: this.config.graphql.playground,
            introspection: this.config.graphql.playground,
            tracing: this.config.graphql.playground,
            cors: this.config.production ? undefined : { credentials: true, origin: true },
            context: ctx => {
                return ctx.connection
                    ? { ...ctx, req: ctx.connection.context, prisma: new _prisma__WEBPACK_IMPORTED_MODULE_4__["PrismaService"]() }
                    : { ...ctx, prisma: new _prisma__WEBPACK_IMPORTED_MODULE_4__["PrismaService"]() };
            },
            uploads: {
                maxFileSize: 20000000,
                maxFiles: 5,
            },
        };
    }
};
GqlConfigService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _config__WEBPACK_IMPORTED_MODULE_3__["ConfigService"] !== "undefined" && _config__WEBPACK_IMPORTED_MODULE_3__["ConfigService"]) === "function" ? _a : Object])
], GqlConfigService);



/***/ }),

/***/ "./apps/api/src/app/graphql/index.ts":
/*!*******************************************!*\
  !*** ./apps/api/src/app/graphql/index.ts ***!
  \*******************************************/
/*! exports provided: ZenGraphQLModule, NEST_RESOLVERS, NEST_TYPE_DEFS, ALL_TYPE_DEFS, GRAPHQL_SCHEMA, PRISMA_SCHEMA, WriteGraphQLSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _zen_graphql_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zen-graphql.module */ "./apps/api/src/app/graphql/zen-graphql.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZenGraphQLModule", function() { return _zen_graphql_module__WEBPACK_IMPORTED_MODULE_0__["ZenGraphQLModule"]; });

/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolvers */ "./apps/api/src/app/graphql/resolvers/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NEST_RESOLVERS", function() { return _resolvers__WEBPACK_IMPORTED_MODULE_1__["NEST_RESOLVERS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NEST_TYPE_DEFS", function() { return _resolvers__WEBPACK_IMPORTED_MODULE_1__["NEST_TYPE_DEFS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALL_TYPE_DEFS", function() { return _resolvers__WEBPACK_IMPORTED_MODULE_1__["ALL_TYPE_DEFS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GRAPHQL_SCHEMA", function() { return _resolvers__WEBPACK_IMPORTED_MODULE_1__["GRAPHQL_SCHEMA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PRISMA_SCHEMA", function() { return _resolvers__WEBPACK_IMPORTED_MODULE_1__["PRISMA_SCHEMA"]; });

/* harmony import */ var _write_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./write-schema */ "./apps/api/src/app/graphql/write-schema.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WriteGraphQLSchema", function() { return _write_schema__WEBPACK_IMPORTED_MODULE_2__["WriteGraphQLSchema"]; });






/***/ }),

/***/ "./apps/api/src/app/graphql/models/auth-login-input.ts":
/*!*************************************************************!*\
  !*** ./apps/api/src/app/graphql/models/auth-login-input.ts ***!
  \*************************************************************/
/*! exports provided: AuthLoginInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLoginInput", function() { return AuthLoginInput; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zen_api_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zen/api-interfaces */ "./libs/api-interfaces/src/index.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);



class AuthLoginInput {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsEmail"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["MaxLength"])(254),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthLoginInput.prototype, "email", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["Length"])(1, _zen_api_interfaces__WEBPACK_IMPORTED_MODULE_1__["ApiConstants"].PASSWORD_MAX_LENGTH),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthLoginInput.prototype, "password", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], AuthLoginInput.prototype, "rememberMe", void 0);


/***/ }),

/***/ "./apps/api/src/app/graphql/models/auth-password-change-input.ts":
/*!***********************************************************************!*\
  !*** ./apps/api/src/app/graphql/models/auth-password-change-input.ts ***!
  \***********************************************************************/
/*! exports provided: AuthPasswordChangeInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthPasswordChangeInput", function() { return AuthPasswordChangeInput; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zen_api_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zen/api-interfaces */ "./libs/api-interfaces/src/index.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);



class AuthPasswordChangeInput {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsNotEmpty"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthPasswordChangeInput.prototype, "oldPassword", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["Length"])(_zen_api_interfaces__WEBPACK_IMPORTED_MODULE_1__["ApiConstants"].PASSWORD_MIN_LENGTH, _zen_api_interfaces__WEBPACK_IMPORTED_MODULE_1__["ApiConstants"].PASSWORD_MAX_LENGTH),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthPasswordChangeInput.prototype, "newPassword", void 0);


/***/ }),

/***/ "./apps/api/src/app/graphql/models/auth-password-reset-confirmation-input.ts":
/*!***********************************************************************************!*\
  !*** ./apps/api/src/app/graphql/models/auth-password-reset-confirmation-input.ts ***!
  \***********************************************************************************/
/*! exports provided: AuthPasswordResetConfirmationInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthPasswordResetConfirmationInput", function() { return AuthPasswordResetConfirmationInput; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zen_api_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zen/api-interfaces */ "./libs/api-interfaces/src/index.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);



class AuthPasswordResetConfirmationInput {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["Length"])(_zen_api_interfaces__WEBPACK_IMPORTED_MODULE_1__["ApiConstants"].PASSWORD_MIN_LENGTH, _zen_api_interfaces__WEBPACK_IMPORTED_MODULE_1__["ApiConstants"].PASSWORD_MAX_LENGTH),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthPasswordResetConfirmationInput.prototype, "newPassword", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsNotEmpty"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthPasswordResetConfirmationInput.prototype, "token", void 0);


/***/ }),

/***/ "./apps/api/src/app/graphql/models/auth-password-reset-request-input.ts":
/*!******************************************************************************!*\
  !*** ./apps/api/src/app/graphql/models/auth-password-reset-request-input.ts ***!
  \******************************************************************************/
/*! exports provided: AuthPasswordResetRequestInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthPasswordResetRequestInput", function() { return AuthPasswordResetRequestInput; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_1__);


class AuthPasswordResetRequestInput {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_1__["IsEmail"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_1__["MaxLength"])(254),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthPasswordResetRequestInput.prototype, "email", void 0);


/***/ }),

/***/ "./apps/api/src/app/graphql/models/auth-register-input.ts":
/*!****************************************************************!*\
  !*** ./apps/api/src/app/graphql/models/auth-register-input.ts ***!
  \****************************************************************/
/*! exports provided: AuthRegisterInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRegisterInput", function() { return AuthRegisterInput; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zen_api_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zen/api-interfaces */ "./libs/api-interfaces/src/index.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);



class AuthRegisterInput {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsEmail"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["MaxLength"])(254),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthRegisterInput.prototype, "email", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["Length"])(_zen_api_interfaces__WEBPACK_IMPORTED_MODULE_1__["ApiConstants"].PASSWORD_MIN_LENGTH, 100),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthRegisterInput.prototype, "password", void 0);


/***/ }),

/***/ "./apps/api/src/app/graphql/models/auth-resend-verification-input.ts":
/*!***************************************************************************!*\
  !*** ./apps/api/src/app/graphql/models/auth-resend-verification-input.ts ***!
  \***************************************************************************/
/*! exports provided: AuthResendVerificationInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthResendVerificationInput", function() { return AuthResendVerificationInput; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_1__);


class AuthResendVerificationInput {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_1__["IsEmail"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_1__["MaxLength"])(254),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthResendVerificationInput.prototype, "email", void 0);


/***/ }),

/***/ "./apps/api/src/app/graphql/models/context.ts":
/*!****************************************************!*\
  !*** ./apps/api/src/app/graphql/models/context.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./apps/api/src/app/graphql/models/index.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/graphql/models/index.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_login_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-login-input */ "./apps/api/src/app/graphql/models/auth-login-input.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthLoginInput", function() { return _auth_login_input__WEBPACK_IMPORTED_MODULE_0__["AuthLoginInput"]; });

/* harmony import */ var _auth_password_change_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth-password-change-input */ "./apps/api/src/app/graphql/models/auth-password-change-input.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthPasswordChangeInput", function() { return _auth_password_change_input__WEBPACK_IMPORTED_MODULE_1__["AuthPasswordChangeInput"]; });

/* harmony import */ var _auth_password_reset_confirmation_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-password-reset-confirmation-input */ "./apps/api/src/app/graphql/models/auth-password-reset-confirmation-input.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthPasswordResetConfirmationInput", function() { return _auth_password_reset_confirmation_input__WEBPACK_IMPORTED_MODULE_2__["AuthPasswordResetConfirmationInput"]; });

/* harmony import */ var _auth_password_reset_request_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-password-reset-request-input */ "./apps/api/src/app/graphql/models/auth-password-reset-request-input.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthPasswordResetRequestInput", function() { return _auth_password_reset_request_input__WEBPACK_IMPORTED_MODULE_3__["AuthPasswordResetRequestInput"]; });

/* harmony import */ var _auth_register_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-register-input */ "./apps/api/src/app/graphql/models/auth-register-input.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthRegisterInput", function() { return _auth_register_input__WEBPACK_IMPORTED_MODULE_4__["AuthRegisterInput"]; });

/* harmony import */ var _auth_resend_verification_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth-resend-verification-input */ "./apps/api/src/app/graphql/models/auth-resend-verification-input.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthResendVerificationInput", function() { return _auth_resend_verification_input__WEBPACK_IMPORTED_MODULE_5__["AuthResendVerificationInput"]; });

/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./context */ "./apps/api/src/app/graphql/models/context.ts");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_context__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _context__WEBPACK_IMPORTED_MODULE_6__) if(["AuthLoginInput","AuthPasswordChangeInput","AuthPasswordResetConfirmationInput","AuthPasswordResetRequestInput","AuthRegisterInput","AuthResendVerificationInput","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _context__WEBPACK_IMPORTED_MODULE_6__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _user_session__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user-session */ "./apps/api/src/app/graphql/models/user-session.ts");
/* harmony import */ var _user_session__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_user_session__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _user_session__WEBPACK_IMPORTED_MODULE_7__) if(["AuthLoginInput","AuthPasswordChangeInput","AuthPasswordResetConfirmationInput","AuthPasswordResetRequestInput","AuthRegisterInput","AuthResendVerificationInput","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _user_session__WEBPACK_IMPORTED_MODULE_7__[key]; }) }(__WEBPACK_IMPORT_KEY__));










/***/ }),

/***/ "./apps/api/src/app/graphql/models/user-session.ts":
/*!*********************************************************!*\
  !*** ./apps/api/src/app/graphql/models/user-session.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./apps/api/src/app/graphql/prisma-select-args.ts":
/*!********************************************************!*\
  !*** ./apps/api/src/app/graphql/prisma-select-args.ts ***!
  \********************************************************/
/*! exports provided: PrismaSelectArgs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrismaSelectArgs", function() { return PrismaSelectArgs; });
/* harmony import */ var _paljs_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @paljs/plugins */ "@paljs/plugins");
/* harmony import */ var _paljs_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_paljs_plugins__WEBPACK_IMPORTED_MODULE_0__);

function PrismaSelectArgs(info, args) {
    const result = new _paljs_plugins__WEBPACK_IMPORTED_MODULE_0__["PrismaSelect"](info).value;
    if (!result.select || Object.keys(result.select).length > 0) {
        return {
            ...args,
            ...result,
        };
    }
    return args;
}


/***/ }),

/***/ "./apps/api/src/app/graphql/prisma/Role/resolvers.ts":
/*!***********************************************************!*\
  !*** ./apps/api/src/app/graphql/prisma/Role/resolvers.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    Query: {
        findOneRole: (_parent, args, { prisma }) => {
            return prisma.role.findOne(args);
        },
        findManyRole: (_parent, args, { prisma }) => {
            return prisma.role.findMany(args);
        },
        findManyRoleCount: (_parent, args, { prisma }) => {
            return prisma.role.count(args);
        },
    },
    Mutation: {
        createOneRole: (_parent, args, { prisma }) => {
            return prisma.role.create(args);
        },
        updateOneRole: (_parent, args, { prisma }) => {
            return prisma.role.update(args);
        },
        deleteOneRole: async (_parent, args, { prisma }) => {
            await prisma.onDelete({ model: 'Role', where: args.where });
            return prisma.role.delete(args);
        },
        upsertOneRole: async (_parent, args, { prisma }) => {
            return prisma.role.upsert(args);
        },
        deleteManyRole: async (_parent, args, { prisma }) => {
            await prisma.onDelete({ model: 'Role', where: args.where });
            return prisma.role.deleteMany(args);
        },
        updateManyRole: (_parent, args, { prisma }) => {
            return prisma.role.updateMany(args);
        },
    },
});


/***/ }),

/***/ "./apps/api/src/app/graphql/prisma/Role/typeDefs.ts":
/*!**********************************************************!*\
  !*** ./apps/api/src/app/graphql/prisma/Role/typeDefs.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a `
  type Role {
    id: String!
    name: String!
  }

  type Query {
    findOneRole(where: RoleWhereUniqueInput!): Role
    findManyRole(
      where: RoleWhereInput
      orderBy: [RoleOrderByInput!]
      cursor: RoleWhereUniqueInput
      skip: Int
      take: Int
    ): [Role!]
    findManyRoleCount(
      where: RoleWhereInput
      orderBy: [RoleOrderByInput!]
      cursor: RoleWhereUniqueInput
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneRole(data: RoleCreateInput!): Role!
    updateOneRole(where: RoleWhereUniqueInput!, data: RoleUpdateInput!): Role!
    deleteOneRole(where: RoleWhereUniqueInput!): Role
    upsertOneRole(
      where: RoleWhereUniqueInput!
      create: RoleCreateInput!
      update: RoleUpdateInput!
    ): Role
    deleteManyRole(where: RoleWhereInput): BatchPayload
    updateManyRole(
      where: RoleWhereInput
      data: RoleUpdateManyMutationInput
    ): BatchPayload
  }
`);


/***/ }),

/***/ "./apps/api/src/app/graphql/prisma/User/resolvers.ts":
/*!***********************************************************!*\
  !*** ./apps/api/src/app/graphql/prisma/User/resolvers.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    Query: {
        findOneUser: (_parent, args, { prisma }) => {
            return prisma.user.findOne(args);
        },
        findManyUser: (_parent, args, { prisma }) => {
            return prisma.user.findMany(args);
        },
        findManyUserCount: (_parent, args, { prisma }) => {
            return prisma.user.count(args);
        },
    },
    Mutation: {
        createOneUser: (_parent, args, { prisma }) => {
            return prisma.user.create(args);
        },
        updateOneUser: (_parent, args, { prisma }) => {
            return prisma.user.update(args);
        },
        deleteOneUser: async (_parent, args, { prisma }) => {
            await prisma.onDelete({ model: 'User', where: args.where });
            return prisma.user.delete(args);
        },
        upsertOneUser: async (_parent, args, { prisma }) => {
            return prisma.user.upsert(args);
        },
        deleteManyUser: async (_parent, args, { prisma }) => {
            await prisma.onDelete({ model: 'User', where: args.where });
            return prisma.user.deleteMany(args);
        },
        updateManyUser: (_parent, args, { prisma }) => {
            return prisma.user.updateMany(args);
        },
    },
});


/***/ }),

/***/ "./apps/api/src/app/graphql/prisma/User/typeDefs.ts":
/*!**********************************************************!*\
  !*** ./apps/api/src/app/graphql/prisma/User/typeDefs.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a `
  type User {
    id: String!
    createdAt: DateTime!
    email: String!
    firstName: String
    lastName: String
    password: String!
    roles: [String!]!
  }

  type Query {
    findOneUser(where: UserWhereUniqueInput!): User
    findManyUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      skip: Int
      take: Int
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneUser(data: UserCreateInput!): User!
    updateOneUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User!
    deleteOneUser(where: UserWhereUniqueInput!): User
    upsertOneUser(
      where: UserWhereUniqueInput!
      create: UserCreateInput!
      update: UserUpdateInput!
    ): User
    deleteManyUser(where: UserWhereInput): BatchPayload
    updateManyUser(
      where: UserWhereInput
      data: UserUpdateManyMutationInput
    ): BatchPayload
  }
`);


/***/ }),

/***/ "./apps/api/src/app/graphql/prisma/typeDefs.ts":
/*!*****************************************************!*\
  !*** ./apps/api/src/app/graphql/prisma/typeDefs.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _graphql_tools_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @graphql-tools/merge */ "@graphql-tools/merge");
/* harmony import */ var _graphql_tools_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_graphql_tools_merge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _paljs_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @paljs/plugins */ "@paljs/plugins");
/* harmony import */ var _paljs_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_paljs_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Role_typeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Role/typeDefs */ "./apps/api/src/app/graphql/prisma/Role/typeDefs.ts");
/* harmony import */ var _User_typeDefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./User/typeDefs */ "./apps/api/src/app/graphql/prisma/User/typeDefs.ts");




/* harmony default export */ __webpack_exports__["default"] = (Object(_graphql_tools_merge__WEBPACK_IMPORTED_MODULE_0__["mergeTypeDefs"])([_paljs_plugins__WEBPACK_IMPORTED_MODULE_1__["sdlInputs"], _User_typeDefs__WEBPACK_IMPORTED_MODULE_3__["default"], _Role_typeDefs__WEBPACK_IMPORTED_MODULE_2__["default"]]));


/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers/Auth.ts":
/*!****************************************************!*\
  !*** ./apps/api/src/app/graphql/resolvers/Auth.ts ***!
  \****************************************************/
/*! exports provided: AuthTypeDef, AuthResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthTypeDef", function() { return AuthTypeDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthResolver", function() { return AuthResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../auth */ "./apps/api/src/app/auth/index.ts");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../auth/auth.service */ "./apps/api/src/app/auth/auth.service.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../config */ "./apps/api/src/app/config/index.ts");
/* harmony import */ var _jwt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../jwt */ "./apps/api/src/app/jwt/index.ts");
/* harmony import */ var _mail__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../mail */ "./apps/api/src/app/mail/index.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../models */ "./apps/api/src/app/graphql/models/index.ts");
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;











const AuthTypeDef = graphql_tag__WEBPACK_IMPORTED_MODULE_4___default.a `
  extend type Query {
    authLogin(data: AuthLoginInput!): AuthSession!
    authExchangeToken: AuthSession!
    authPasswordResetRequest(data: AuthPasswordResetRequestInput!): Boolean
  }

  extend type Mutation {
    authPasswordChange(data: AuthPasswordChangeInput!): Boolean
    authPasswordResetConfirmation(data: AuthPasswordResetConfirmationInput!): Boolean
    authRegister(data: AuthRegisterInput): User!
  }

  type AuthSession {
    id: Int!
    maxAge: String!
    roles: [String!]!
    rememberMe: Boolean!
  }

  input AuthLoginInput {
    email: String!
    password: String!
    rememberMe: Boolean!
  }

  input AuthPasswordChangeInput {
    oldPassword: String!
    newPassword: String!
  }

  input AuthPasswordResetConfirmationInput {
    newPassword: String!
    token: String!
  }

  input AuthPasswordResetRequestInput {
    email: String!
  }

  input AuthRegisterInput {
    email: String!
    firstName: String!
    password: String!
  }
`;
let AuthResolver = class AuthResolver {
    constructor(auth, config, jwtService, mail) {
        this.auth = auth;
        this.config = config;
        this.jwtService = jwtService;
        this.mail = mail;
        this.CLEAR_COOKIE_OPTIONS = {
            maxAge: 0,
            secure: this.config.production,
            sameSite: this.config.production ? 'strict' : 'lax',
        };
    }
    async getUser(email, ctx) {
        const users = await ctx.prisma.user.findMany({
            where: {
                email: {
                    mode: 'insensitive',
                    equals: email,
                },
            },
        });
        return users[0];
    }
    async authLogin(ctx, data) {
        const user = await this.getUser(data.email, ctx);
        if (!user)
            throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]({ code: 'USER_NOT_FOUND' }, 400);
        const correctPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default.a.compare(data.password, user.password);
        if (!correctPassword)
            throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]({ code: 'INCORRECT_PASSWORD' }, 400);
        return this.auth.setJwtCookie(ctx.res, user, data.rememberMe);
    }
    async authExchangeToken(ctx, reqUser) {
        const user = await ctx.prisma.user.findOne({
            where: { id: reqUser.id },
        });
        if (user) {
            return this.auth.setJwtCookie(ctx.res, user, ctx.req.cookies['rememberMe']);
        }
        else {
            ctx.res.clearCookie('jwt', this.CLEAR_COOKIE_OPTIONS);
            ctx.res.clearCookie('rememberMe', this.CLEAR_COOKIE_OPTIONS);
            throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]({ code: 'USER_NOT_FOUND' }, 400);
        }
    }
    async authPasswordResetRequest(ctx, data) {
        const user = await this.getUser(data.email, ctx);
        if (!user)
            throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]({ code: 'USER_NOT_FOUND' }, 400);
        this.mail.sendPasswordReset(user.email);
    }
    async authRegister(ctx, data) {
        const userFound = await this.getUser(data.email, ctx);
        if (userFound)
            throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]({ code: 'EMAIL_TAKEN' }, 400);
        const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default.a.hash(data.password, 12);
        return await ctx.prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email.trim(),
                password: hashedPassword,
                roles: { set: [_auth__WEBPACK_IMPORTED_MODULE_5__["Role"].Registered] },
            },
        });
    }
    async authPasswordResetConfirmation(ctx, data) {
        let tokenPayload;
        try {
            tokenPayload = this.jwtService.verify(data.token);
        }
        catch {
            throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]({ code: 'UNAUTHORIZED' }, 400);
        }
        const user = await this.getUser(tokenPayload.email, ctx);
        if (!user)
            throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]({ code: 'USER_NOT_FOUND' }, 400);
        const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default.a.hash(data.newPassword, 12);
        await ctx.prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });
    }
    async authPasswordChange(ctx, data, reqUser) {
        const user = await ctx.prisma.user.findOne({ where: { id: reqUser.id } });
        if (!user)
            throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]({ code: 'USER_NOT_FOUND' }, 400);
        const correctPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default.a.compare(data.oldPassword, user.password);
        if (!correctPassword)
            throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]({ code: 'WRONG_PASSWORD' }, 400);
        const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default.a.hash(data.newPassword, 12);
        await ctx.prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])('data')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _models__WEBPACK_IMPORTED_MODULE_10__["IContext"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["IContext"]) === "function" ? _a : Object, typeof (_b = typeof _models__WEBPACK_IMPORTED_MODULE_10__["AuthLoginInput"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["AuthLoginInput"]) === "function" ? _b : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthResolver.prototype, "authLogin", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_auth__WEBPACK_IMPORTED_MODULE_5__["GqlGuard"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_auth__WEBPACK_IMPORTED_MODULE_5__["GqlUser"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof _models__WEBPACK_IMPORTED_MODULE_10__["IContext"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["IContext"]) === "function" ? _c : Object, typeof (_d = typeof _auth__WEBPACK_IMPORTED_MODULE_5__["RequestUser"] !== "undefined" && _auth__WEBPACK_IMPORTED_MODULE_5__["RequestUser"]) === "function" ? _d : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthResolver.prototype, "authExchangeToken", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])('data')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof _models__WEBPACK_IMPORTED_MODULE_10__["IContext"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["IContext"]) === "function" ? _e : Object, typeof (_f = typeof _models__WEBPACK_IMPORTED_MODULE_10__["AuthPasswordResetRequestInput"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["AuthPasswordResetRequestInput"]) === "function" ? _f : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthResolver.prototype, "authPasswordResetRequest", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])('data')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_g = typeof _models__WEBPACK_IMPORTED_MODULE_10__["IContext"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["IContext"]) === "function" ? _g : Object, typeof (_h = typeof _models__WEBPACK_IMPORTED_MODULE_10__["AuthRegisterInput"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["AuthRegisterInput"]) === "function" ? _h : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthResolver.prototype, "authRegister", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])('data')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_j = typeof _models__WEBPACK_IMPORTED_MODULE_10__["IContext"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["IContext"]) === "function" ? _j : Object, typeof (_k = typeof _models__WEBPACK_IMPORTED_MODULE_10__["AuthPasswordResetConfirmationInput"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["AuthPasswordResetConfirmationInput"]) === "function" ? _k : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthResolver.prototype, "authPasswordResetConfirmation", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_auth__WEBPACK_IMPORTED_MODULE_5__["GqlGuard"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])('data')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_auth__WEBPACK_IMPORTED_MODULE_5__["GqlUser"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_l = typeof _models__WEBPACK_IMPORTED_MODULE_10__["IContext"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["IContext"]) === "function" ? _l : Object, typeof (_m = typeof _models__WEBPACK_IMPORTED_MODULE_10__["AuthPasswordChangeInput"] !== "undefined" && _models__WEBPACK_IMPORTED_MODULE_10__["AuthPasswordChangeInput"]) === "function" ? _m : Object, typeof (_o = typeof _auth__WEBPACK_IMPORTED_MODULE_5__["RequestUser"] !== "undefined" && _auth__WEBPACK_IMPORTED_MODULE_5__["RequestUser"]) === "function" ? _o : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthResolver.prototype, "authPasswordChange", null);
AuthResolver = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Resolver"])('Auth'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_p = typeof _auth_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] !== "undefined" && _auth_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"]) === "function" ? _p : Object, typeof (_q = typeof _config__WEBPACK_IMPORTED_MODULE_7__["ConfigService"] !== "undefined" && _config__WEBPACK_IMPORTED_MODULE_7__["ConfigService"]) === "function" ? _q : Object, typeof (_r = typeof _jwt__WEBPACK_IMPORTED_MODULE_8__["JwtService"] !== "undefined" && _jwt__WEBPACK_IMPORTED_MODULE_8__["JwtService"]) === "function" ? _r : Object, typeof (_s = typeof _mail__WEBPACK_IMPORTED_MODULE_9__["MailService"] !== "undefined" && _mail__WEBPACK_IMPORTED_MODULE_9__["MailService"]) === "function" ? _s : Object])
], AuthResolver);



/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers/Role.ts":
/*!****************************************************!*\
  !*** ./apps/api/src/app/graphql/resolvers/Role.ts ***!
  \****************************************************/
/*! exports provided: RoleTypeDef, RoleResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleTypeDef", function() { return RoleTypeDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleResolver", function() { return RoleResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../auth */ "./apps/api/src/app/auth/index.ts");
/* harmony import */ var _prisma_select_args__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../prisma-select-args */ "./apps/api/src/app/graphql/prisma-select-args.ts");
/* harmony import */ var _prisma_Role_resolvers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../prisma/Role/resolvers */ "./apps/api/src/app/graphql/prisma/Role/resolvers.ts");






const RoleTypeDef = null;
// export const RoleTypeDef = gql`
//   extend type Query {
//     sampleRoleQuery: Role!
//   }
//   extend type Mutation {
//     sampleRoleMutation(args: Int!): Boolean
//   }
//   extend type Role {
//     sampleRoleField: String
//   }
// `;
let RoleResolver = class RoleResolver {
    async findOneRole(parent, info, args, ctx) {
        return _prisma_Role_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Query.findOneRole(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async findManyRole(parent, info, args, ctx) {
        return _prisma_Role_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Query.findManyRole(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async findManyRoleCount(parent, info, args, ctx) {
        return _prisma_Role_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Query.findManyRoleCount(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async createOneRole(parent, info, args, ctx) {
        return _prisma_Role_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.createOneRole(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async updateOneRole(parent, info, args, ctx) {
        return _prisma_Role_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.updateOneRole(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async deleteOneRole(parent, info, args, ctx) {
        return _prisma_Role_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.deleteOneRole(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async upsertOneRole(parent, info, args, ctx) {
        return _prisma_Role_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.upsertOneRole(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async deleteManyRole(parent, info, args, ctx) {
        return _prisma_Role_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.deleteManyRole(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async updateManyRole(parent, info, args, ctx) {
        return _prisma_Role_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.updateManyRole(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], RoleResolver.prototype, "findOneRole", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], RoleResolver.prototype, "findManyRole", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], RoleResolver.prototype, "findManyRoleCount", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], RoleResolver.prototype, "createOneRole", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], RoleResolver.prototype, "updateOneRole", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], RoleResolver.prototype, "deleteOneRole", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], RoleResolver.prototype, "upsertOneRole", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], RoleResolver.prototype, "deleteManyRole", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], RoleResolver.prototype, "updateManyRole", null);
RoleResolver = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Resolver"])('Role'),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_auth__WEBPACK_IMPORTED_MODULE_3__["GqlGuard"]),
    Object(_auth__WEBPACK_IMPORTED_MODULE_3__["Roles"])(_auth__WEBPACK_IMPORTED_MODULE_3__["Role"].Admin)
], RoleResolver);



/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers/User.ts":
/*!****************************************************!*\
  !*** ./apps/api/src/app/graphql/resolvers/User.ts ***!
  \****************************************************/
/*! exports provided: UserTypeDef, UserResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserTypeDef", function() { return UserTypeDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserResolver", function() { return UserResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../auth */ "./apps/api/src/app/auth/index.ts");
/* harmony import */ var _prisma_select_args__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../prisma-select-args */ "./apps/api/src/app/graphql/prisma-select-args.ts");
/* harmony import */ var _prisma_User_resolvers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../prisma/User/resolvers */ "./apps/api/src/app/graphql/prisma/User/resolvers.ts");






const UserTypeDef = null;
// export const UserTypeDef = gql`
//   extend type Query {
//     sampleUserQuery: User!
//   }
//   extend type Mutation {
//     sampleUserMutation(args: Int!): Boolean
//   }
//   extend type User {
//     sampleUserField: String
//   }
// `;
let UserResolver = class UserResolver {
    async password() {
        return '';
    }
    async findOneUser(parent, info, args, ctx) {
        return _prisma_User_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Query.findOneUser(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async findManyUser(parent, info, args, ctx) {
        return _prisma_User_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Query.findManyUser(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async findManyUserCount(parent, info, args, ctx) {
        return _prisma_User_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Query.findManyUserCount(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async createOneUser(parent, info, args, ctx) {
        return _prisma_User_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.createOneUser(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async updateOneUser(parent, info, args, ctx) {
        return _prisma_User_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.updateOneUser(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async deleteOneUser(parent, info, args, ctx) {
        return _prisma_User_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.deleteOneUser(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async upsertOneUser(parent, info, args, ctx) {
        return _prisma_User_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.upsertOneUser(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async deleteManyUser(parent, info, args, ctx) {
        return _prisma_User_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.deleteManyUser(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
    async updateManyUser(parent, info, args, ctx) {
        return _prisma_User_resolvers__WEBPACK_IMPORTED_MODULE_5__["default"].Mutation.updateManyUser(parent, Object(_prisma_select_args__WEBPACK_IMPORTED_MODULE_4__["PrismaSelectArgs"])(info, args), ctx);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["ResolveField"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserResolver.prototype, "password", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserResolver.prototype, "findOneUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserResolver.prototype, "findManyUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Query"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserResolver.prototype, "findManyUserCount", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserResolver.prototype, "createOneUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserResolver.prototype, "updateOneUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserResolver.prototype, "deleteOneUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserResolver.prototype, "upsertOneUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserResolver.prototype, "deleteManyUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Mutation"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Parent"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Info"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Args"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Context"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, Object, Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserResolver.prototype, "updateManyUser", null);
UserResolver = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["Resolver"])('User'),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_auth__WEBPACK_IMPORTED_MODULE_3__["GqlGuard"]),
    Object(_auth__WEBPACK_IMPORTED_MODULE_3__["Roles"])(_auth__WEBPACK_IMPORTED_MODULE_3__["Role"].Admin)
], UserResolver);



/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers/index.ts":
/*!*****************************************************!*\
  !*** ./apps/api/src/app/graphql/resolvers/index.ts ***!
  \*****************************************************/
/*! exports provided: NEST_RESOLVERS, NEST_TYPE_DEFS, ALL_TYPE_DEFS, GRAPHQL_SCHEMA, PRISMA_SCHEMA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEST_RESOLVERS", function() { return NEST_RESOLVERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEST_TYPE_DEFS", function() { return NEST_TYPE_DEFS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_TYPE_DEFS", function() { return ALL_TYPE_DEFS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRAPHQL_SCHEMA", function() { return GRAPHQL_SCHEMA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRISMA_SCHEMA", function() { return PRISMA_SCHEMA; });
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tools */ "graphql-tools");
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tools__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphql_tools_merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @graphql-tools/merge */ "@graphql-tools/merge");
/* harmony import */ var _graphql_tools_merge__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_graphql_tools_merge__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _prisma_typeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../prisma/typeDefs */ "./apps/api/src/app/graphql/prisma/typeDefs.ts");
/* harmony import */ var _Auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Auth */ "./apps/api/src/app/graphql/resolvers/Auth.ts");
/* harmony import */ var _Role__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Role */ "./apps/api/src/app/graphql/resolvers/Role.ts");
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./User */ "./apps/api/src/app/graphql/resolvers/User.ts");






const NEST_RESOLVERS = [
    _Auth__WEBPACK_IMPORTED_MODULE_3__["AuthResolver"],
    _Role__WEBPACK_IMPORTED_MODULE_4__["RoleResolver"],
    _User__WEBPACK_IMPORTED_MODULE_5__["UserResolver"]
];
const NEST_TYPE_DEFS = [
    _Auth__WEBPACK_IMPORTED_MODULE_3__["AuthTypeDef"],
    _Role__WEBPACK_IMPORTED_MODULE_4__["RoleTypeDef"],
    _User__WEBPACK_IMPORTED_MODULE_5__["UserTypeDef"]
].filter(x => x);
const ALL_TYPE_DEFS = Object(_graphql_tools_merge__WEBPACK_IMPORTED_MODULE_1__["mergeTypeDefs"])([_prisma_typeDefs__WEBPACK_IMPORTED_MODULE_2__["default"], ...NEST_TYPE_DEFS]);
const GRAPHQL_SCHEMA = Object(graphql_tools__WEBPACK_IMPORTED_MODULE_0__["makeExecutableSchema"])({ typeDefs: ALL_TYPE_DEFS });
const PRISMA_SCHEMA = Object(graphql_tools__WEBPACK_IMPORTED_MODULE_0__["makeExecutableSchema"])({ typeDefs: _prisma_typeDefs__WEBPACK_IMPORTED_MODULE_2__["default"] });


/***/ }),

/***/ "./apps/api/src/app/graphql/write-schema.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/graphql/write-schema.ts ***!
  \**************************************************/
/*! exports provided: WriteGraphQLSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WriteGraphQLSchema", function() { return WriteGraphQLSchema; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "util");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_3__);




const execWriteFile = Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFile);
async function WriteGraphQLSchema(outPath, schema) {
    const schemaString = Object(graphql__WEBPACK_IMPORTED_MODULE_3__["printSchema"])(schema);
    await execWriteFile(outPath, schemaString);
    _nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Logger"].log(`Wrote: ${outPath}`);
    return schemaString;
}


/***/ }),

/***/ "./apps/api/src/app/graphql/zen-graphql.module.ts":
/*!********************************************************!*\
  !*** ./apps/api/src/app/graphql/zen-graphql.module.ts ***!
  \********************************************************/
/*! exports provided: ZenGraphQLModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZenGraphQLModule", function() { return ZenGraphQLModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth */ "./apps/api/src/app/auth/index.ts");
/* harmony import */ var _mail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mail */ "./apps/api/src/app/mail/index.ts");
/* harmony import */ var _gql_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gql-config.service */ "./apps/api/src/app/graphql/gql-config.service.ts");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resolvers */ "./apps/api/src/app/graphql/resolvers/index.ts");







let ZenGraphQLModule = class ZenGraphQLModule {
};
ZenGraphQLModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Global"])(),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _auth__WEBPACK_IMPORTED_MODULE_3__["AuthModule"],
            _mail__WEBPACK_IMPORTED_MODULE_4__["MailModule"],
            _nestjs_graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLModule"].forRootAsync({
                useClass: _gql_config_service__WEBPACK_IMPORTED_MODULE_5__["GqlConfigService"],
            }),
        ],
        providers: [..._resolvers__WEBPACK_IMPORTED_MODULE_6__["NEST_RESOLVERS"]],
    })
], ZenGraphQLModule);



/***/ }),

/***/ "./apps/api/src/app/jwt/index.ts":
/*!***************************************!*\
  !*** ./apps/api/src/app/jwt/index.ts ***!
  \***************************************/
/*! exports provided: JwtModule, JwtService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jwt_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jwt.module */ "./apps/api/src/app/jwt/jwt.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JwtModule", function() { return _jwt_module__WEBPACK_IMPORTED_MODULE_0__["JwtModule"]; });

/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JwtService", function() { return _nestjs_jwt__WEBPACK_IMPORTED_MODULE_1__["JwtService"]; });





/***/ }),

/***/ "./apps/api/src/app/jwt/jwt.module.ts":
/*!********************************************!*\
  !*** ./apps/api/src/app/jwt/jwt.module.ts ***!
  \********************************************/
/*! exports provided: JwtModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtModule", function() { return JwtModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./apps/api/src/environments/environment.ts");




let JwtModule = class JwtModule {
};
JwtModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Global"])(),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtModule"].register(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].jwtOptions)],
        exports: [_nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtModule"]],
    })
], JwtModule);



/***/ }),

/***/ "./apps/api/src/app/mail/index.ts":
/*!****************************************!*\
  !*** ./apps/api/src/app/mail/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mail_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mail.module */ "./apps/api/src/app/mail/mail.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MailModule", function() { return _mail_module__WEBPACK_IMPORTED_MODULE_0__["MailModule"]; });

/* harmony import */ var _mail_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mail.service */ "./apps/api/src/app/mail/mail.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MailService", function() { return _mail_service__WEBPACK_IMPORTED_MODULE_1__["MailService"]; });

/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates */ "./apps/api/src/app/mail/templates/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _templates__WEBPACK_IMPORTED_MODULE_2__) if(["MailModule","MailService","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _templates__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));





/***/ }),

/***/ "./apps/api/src/app/mail/mail.module.ts":
/*!**********************************************!*\
  !*** ./apps/api/src/app/mail/mail.module.ts ***!
  \**********************************************/
/*! exports provided: MailModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailModule", function() { return MailModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nest_modules_mailer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nest-modules/mailer */ "@nest-modules/mailer");
/* harmony import */ var _nest_modules_mailer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nest_modules_mailer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./apps/api/src/environments/environment.ts");
/* harmony import */ var _jwt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jwt */ "./apps/api/src/app/jwt/index.ts");
/* harmony import */ var _mail_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mail.service */ "./apps/api/src/app/mail/mail.service.ts");







let MailModule = class MailModule {
};
MailModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__["Module"])({
        imports: [
            _jwt__WEBPACK_IMPORTED_MODULE_5__["JwtModule"],
            _nest_modules_mailer__WEBPACK_IMPORTED_MODULE_2__["MailerModule"].forRootAsync({
                useFactory: () => ({
                    transport: `smtps://${_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].smtp.login}:${_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].smtp.password}@${_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].smtp.server}`,
                    defaults: { from: `"${_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].smtp.fromName}" <${_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].smtp.fromEmail}>` },
                    template: {
                        dir: path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, 'mail/templates'),
                        adapter: new _nest_modules_mailer__WEBPACK_IMPORTED_MODULE_2__["HandlebarsAdapter"](),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
        ],
        providers: [_mail_service__WEBPACK_IMPORTED_MODULE_6__["MailService"]],
        exports: [_mail_service__WEBPACK_IMPORTED_MODULE_6__["MailService"]],
    })
], MailModule);



/***/ }),

/***/ "./apps/api/src/app/mail/mail.service.ts":
/*!***********************************************!*\
  !*** ./apps/api/src/app/mail/mail.service.ts ***!
  \***********************************************/
/*! exports provided: MailService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailService", function() { return MailService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nest_modules_mailer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nest-modules/mailer */ "@nest-modules/mailer");
/* harmony import */ var _nest_modules_mailer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nest_modules_mailer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "./apps/api/src/app/config/index.ts");
/* harmony import */ var _jwt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../jwt */ "./apps/api/src/app/jwt/index.ts");
var _a, _b, _c;





let MailService = class MailService {
    constructor(mailer, jwtService, config) {
        this.mailer = mailer;
        this.jwtService = jwtService;
        this.config = config;
    }
    send(options) {
        return this.mailer.sendMail(options);
    }
    sendPasswordReset(to) {
        const token = this.jwtService.sign({ email: to }, { expiresIn: '1d' });
        const context = {
            resetUrl: 'https://zensoftware.ca/#/password-reset-confirmation?token=' + encodeURI(token),
        };
        this.send({
            template: 'password-reset',
            to,
            subject: `${this.config.smtp.fromName} Password Reset`,
            context,
        }).then();
    }
};
MailService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _nest_modules_mailer__WEBPACK_IMPORTED_MODULE_1__["MailerService"] !== "undefined" && _nest_modules_mailer__WEBPACK_IMPORTED_MODULE_1__["MailerService"]) === "function" ? _a : Object, typeof (_b = typeof _jwt__WEBPACK_IMPORTED_MODULE_4__["JwtService"] !== "undefined" && _jwt__WEBPACK_IMPORTED_MODULE_4__["JwtService"]) === "function" ? _b : Object, typeof (_c = typeof _config__WEBPACK_IMPORTED_MODULE_3__["ConfigService"] !== "undefined" && _config__WEBPACK_IMPORTED_MODULE_3__["ConfigService"]) === "function" ? _c : Object])
], MailService);



/***/ }),

/***/ "./apps/api/src/app/mail/templates/index.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/mail/templates/index.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _password_reset_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./password-reset.context */ "./apps/api/src/app/mail/templates/password-reset.context.ts");
/* harmony import */ var _password_reset_context__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_password_reset_context__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _password_reset_context__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _password_reset_context__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),

/***/ "./apps/api/src/app/mail/templates/password-reset.context.ts":
/*!*******************************************************************!*\
  !*** ./apps/api/src/app/mail/templates/password-reset.context.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./apps/api/src/app/prisma/index.ts":
/*!******************************************!*\
  !*** ./apps/api/src/app/prisma/index.ts ***!
  \******************************************/
/*! exports provided: PrismaService, PrismaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prisma_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prisma.service */ "./apps/api/src/app/prisma/prisma.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrismaService", function() { return _prisma_service__WEBPACK_IMPORTED_MODULE_0__["PrismaService"]; });

/* harmony import */ var _prisma_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prisma.module */ "./apps/api/src/app/prisma/prisma.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrismaModule", function() { return _prisma_module__WEBPACK_IMPORTED_MODULE_1__["PrismaModule"]; });





/***/ }),

/***/ "./apps/api/src/app/prisma/prisma.module.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/prisma/prisma.module.ts ***!
  \**************************************************/
/*! exports provided: PrismaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrismaModule", function() { return PrismaModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _prisma_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prisma.service */ "./apps/api/src/app/prisma/prisma.service.ts");



let PrismaModule = class PrismaModule {
};
PrismaModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Global"])(),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        providers: [_prisma_service__WEBPACK_IMPORTED_MODULE_2__["PrismaService"]],
        exports: [_prisma_service__WEBPACK_IMPORTED_MODULE_2__["PrismaService"]],
    })
], PrismaModule);



/***/ }),

/***/ "./apps/api/src/app/prisma/prisma.service.ts":
/*!***************************************************!*\
  !*** ./apps/api/src/app/prisma/prisma.service.ts ***!
  \***************************************************/
/*! exports provided: PrismaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrismaService", function() { return PrismaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _paljs_plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @paljs/plugins */ "@paljs/plugins");
/* harmony import */ var _paljs_plugins__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_paljs_plugins__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);
var _a;




let PrismaService = class PrismaService extends _prisma_client__WEBPACK_IMPORTED_MODULE_3__["PrismaClient"] {
    constructor(options) {
        super(options);
    }
    async onDelete(args) {
        const prismaDelete = new _paljs_plugins__WEBPACK_IMPORTED_MODULE_2__["PrismaDelete"](this);
        await prismaDelete.onDelete(args);
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
PrismaService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ scope: _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Scope"].REQUEST }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _prisma_client__WEBPACK_IMPORTED_MODULE_3__["PrismaClientOptions"] !== "undefined" && _prisma_client__WEBPACK_IMPORTED_MODULE_3__["PrismaClientOptions"]) === "function" ? _a : Object])
], PrismaService);



/***/ }),

/***/ "./apps/api/src/environments/environment.base.ts":
/*!*******************************************************!*\
  !*** ./apps/api/src/environments/environment.base.ts ***!
  \*******************************************************/
/*! exports provided: EnvironmentBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentBase", function() { return EnvironmentBase; });
class EnvironmentBase {
}


/***/ }),

/***/ "./apps/api/src/environments/environment.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/environments/environment.ts ***!
  \**************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);

dotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config();
const environment = {
    production: false,
    expressPort: 7080,
    graphql: {
        playground: true,
    },
    postgres: {
        host: 'localhost',
        port: 5445,
        user: 'ZenAdmin',
        password: 'temp',
        database: 'zen',
    },
    jwtOptions: {
        secret: 'dev secret',
        signOptions: {
            algorithm: 'HS256',
            expiresIn: 3600,
        },
    },
    rememberMeExpiresIn: 2592000,
    cookieDomain: undefined,
    smtp: {
        server: 'localhost/nowhere',
        login: process.env.SMTP_LOGIN,
        password: process.env.SMTP_PASSWORD,
        fromEmail: process.env.SMTP_FROM_EMAIL,
        fromName: 'Zen',
    },
};


/***/ }),

/***/ "./apps/api/src/main.ts":
/*!******************************!*\
  !*** ./apps/api/src/main.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! helmet */ "helmet");
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app.module */ "./apps/api/src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./environments/environment */ "./apps/api/src/environments/environment.ts");






async function bootstrap() {
    // if (!environment.production) {
    //   await WriteGraphQLSchema('apps/api/src/app/graphql/prisma/prisma.graphql', PRISMA_SCHEMA);
    //   await WriteGraphQLSchema('schema.graphql', GRAPHQL_SCHEMA);
    // }
    const port = process.env.PORT || _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].expressPort;
    const app = await _nestjs_core__WEBPACK_IMPORTED_MODULE_1__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"], {
        cors: _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production ? undefined : { credentials: true, origin: true },
    });
    app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2___default()());
    if (_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production)
        app.use(helmet__WEBPACK_IMPORTED_MODULE_3___default()());
    await app.listen(port, () => {
        _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["Logger"].log(`Listening at http://localhost:${port}`);
    });
}
bootstrap();


/***/ }),

/***/ "./libs/api-interfaces/src/index.ts":
/*!******************************************!*\
  !*** ./libs/api-interfaces/src/index.ts ***!
  \******************************************/
/*! exports provided: ApiConstants, Role */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/api-interfaces */ "./libs/api-interfaces/src/lib/api-interfaces.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiConstants", function() { return _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__["ApiConstants"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__["Role"]; });




/***/ }),

/***/ "./libs/api-interfaces/src/lib/api-interfaces.ts":
/*!*******************************************************!*\
  !*** ./libs/api-interfaces/src/lib/api-interfaces.ts ***!
  \*******************************************************/
/*! exports provided: ApiConstants, Role */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiConstants", function() { return ApiConstants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return Role; });
const ApiConstants = {
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 100,
};
var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["Registered"] = "Registered";
})(Role || (Role = {}));


/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./apps/api/src/main.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\a\Work\zen\apps\api\src\main.ts */"./apps/api/src/main.ts");


/***/ }),

/***/ "@graphql-tools/merge":
/*!***************************************!*\
  !*** external "@graphql-tools/merge" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@graphql-tools/merge");

/***/ }),

/***/ "@nest-modules/mailer":
/*!***************************************!*\
  !*** external "@nest-modules/mailer" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nest-modules/mailer");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@paljs/plugins":
/*!*********************************!*\
  !*** external "@paljs/plugins" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@paljs/plugins");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map