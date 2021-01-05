import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthExchangeTokenGQL,
  AuthLoginGQL,
  AuthLoginInput,
  AuthSession,
  GqlErrors,
  GraphQLModule,
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
    // Initialize apollo client state
    this.loggedIn = this.sessionTimeRemaining > 0;

    const roles = localStorage.getItem(LocalStorageKey.roles);
    userRolesVar(roles ? atob(roles).split(',') : []);

    // Start the token exchange interval if the user is logged in
    if (this.loggedIn) this.startExchangeInterval();

    this.graphqlSubscriptionClient$.subscribe(() =>
      GraphQLModule.reconnectSubscriptionClient()
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
    this.loggedIn = false;
    this.router.navigateByUrl('/login');
  }

  exchangeToken() {
    if (this.loggedIn) {
      this.authExchangeTokenGQL
        .fetch(undefined, { fetchPolicy: 'network-only' })
        .subscribe({
          next: ({ data: { authExchangeToken } }) => {
            // Re-run route guards if roles have changed
            // TODO: See if this is necessary
            if (!this.rolesEqual(userRolesVar(), authExchangeToken.roles)) {
              console.log('Reload', this.router.url);
              this.setSession(authExchangeToken);
              this.router.navigateByUrl(this.router.url);
            }

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

    this.loggedIn = true;
    this.#graphqlSubscriptionClient$.next(authSession);
  }

  private clearLocalStorage() {
    localStorage.removeItem(LocalStorageKey.sessionExpiresOn);
    localStorage.removeItem(LocalStorageKey.rememberMe);
    localStorage.removeItem(LocalStorageKey.roles);
    userRolesVar([]);
  }

  private get sessionTimeRemaining(): number {
    const sessionExpiresOnString = localStorage.getItem(LocalStorageKey.sessionExpiresOn);
    if (!sessionExpiresOnString) return 0;

    const expiresOn = +sessionExpiresOnString;
    const timeRemaining = expiresOn - Date.now();

    if (timeRemaining <= 0) return 0;
    else return timeRemaining;
  }

  rolesEqual(a: string[] | null | undefined, b: string[] | null | undefined) {
    if (a && b) return isEqual(orderBy(a), orderBy(b));
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

  get loggedIn(): boolean {
    return this.sessionTimeRemaining > 0;
  }

  set loggedIn(value: boolean) {
    if (!value) {
      this.stopExchangeInterval();
      this.clearLocalStorage();
      Cookies.remove('jwt');
      Cookies.remove('rememberMe');
      this.apollo.client.cache.reset();
      this.#graphqlSubscriptionClient$.next(null);
    }

    if (value !== loggedInVar()) loggedInVar(value);
  }

  private startExchangeInterval() {
    if (!this.rememberMe && !this.#exchangeIntervalSubscription) {
      this.#exchangeIntervalSubscription = interval(this.#EXCHANGE_INTERVAL).subscribe(
        () => {
          this.exchangeToken();
        }
      );
    }

    if (!this.#autoLogoutSubscription) {
      this.#autoLogoutSubscription = timer(60_000, 30_000).subscribe(() => {
        if (this.sessionTimeRemaining <= 0) this.logout();
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
