import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { Ability, Subject } from '@casl/ability';
import { Action } from '@zen/api-interfaces';

export class CaslGuard {
  static can(action: keyof typeof Action, subject: Subject, field?: string | undefined) {
    @Injectable({
      providedIn: 'root',
    })
    class CaslCan implements CanActivate, CanActivateChild, CanLoad {
      constructor(private router: Router, private ability: Ability) {}

      canActivate() {
        return this.ability.can(action, subject, field) ? true : this.router.parseUrl('/login');
      }

      canActivateChild() {
        return this.canActivate();
      }

      canLoad() {
        return this.canActivate();
      }
    }

    return CaslCan;
  }

  static cannot(action: keyof typeof Action, subject: Subject, field?: string | undefined) {
    @Injectable({
      providedIn: 'root',
    })
    class CaslCannot implements CanActivate, CanActivateChild, CanLoad {
      constructor(private router: Router, private ability: Ability) {}

      canActivate() {
        return this.ability.cannot(action, subject, field) ? true : this.router.parseUrl('/login');
      }

      canActivateChild() {
        return this.canActivate();
      }

      canLoad() {
        return this.canActivate();
      }
    }

    return CaslCannot;
  }
}
