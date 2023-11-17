import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Directive({
  selector: '[ifLoggedIn]',
  standalone: true,
})
export class IfLoggedInDirective implements OnDestroy {
  #embededViewRef: EmbeddedViewRef<unknown> | undefined;
  #ifLoggedIn?: boolean;
  #sub: Subscription;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) {
    this.#sub = auth.loggedIn$.subscribe(() => this.update());
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
    this.#sub.unsubscribe();
  }
}
