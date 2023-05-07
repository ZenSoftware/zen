import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'centsToDollars',
  standalone: true,
})
export class CentsToDollarsPipe implements PipeTransform {
  transform(value: number): number {
    return value / 100;
  }
}
