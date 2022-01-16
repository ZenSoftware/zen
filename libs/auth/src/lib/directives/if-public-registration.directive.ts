import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Environment } from '@zen/common';

@Directive({
  selector: '[ifPublicRegistration]',
})
export class IfPublicRegistrationDirective {
  #embededViewRef: any;
  #ifPublicRegistration?: boolean | '';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private env: Environment
  ) {
    this.update();
  }

  @Input()
  set ifPublicRegistration(value: boolean | '' | undefined) {
    this.#ifPublicRegistration = value;
    this.update();
  }

  get ifPublicRegistration() {
    return this.#ifPublicRegistration ?? true;
  }

  update() {
    if (
      (this.ifPublicRegistration && this.env.publicRegistration) ||
      (!this.ifPublicRegistration && !this.env.publicRegistration)
    ) {
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
    this.#embededViewRef = null;
  }
}
