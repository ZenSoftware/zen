import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
} from '@angular/core';
import { Role } from '@zen/common';

import { AuthService } from '../auth.service';

@Directive({
  selector: '[notRoles]',
  standalone: true,
})
export class NotRolesDirective {
  #roles?: string | string[];
  #embededViewRef: EmbeddedViewRef<unknown> | undefined;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) {
    effect(() => {
      this.auth.userRoles();
      this.update();
    });
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
}
