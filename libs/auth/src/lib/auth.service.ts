import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloError } from '@apollo/client/errors';
import { Ability } from '@casl/ability';
import { ApiError, Environment } from '@zen/common';
import {
  AuthExchangeTokenGQL,
  AuthLoginGQL,
  AuthLoginInput,
  AuthSession,
  GetAccountInfoGQL,
} from '@zen/graphql';
import { Apollo } from 'apollo-angular';
import ls from 'localstorage-slim';
import { BehaviorSubject, Subscription, interval, map, share, throwError, timer } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

import { token } from './token.signal';

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

  #loggedIn = false;
  get loggedIn() {
    return this.#loggedIn;
  }

  #loggedIn$ = new BehaviorSubject(false);
  get loggedIn$() {
    return this.#loggedIn$.asObservable();
  }

  #userRoles: string[] = [];
  get userRoles() {
    return this.#userRoles;
  }

  #userRoles$ = new BehaviorSubject<string[]>([]);
  get userRoles$() {
    return this.#userRoles$.asObservable();
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
        this.#userRoles = roles ? roles : [];
        this.#userRoles$.next([...this.#userRoles]);
        this.#loggedIn = roles ? true : false;
        this.#loggedIn$.next(this.#loggedIn);
        this.#userId = ls.get(LocalStorageKey.userId, { decrypt: true });

        const rules: Array<any> | null = ls.get(LocalStorageKey.rules, { decrypt: true });
        if (Array.isArray(rules)) this.ability.update(rules);

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
    return this.authLoginGQL.fetch({ data }, { fetchPolicy: 'no-cache' }).pipe(
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

    token.set(authSession.token);

    if (
      !this.rolesEqual(this.#userRoles, authSession.roles) ||
      this.#userRoles === null ||
      this.#userRoles === undefined
    ) {
      this.#userRoles = authSession.roles;
      this.#userRoles$.next([...this.#userRoles]);
    }

    if (!this.#loggedIn) {
      this.#loggedIn = true;
      this.#loggedIn$.next(true);
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
      if (typeof role === 'string') return this.#userRoles.some(r => r === role);
      else return this.#userRoles.some(r => role.includes(r));
    }
    return false;
  }

  userNotInRole(role: string | string[]) {
    if (role) {
      if (typeof role === 'string') return !this.#userRoles.some(r => r === role);
      return this.#userRoles.filter(r => role.includes(r)).length === 0;
    }
    return true;
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
    token.set(null);
    this.#userRoles = [];
    this.#userRoles$.next([]);
    this.#loggedIn = false;
    this.#loggedIn$.next(false);
    this.apollo.client.cache.reset();
  }

  private exchangeToken() {
    this.authExchangeTokenGQL
      .fetch(
        { data: { rememberMe: !!ls.get<boolean>(LocalStorageKey.rememberMe) } },
        { fetchPolicy: 'no-cache' }
      )
      .pipe(
        retry({
          delay: this.#retryStrategy({
            excludeStatusCodes: ['FORBIDDEN', 'UNAUTHENTICATED', 'INTERNAL_SERVER_ERROR'],
            delay: this.env.auth.retryExchangeTokenDelay,
          }),
        })
      )
      .subscribe({
        next: ({ data: { authExchangeToken } }) => {
          this.setSession(authExchangeToken);
          if (!this.env.production) console.log('Exchanged token');
        },
        error: (error: ApolloError | string) => {
          this.logout();
          console.error('Exchange token failed', error);
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

  #retryStrategy({
    maxAttempts = Infinity,
    delay = 5000,
    excludeStatusCodes = [],
  }: {
    maxAttempts?: number;
    delay?: number;
    excludeStatusCodes?: string[];
  }) {
    return (error: ApolloError, retryCount: number) => {
      const excludedStatusFound = !!excludeStatusCodes.find(exclude => exclude === error.message);

      if (error?.message === ApiError.Codes.USER_NOT_FOUND) {
        return throwError(() => error);
      }

      if (retryCount > maxAttempts || excludedStatusFound) {
        return throwError(() => error);
      }

      console.warn(
        `Exchange token attempt ${retryCount}. Retrying in ${Math.round(delay / 1000)}s`,
        error
      );

      return timer(delay);
    };
  }
}
