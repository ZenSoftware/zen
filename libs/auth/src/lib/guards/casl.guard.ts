import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Ability, Subject } from '@casl/ability';
import { Action } from '@zen/common';

export class CaslGuard {
  static can(action: Action, subject: Subject): CanMatchFn {
    return () => (inject(Ability).can(action, subject) ? true : inject(Router).parseUrl('/login'));
  }

  static cannot(action: Action, subject: Subject): CanMatchFn {
    return () =>
      inject(Ability).cannot(action, subject) ? true : inject(Router).parseUrl('/login');
  }
}
