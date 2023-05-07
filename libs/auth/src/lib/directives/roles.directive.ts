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
  selector: '[roles]',
  standalone: true,
})
export class RolesDirective implements OnDestroy {
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
  set roles(roles: Role | Array<Role>) {
    this.#roles = roles;
    this.update();
  }

  update() {
    if (this.#roles === undefined || this.#roles === null) {
      this.render();
    } else {
      if (this.auth.userHasRole(this.#roles)) {
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
