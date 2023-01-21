import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoggedInGQL } from '@zen/graphql';
import { loggedInVar } from '@zen/graphql/client';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ifLoggedIn]',
})
export class IfLoggedInDirective implements OnDestroy {
  #subsciption: Subscription;
  #embededViewRef: EmbeddedViewRef<unknown> | undefined;
  #ifLoggedIn?: boolean;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private loggedInGQL: LoggedInGQL
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
    const loggedIn = loggedInVar();
    if ((this.ifLoggedIn && loggedIn) || (!this.ifLoggedIn && !loggedIn)) {
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
