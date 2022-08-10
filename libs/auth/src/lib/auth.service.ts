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
  GqlErrors,
  parseGqlErrors,
} from '@zen/graphql';
import { loggedInVar, userRolesVar } from '@zen/graphql/client';
import { Apollo } from 'apollo-angular';
import ls from 'localstorage-slim';
import { intersection, isEqual, orderBy } from 'lodash-es';
import { Observable, Subscription, interval, throwError, timer } from 'rxjs';
import { catchError, mergeMap, retryWhen, tap } from 'rxjs/operators';

import { tokenVar } from './token-var';

enum LocalStorageKey {
  userId = 'userId',
  token = 'token',
  sessionExpiresOn = 'sessionExpiresOn',
  roles = 'roles',
  rememberMe = 'rememberMe',
  ability = 'ability',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #exchangeIntervalSubscription?: Subscription;
  #userId: AuthSession['id'] | null = null;
  get userId(): AuthSession['id'] | null {
    return this.#userId;
  }

  constructor(
    private router: Router,
    private apollo: Apollo,
    private ability: Ability,
    private authLoginGQL: AuthLoginGQL,
    private authExchangeTokenGQL: AuthExchangeTokenGQL,
    private env: Environment
  ) {
    if (this.validSession) {
      try {
        // Initialize apollo client state
        const roles = ls.get(LocalStorageKey.roles, { decrypt: true }) as string[];
        userRolesVar(roles ? roles : []);
        loggedInVar(true);
        this.#userId = ls.get(LocalStorageKey.userId, { decrypt: true });

        const rules: any = ls.get(LocalStorageKey.ability, { decrypt: true });
        if (rules) this.ability.update(rules);

        if (this.sessionTimeRemaining <= env.jwtExchangeInterval) {
          this.exchangeToken();
        } else if (
          this.rememberMe &&
          this.sessionTimeRemaining <= env.rememberMeExchangeThreshold
        ) {
          this.exchangeToken();
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
    const expiresOn = Date.now() + authSession.expiresIn * 1000;
    ls.set(LocalStorageKey.userId, authSession.id, { encrypt: true });
    ls.set(LocalStorageKey.token, authSession.token, { encrypt: true });
    ls.set(LocalStorageKey.sessionExpiresOn, expiresOn);
    ls.set(LocalStorageKey.rememberMe, authSession.rememberMe);
    ls.set(LocalStorageKey.roles, authSession.roles, { encrypt: true });
    ls.set(LocalStorageKey.ability, authSession.ability, { encrypt: true });

    this.ability.update(authSession.ability);

    tokenVar(authSession.token);

    if (!this.rolesEqual(this.roles, authSession.roles)) {
      if (authSession.roles) userRolesVar(authSession.roles);
      else userRolesVar([]);
    }

    loggedInVar(true);
    this.startExchangeInterval();
  }

  rolesEqual(a: string | string[] | null | undefined, b: string | string[] | null | undefined) {
    if (Array.isArray(a) && Array.isArray(b)) return isEqual(orderBy(a), orderBy(b));
    return a === b;
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
      else return intersection(this.roles, role).length === 0;
    }
    return true;
  }

  get roles() {
    return userRolesVar();
  }

  get loggedIn() {
    return loggedInVar();
  }

  private get rememberMe(): boolean {
    return ls.get(LocalStorageKey.rememberMe) as boolean;
  }

  private get validSession(): boolean {
    return this.sessionTimeRemaining > 0;
  }

  private get sessionTimeRemaining(): number {
    const expiresOn = ls.get(LocalStorageKey.sessionExpiresOn) as number;
    if (!expiresOn) return 0;

    const timeRemaining = expiresOn - Date.now();

    if (timeRemaining <= 0) return 0;
    else return timeRemaining;
  }

  private clearSession() {
    this.stopExchangeInterval();
    ls.remove(LocalStorageKey.userId);
    ls.remove(LocalStorageKey.token);
    ls.remove(LocalStorageKey.sessionExpiresOn);
    ls.remove(LocalStorageKey.rememberMe);
    ls.remove(LocalStorageKey.roles);
    ls.remove(LocalStorageKey.ability);

    this.#userId = null;
    userRolesVar([]);
    tokenVar(null);
    loggedInVar(false);
    this.apollo.client.cache.reset();
  }

  private exchangeToken() {
    this.authExchangeTokenGQL
      .fetch(
        { data: { rememberMe: ls.get(LocalStorageKey.rememberMe) as boolean } },
        { fetchPolicy: 'no-cache' }
      )
      .pipe(
        catchError(parseGqlErrors),
        retryWhen(
          retryStrategy({
            delay: 3000,
            excludedStatusCodes: [401, 403],
          })
        )
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
      this.#exchangeIntervalSubscription = interval(this.env.jwtExchangeInterval).subscribe(() => {
        if (this.validSession) this.exchangeToken();
        else this.logout();
      });
    }
  }

  private stopExchangeInterval() {
    if (this.#exchangeIntervalSubscription) {
      this.#exchangeIntervalSubscription.unsubscribe();
      this.#exchangeIntervalSubscription = undefined;
    }
  }
}

const retryStrategy =
  ({
    maxRetryAttempts: maxRetry = Infinity,
    delay = 1000,
    excludedStatusCodes = [],
  }: {
    maxRetryAttempts?: number;
    delay?: number;
    excludedStatusCodes?: number[];
  } = {}) =>
  (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((errors: GqlErrors, i) => {
        const retryAttempt = i + 1;

        if (
          retryAttempt > maxRetry ||
          errors.find(e => excludedStatusCodes.find(exclude => exclude === e.statusCode))
        ) {
          return throwError(() => errors);
        }

        const delaySeconds = Math.round(delay / 1000);

        console.warn(
          `Exchange token attempt ${retryAttempt}: retrying in ${delaySeconds}s`,
          errors
        );

        return timer(delay);
      })
    );
  };
