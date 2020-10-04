import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRolesGQL } from '@zen/graphql';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Directive({
  selector: '[notRoles]',
})
export class NotRolesDirective implements OnDestroy {
  private subsciption: Subscription;
  private roles?: string | string[];
  private embededViewRef: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService,
    private userRolesGQL: UserRolesGQL
  ) {
    this.subsciption = this.userRolesGQL.watch().valueChanges.subscribe(() => this.showIfAllowed());
  }

  @Input()
  set notRoles(allowedRoles: string | string[]) {
    this.roles = allowedRoles;
    this.showIfAllowed();
  }

  showIfAllowed() {
    if (this.roles === null || this.roles === undefined) {
      this.render();
      return;
    } else {
      if (this.auth.userNotInRole(this.roles)) {
        this.render();
      } else {
        this.clear();
      }
    }
  }

  render() {
    if (!this.embededViewRef)
      this.embededViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
  }

  clear() {
    this.viewContainer.clear();
    this.embededViewRef = null;
  }

  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }
}
