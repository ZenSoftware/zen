import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoggedInGQL } from '@zen/graphql';
import { loggedInVar } from '@zen/graphql/client';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Directive({
  selector: '[ifLoggedIn]',
})
export class IfLoggedInDirective implements OnDestroy {
  private subsciption: Subscription;
  private embededViewRef: any;
  private showIfLoggedIn?: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService,
    private loggedInGQL: LoggedInGQL
  ) {
    this.subsciption = this.loggedInGQL
      .watch()
      .valueChanges.subscribe(() => this.showIfAllowed());
  }

  @Input()
  set ifLoggedIn(value: boolean) {
    this.showIfLoggedIn = value;
    this.showIfAllowed();
  }

  showIfAllowed() {
    const loggedIn = loggedInVar();
    if ((this.showIfLoggedIn && loggedIn) || (!this.showIfLoggedIn && !loggedIn)) {
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
