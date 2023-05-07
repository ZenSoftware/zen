import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoggedInGQL } from '@zen/graphql';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Directive({
  selector: '[ifLoggedIn]',
  standalone: true,
})
export class IfLoggedInDirective implements OnDestroy {
  #subsciption: Subscription;
  #embededViewRef: EmbeddedViewRef<unknown> | undefined;
  #ifLoggedIn?: boolean;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private loggedInGQL: LoggedInGQL,
    private auth: AuthService
  ) {
    this.#subsciption = this.loggedInGQL.watch().valueChanges.subscribe(() => this.update());
  }

  @Input()
  set ifLoggedIn(value: boolean) {
    this.#ifLoggedIn = value;
    this.update();
  }

  get ifLoggedIn() {
    return this.#ifLoggedIn ?? true;
  }

  update() {
    if ((this.ifLoggedIn && this.auth.loggedIn) || (!this.ifLoggedIn && !this.auth.loggedIn)) {
      this.render();
    } else {
      this.clear();
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
