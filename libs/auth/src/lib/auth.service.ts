import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from '@zen/common';
import {
  ApiError,
  AuthExchangeTokenGQL,
  AuthLoginGQL,
  AuthLoginInput,
  AuthSession,
  GqlErrors,
  ZenGraphQLModule,
  parseGqlErrors,
} from '@zen/graphql';
import { loggedInVar, userRolesVar } from '@zen/graphql/client';
import { Apollo } from 'apollo-angular';
import ls from 'localstorage-slim';
import { intersection, isEqual, orderBy } from 'lodash-es';
import { Observable, Subject, Subscription, interval, throwError, timer } from 'rxjs';
import { catchError, debounce, mergeMap, retryWhen, tap } from 'rxjs/operators';

import { tokenVar } from './token-var';

enum LocalStorageKey {
  token = 'token',
  sessionExpiresOn = 'sessionExpiresOn',
  roles = 'roles',
  rememberMe = 'rememberMe',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #exchangeIntervalSubscription?: Subscription;
  #graphqlSubscriptionClient$ = new Subject<AuthSession | null>();

  constructor(
    private router: Router,
    private apollo: Apollo,
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

        if (this.sessionTimeRemaining <= env.jwtExchangeInterval) {
          this.exchangeToken();
        } else if (
          this.rememberMe &&
          this.sessionTimeRemaining <= this.env.rememberMeExchangeThreshold
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
      loggedInVar(false);
    }

    if (ZenGraphQLModule.subscriptionClient) {
      this.graphqlSubscriptionClient$.subscribe(() =>
        ZenGraphQLModule.reconnectSubscriptionClient()
      );
    }
  }

  get graphqlSubscriptionClient$() {
    return this.#graphqlSubscriptionClient$.pipe(debounce(() => timer(10)));
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

  logout() {
    this.clearSession();
    loggedInVar(false);
    this.router.navigateByUrl('/login');
  }

  setSession(authSession: AuthSession) {
    const expiresOn = Date.now() + authSession.expiresIn * 1000;
    ls.set(LocalStorageKey.token, authSession.token, { encrypt: true });
    ls.set(LocalStorageKey.sessionExpiresOn, expiresOn);
    ls.set(LocalStorageKey.rememberMe, authSession.rememberMe);
    ls.set(LocalStorageKey.roles, authSession.roles, { encrypt: true });

    tokenVar(authSession.token);

    if (!this.rolesEqual(this.roles, authSession.roles)) {
      if (authSession.roles) userRolesVar(authSession.roles);
      else userRolesVar([]);
    }

    loggedInVar(true);
    this.#graphqlSubscriptionClient$.next(authSession);
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
    ls.remove(LocalStorageKey.token);
    ls.remove(LocalStorageKey.sessionExpiresOn);
    ls.remove(LocalStorageKey.rememberMe);
    ls.remove(LocalStorageKey.roles);
    userRolesVar([]);
    tokenVar(null);
    this.apollo.client.cache.reset();
    this.#graphqlSubscriptionClient$.next(null);
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
            maxRetryAttempts: 10,
            duration: this.sessionTimeRemaining / 10,
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
    maxRetryAttempts: maxRetry = 3,
    duration = 1000,
    excludedStatusCodes = [],
  }: {
    maxRetryAttempts?: number;
    duration?: number;
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

        const durationMinutes = Math.round(duration / (1000 * 60));

        console.warn(
          `Exchange token attempt ${retryAttempt}: retrying in ${durationMinutes}min`,
          errors
        );

        return timer(duration);
      })
    );
  };
