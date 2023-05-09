import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
} from '@angular/core';

import { AuthService } from '../auth.service';

@Directive({
  selector: '[ifLoggedIn]',
  standalone: true,
})
export class IfLoggedInDirective {
  #embededViewRef: EmbeddedViewRef<unknown> | undefined;
  #ifLoggedIn?: boolean;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) {
    effect(() => {
      auth.loggedIn();
      this.update();
    });
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
    if ((this.ifLoggedIn && this.auth.loggedIn()) || (!this.ifLoggedIn && !this.auth.loggedIn())) {
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
}
