import { Directive, Input, TemplateRef } from '@angular/core';
import { DetailTemplateShowIfFn } from '@progress/kendo-angular-grid';

@Directive({
  selector: '[zenGridDetailTemplate]',
  standalone: true,
})
export class ZenGridDetailTemplateDirective {
  @Input() zenGridDetailTemplateShowIf!: DetailTemplateShowIfFn;

  constructor(public host: TemplateRef<any>) {}
}
