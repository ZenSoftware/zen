import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'centsToDollars',
})
export class CentsToDollarsPipe implements PipeTransform {
  transform(value: number): number {
    return value / 100;
  }
}
