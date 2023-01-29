import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanMatch, Router } from '@angular/router';
import { Ability, Subject } from '@casl/ability';
import { Action } from '@zen/common';

export class CaslGuard {
  static can(action: Action, subject: Subject) {
    @Injectable({
      providedIn: 'root',
    })
    class CaslCan implements CanActivate, CanActivateChild, CanMatch {
      constructor(public router: Router, public ability: Ability) {}

      canActivate() {
        return this.ability.can(action, subject) ? true : this.router.parseUrl('/login');
      }

      canActivateChild() {
        return this.canActivate();
      }

      canMatch() {
        return this.canActivate();
      }
    }

    return CaslCan;
  }

  static cannot(action: Action, subject: Subject) {
    @Injectable({
      providedIn: 'root',
    })
    class CaslCannot implements CanActivate, CanActivateChild, CanMatch {
      constructor(public router: Router, public ability: Ability) {}

      canActivate() {
        return this.ability.cannot(action, subject) ? true : this.router.parseUrl('/login');
      }

      canActivateChild() {
        return this.canActivate();
      }

      canMatch() {
        return this.canActivate();
      }
    }

    return CaslCannot;
  }
}
