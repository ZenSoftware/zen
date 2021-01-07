import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthExchangeTokenGQL,
  AuthLoginGQL,
  AuthLoginInput,
  AuthSession,
  GqlErrors,
  ZenGraphQLModule,
} from '@zen/graphql';
import { loggedInVar, userRolesVar } from '@zen/graphql/client';
import { Apollo } from 'apollo-angular';
import Cookies from 'js-cookie';
import { intersection, isEqual, orderBy } from 'lodash-es';
import { BehaviorSubject, Subscription, interval, timer } from 'rxjs';
import { debounce, tap } from 'rxjs/operators';

enum LocalStorageKey {
  sessionExpiresOn = 'sessionExpiresOn',
  roles = 'roles',
  rememberMe = 'rememberMe',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #EXCHANGE_INTERVAL = 30 * 60 * 1000; // 30 minutes
  #exchangeIntervalSubscription?: Subscription;
  #autoLogoutSubscription?: Subscription;
  #graphqlSubscriptionClient$ = new BehaviorSubject<AuthSession | null>(null);

  constructor(
    private router: Router,
    private apollo: Apollo,
    private authLoginGQL: AuthLoginGQL,
    private authExchangeTokenGQL: AuthExchangeTokenGQL
  ) {
    if (this.loggedIn) {
      const roles = localStorage.getItem(LocalStorageKey.roles);
      userRolesVar(roles ? atob(roles).split(',') : []); // Initialize apollo client state

      if (this.sessionTimeRemaining <= this.#EXCHANGE_INTERVAL) this.exchangeToken();

      this.startExchangeInterval();
    } else {
      this.clearSession();
    }

    this.graphqlSubscriptionClient$.subscribe(() =>
      ZenGraphQLModule.reconnectSubscriptionClient()
    );
  }

  get graphqlSubscriptionClient$() {
    return this.#graphqlSubscriptionClient$.pipe(debounce(() => timer(100)));
  }

  login(data: AuthLoginInput) {
    return this.authLoginGQL
      .fetch({ data: <AuthLoginInput>data }, { fetchPolicy: 'network-only' })
      .pipe(
        tap(({ data: { authLogin } }) => {
          this.setSession(authLogin);
        })
      );
  }

  logout() {
    loggedInVar(false);
    this.clearSession();
    this.router.navigateByUrl('/login');
  }

  setSession(authSession: AuthSession) {
    const expiresOn = Date.now() + parseInt(authSession.maxAge, 10);
    localStorage.setItem(LocalStorageKey.sessionExpiresOn, expiresOn.toString());
    localStorage.setItem(LocalStorageKey.rememberMe, authSession.rememberMe.toString());
    localStorage.setItem(LocalStorageKey.roles, btoa(authSession.roles.toString()));

    if (!this.rolesEqual(userRolesVar(), authSession.roles)) {
      if (authSession.roles) userRolesVar(authSession.roles);
      else userRolesVar([]);
    }

    loggedInVar(true);
    this.#graphqlSubscriptionClient$.next(authSession);
    this.startExchangeInterval();
  }

  rolesEqual(
    a: string | string[] | null | undefined,
    b: string | string[] | null | undefined
  ) {
    if (Array.isArray(a) && Array.isArray(b)) return isEqual(orderBy(a), orderBy(b));
    return a === b;
  }

  userHasRole(role: string | string[]) {
    if (role) {
      if (typeof role === 'string') return userRolesVar().some(r => r === role);
      else return userRolesVar().some(r => role.indexOf(r) >= 0);
    }
    return false;
  }

  userNotInRole(role: string | string[]) {
    if (role) {
      if (typeof role === 'string') return !userRolesVar().some(r => r === role);
      else return intersection(userRolesVar(), role).length === 0;
    }
    return true;
  }

  private get rememberMe(): boolean {
    return 'true' === localStorage.getItem(LocalStorageKey.rememberMe);
  }

  private get loggedIn(): boolean {
    return this.sessionTimeRemaining > 0;
  }

  private get sessionTimeRemaining(): number {
    const sessionExpiresOnString = localStorage.getItem(LocalStorageKey.sessionExpiresOn);
    if (!sessionExpiresOnString) return 0;

    const expiresOn = +sessionExpiresOnString;
    const timeRemaining = expiresOn - Date.now();

    if (timeRemaining <= 0) return 0;
    else return timeRemaining;
  }

  private clearSession() {
    this.stopExchangeInterval();
    localStorage.removeItem(LocalStorageKey.sessionExpiresOn);
    localStorage.removeItem(LocalStorageKey.rememberMe);
    localStorage.removeItem(LocalStorageKey.roles);
    userRolesVar([]);
    Cookies.remove('jwt');
    Cookies.remove('rememberMe');
    this.apollo.client.cache.reset();
    this.#graphqlSubscriptionClient$.next(null);
  }

  private exchangeToken() {
    this.authExchangeTokenGQL
      .fetch(undefined, { fetchPolicy: 'network-only' })
      .subscribe({
        next: ({ data: { authExchangeToken } }) => {
          this.setSession(authExchangeToken);
          console.log('Exchanged token');
        },
        error: errors => {
          const gqlErrors = new GqlErrors(errors);

          if (gqlErrors.find(e => e.statusCode === 401)) {
            this.logout();
            console.error('Exchange token failed');
          }
        },
      });
  }

  private startExchangeInterval() {
    if (!this.rememberMe && !this.#exchangeIntervalSubscription) {
      this.#exchangeIntervalSubscription = interval(this.#EXCHANGE_INTERVAL).subscribe(
        () => {
          if (this.loggedIn) this.exchangeToken();
          else this.logout();
        }
      );
    }

    if (!this.#autoLogoutSubscription) {
      this.#autoLogoutSubscription = interval(30_000).subscribe(() => {
        if (!this.loggedIn) this.logout();
      });
    }
  }

  private stopExchangeInterval() {
    if (this.#exchangeIntervalSubscription) {
      this.#exchangeIntervalSubscription.unsubscribe();
      this.#exchangeIntervalSubscription = undefined;
    }

    if (this.#autoLogoutSubscription) {
      this.#autoLogoutSubscription.unsubscribe();
      this.#autoLogoutSubscription = undefined;
    }
  }
}
