import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ability } from '@casl/ability';
import { Environment } from '@zen/common';
import {
  ApiError,
  AuthExchangeTokenGQL,
  AuthLoginGQL,
  AuthLoginInput,
  AuthSession,
  GetAccountInfoGQL,
  GqlErrors,
  parseGqlErrors,
} from '@zen/graphql';
import { loggedInVar, userRolesVar } from '@zen/graphql/client';
import { Apollo } from 'apollo-angular';
import ls from 'localstorage-slim';
import { Subscription, interval, map, share, throwError, timer } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { tokenVar } from './token-var';

export enum LocalStorageKey {
  userId = 'userId',
  token = 'token',
  sessionExpiresOn = 'sessionExpiresOn',
  roles = 'roles',
  rememberMe = 'rememberMe',
  rules = 'rules',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #exchangeIntervalSubscription?: Subscription;

  #userId: AuthSession['userId'] | null = null;
  get userId(): AuthSession['userId'] | null {
    return this.#userId;
  }

  #accountInfo$;
  get accountInfo$() {
    return this.#accountInfo$;
  }

  constructor(
    private router: Router,
    private apollo: Apollo,
    private ability: Ability,
    private authLoginGQL: AuthLoginGQL,
    private authExchangeTokenGQL: AuthExchangeTokenGQL,
    private env: Environment,
    getAccountInfoGQL: GetAccountInfoGQL
  ) {
    this.#accountInfo$ = getAccountInfoGQL.watch().valueChanges.pipe(
      map(({ data }) => data.accountInfo),
      share()
    );

    if (this.validSession) {
      try {
        // Initialize Apollo client state
        const roles = ls.get<string[]>(LocalStorageKey.roles, { decrypt: true });
        userRolesVar(roles ? roles : []);
        loggedInVar(roles ? true : false);
        this.#userId = ls.get(LocalStorageKey.userId, { decrypt: true });

        const rules: any = ls.get(LocalStorageKey.rules, { decrypt: true });
        if (rules) this.ability.update(rules);

        switch (env.auth.exchangeStrategy) {
          case 'app-load':
            this.exchangeToken();
            break;
          case 'efficient':
            if (!this.rememberMe && this.sessionTimeRemaining <= env.auth.jwtExchangeInterval) {
              this.exchangeToken();
            } else if (
              this.rememberMe &&
              this.sessionTimeRemaining <= env.auth.rememberMeExchangeThreshold
            ) {
              this.exchangeToken();
            }
            break;
        }

        this.startExchangeInterval();
      } catch (error) {
        console.error('AuthService failed to initialize', error);
        this.logout();
      }
    } else {
      this.clearSession();
    }
  }

  login(data: AuthLoginInput) {
    return this.authLoginGQL
      .fetch({ data: <AuthLoginInput>data }, { fetchPolicy: 'no-cache' })
      .pipe(
        catchError(parseGqlErrors),
        tap(({ data: { authLogin } }) => {
          this.setSession(authLogin);
        })
      );
  }

  loginWithGoogle() {
    window.location.href = this.env.url.api + '/auth/google';
  }

  logout() {
    this.clearSession();
    this.router.navigateByUrl('/login');
  }

  setSession(authSession: AuthSession) {
    ls.set(LocalStorageKey.userId, authSession.userId, { encrypt: true });
    ls.set(LocalStorageKey.token, authSession.token, { encrypt: true });
    ls.set(LocalStorageKey.sessionExpiresOn, Date.now() + authSession.expiresIn * 1000);
    ls.set(LocalStorageKey.rememberMe, authSession.rememberMe);
    ls.set(LocalStorageKey.roles, authSession.roles, { encrypt: true });
    ls.set(LocalStorageKey.rules, authSession.rules, { encrypt: true });

    this.#userId = authSession.userId;

    this.ability.update(authSession.rules);

    tokenVar(authSession.token);

    if (
      !this.rolesEqual(this.roles, authSession.roles) ||
      this.roles === null ||
      this.roles === undefined
    ) {
      userRolesVar(authSession.roles);
    }

    if (!this.loggedIn) {
      loggedInVar(true);
    }

    this.startExchangeInterval();
  }

  rolesEqual(a: string | string[] | null | undefined, b: string | string[] | null | undefined) {
    let compareA: string[];
    let compareB: string[];

    if (Array.isArray(a)) compareA = [...a];
    else if (typeof a === 'string') compareA = [a];
    else if (a === null || a === undefined) compareA = [];
    else throw new Error(`'a' is not a valid type for comparison`);

    if (Array.isArray(b)) compareB = [...b];
    else if (typeof b === 'string') compareB = [b];
    else if (b === null || b === undefined) compareB = [];
    else throw new Error(`'b' is not a valid type for comparison`);

    if (compareA.length !== compareB.length) return false;

    compareA.sort();
    compareB.sort();

    for (let i = 0; i < compareA.length; i++) {
      if (compareA[i] !== compareB[i]) return false;
    }

    return true;
  }

  userHasRole(role: string | string[]) {
    if (role) {
      if (typeof role === 'string') return this.roles.some(r => r === role);
      else return this.roles.some(r => role.includes(r));
    }
    return false;
  }

  userNotInRole(role: string | string[]) {
    if (role) {
      if (typeof role === 'string') return !this.roles.some(r => r === role);
      return this.roles.filter(r => role.includes(r)).length === 0;
    }
    return true;
  }

  get roles() {
    return userRolesVar();
  }

  get loggedIn() {
    return loggedInVar();
  }

  private get rememberMe() {
    return ls.get<boolean>(LocalStorageKey.rememberMe);
  }

  private get validSession(): boolean {
    return this.sessionTimeRemaining > 0;
  }

  private get sessionTimeRemaining(): number {
    const expiresOn = ls.get<number>(LocalStorageKey.sessionExpiresOn);
    if (!expiresOn) return 0;

    const timeRemaining = expiresOn - Date.now();

    if (timeRemaining <= 0) return 0;
    else return timeRemaining;
  }

  clearSession() {
    this.stopExchangeInterval();
    ls.remove(LocalStorageKey.userId);
    ls.remove(LocalStorageKey.token);
    ls.remove(LocalStorageKey.sessionExpiresOn);
    ls.remove(LocalStorageKey.rememberMe);
    ls.remove(LocalStorageKey.roles);
    ls.remove(LocalStorageKey.rules);

    this.#userId = null;
    this.ability.update([]);
    tokenVar(null);
    userRolesVar([]);
    loggedInVar(false);
    this.apollo.client.cache.reset();
  }

  private exchangeToken() {
    this.authExchangeTokenGQL
      .fetch(
        { data: { rememberMe: !!ls.get<boolean>(LocalStorageKey.rememberMe) } },
        { fetchPolicy: 'no-cache' }
      )
      .pipe(
        catchError(parseGqlErrors),
        retry({
          delay: retryStrategy({
            excludeStatusCodes: ['FORBIDDEN', 'UNAUTHENTICATED', 'INTERNAL_SERVER_ERROR'],
          }),
        })
      )
      .subscribe({
        next: ({ data: { authExchangeToken } }) => {
          this.setSession(authExchangeToken);
          console.log('Exchanged token');
        },
        error: (errors: GqlErrors<ApiError.AuthExchangeToken>) => {
          this.logout();
          console.error('Exchange token failed', errors);
        },
      });
  }

  private startExchangeInterval() {
    if (!this.rememberMe && !this.#exchangeIntervalSubscription) {
      this.#exchangeIntervalSubscription = interval(this.env.auth.jwtExchangeInterval).subscribe(
        () => {
          if (this.validSession) this.exchangeToken();
          else this.logout();
        }
      );
    }
  }

  private stopExchangeInterval() {
    if (this.#exchangeIntervalSubscription) {
      this.#exchangeIntervalSubscription.unsubscribe();
      this.#exchangeIntervalSubscription = undefined;
    }
  }
}

function retryStrategy({
  maxAttempts = Infinity,
  delay = 5000,
  excludeStatusCodes = [],
}: {
  maxAttempts?: number;
  delay?: number;
  excludeStatusCodes?: string[];
}) {
  return (errors: GqlErrors, retryCount: number) => {
    const codes = errors.original?.graphQLErrors?.reduce((accum, e) => {
      const status = e?.extensions?.code;
      if (status) accum.push(status);
      return accum;
    }, [] as string[]);

    const excludedStatusFound = !!codes.find(status =>
      excludeStatusCodes.find(exclude => exclude === status)
    );

    if (retryCount > maxAttempts || excludedStatusFound) {
      return throwError(() => errors);
    }

    console.warn(
      `Exchange token attempt ${retryCount}. Retrying in ${Math.round(delay / 1000)}s`,
      errors
    );

    return timer(delay);
  };
}
