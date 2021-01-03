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
  private subsciption: Subscription;
  private allowedRoles?: string | string[];
  private embededViewRef: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService,
    private userRolesGQL: UserRolesGQL
  ) {
    this.subsciption = this.userRolesGQL
      .watch()
      .valueChanges.subscribe(() => this.showIfAllowed());
  }

  @Input()
  set roles(allowedRoles: string | string[]) {
    this.allowedRoles = allowedRoles;
    this.showIfAllowed();
  }

  showIfAllowed() {
    if (this.allowedRoles === null || this.allowedRoles === undefined) {
      this.render();
      return;
    } else {
      if (this.auth.userHasRole(Role.Admin) || this.auth.userHasRole(this.allowedRoles)) {
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
