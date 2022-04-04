import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserRolesGQL } from '@zen/graphql';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Directive({
  selector: '[notRoles]',
})
export class NotRolesDirective implements OnDestroy {
  #subsciption: Subscription;
  #roles?: string | string[];
  #embededViewRef: EmbeddedViewRef<any> | undefined;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService,
    private userRolesGQL: UserRolesGQL
  ) {
    this.#subsciption = this.userRolesGQL.watch().valueChanges.subscribe(() => this.update());
  }

  @Input()
  set notRoles(roles: string | string[]) {
    this.#roles = roles;
    this.update();
  }

  update() {
    if (this.#roles === null || this.#roles === undefined) {
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
