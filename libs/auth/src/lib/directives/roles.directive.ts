import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role, UserRolesGQL } from '@zen/graphql';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Directive({
  selector: '[roles]',
})
export class RolesDirective implements OnDestroy {
  #subsciption: Subscription;
  #roles?: string | string[];
  #embededViewRef: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService,
    private userRolesGQL: UserRolesGQL
  ) {
    this.#subsciption = this.userRolesGQL
      .watch()
      .valueChanges.subscribe(() => this.update());
  }

  @Input()
  set roles(roles: string | string[]) {
    this.#roles = roles;
    this.update();
  }

  update() {
    if (this.#roles === null || this.#roles === undefined) {
      this.render();
    } else {
      if (this.auth.userHasRole(Role.Super) || this.auth.userHasRole(this.#roles)) {
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
    this.#embededViewRef = null;
  }

  ngOnDestroy() {
    this.#subsciption.unsubscribe();
  }
}
