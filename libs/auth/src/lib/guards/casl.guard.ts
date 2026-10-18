import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Ability, Subject } from '@casl/ability';
import { Action } from '@zen/common';

/**
 * Produces Angular functional route guards
 */
export class CaslGuard {
  /**
   * Produces Angular functional route guards that check if the user has the given CASL ability.
   * Redirects to the login page otherwise.
   */
  static can(action: Action, subject: Subject): CanMatchFn {
    return () => (inject(Ability).can(action, subject) ? true : inject(Router).parseUrl('/login'));
  }

  /**
   * Produces Angular functional route guards that check if the user does not have the given CASL ability.
   * Redirects to the login page otherwise.
   */
  static cannot(action: Action, subject: Subject): CanMatchFn {
    return () =>
      inject(Ability).cannot(action, subject) ? true : inject(Router).parseUrl('/login');
  }
}
