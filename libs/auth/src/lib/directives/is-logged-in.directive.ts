import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoggedInGQL } from '@zen/graphql';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Directive({
  selector: '[isLoggedIn]',
})
export class IsLoggedInDirective implements OnDestroy {
  private subsciption: Subscription;
  private embededViewRef: any;
  private showIfLoggedIn?: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService,
    private loggedInGQL: LoggedInGQL
  ) {
    this.subsciption = this.loggedInGQL.watch().valueChanges.subscribe(() => this.showIfAllowed());
  }

  @Input()
  set isLoggedIn(value: boolean) {
    this.showIfLoggedIn = value;
    this.showIfAllowed();
  }

  showIfAllowed() {
    if (
      (this.showIfLoggedIn && this.auth.loggedIn) ||
      (!this.showIfLoggedIn && !this.auth.loggedIn)
    ) {
      this.render();
    } else {
      this.clear();
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
