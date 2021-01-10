import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Environment } from '@zen/common';

@Directive({
  selector: '[ifPublicRegistration]',
})
export class IfPublicRegistration {
  #embededViewRef: any;
  #ifPublicRegistration?: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private env: Environment
  ) {
    this.showIfAllowed();
  }

  @Input()
  set ifPublicRegistration(value: boolean | undefined) {
    this.#ifPublicRegistration = value;
    this.showIfAllowed();
  }

  get ifPublicRegistration() {
    return this.#ifPublicRegistration ?? true;
  }

  showIfAllowed() {
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
