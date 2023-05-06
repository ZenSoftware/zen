import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from '@zen/common';
import { UserRolesGQL } from '@zen/graphql';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Directive({
  selector: '[notRoles]',
  standalone: true,
})
export class NotRolesDirective implements OnDestroy {
  #subsciption: Subscription;
  #roles?: string | string[];
  #embededViewRef: EmbeddedViewRef<unknown> | undefined;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService,
    private userRolesGQL: UserRolesGQL
  ) {
    this.#subsciption = this.userRolesGQL.watch().valueChanges.subscribe(() => this.update());
  }

  @Input()
  set notRoles(roles: Role | Array<Role>) {
    this.#roles = roles;
    this.update();
  }

  update() {
    if (this.#roles === undefined || this.#roles === null) {
      this.render();
    } else {
      if (this.auth.userNotInRole(this.#roles)) {
        this.render();
      } else {
        this.clear();
      }
    }
  }

  render() {
    if (!this.#embededViewRef)
      this.#embededViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
  }

  clear() {
    this.viewContainer.clear();
    this.#embededViewRef = undefined;
  }

  ngOnDestroy() {
    this.#subsciption.unsubscribe();
  }
}
