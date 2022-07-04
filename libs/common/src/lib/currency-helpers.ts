import { formatNumber } from '@progress/kendo-angular-intl';
export { formatNumber } from '@progress/kendo-angular-intl';

export function dollarsToCents(value: number | null | undefined) {
  if (typeof value === 'number') return Math.round(value * 100);
  else return null;
}

export function centsToDollars(value: number | null | undefined) {
  if (typeof value === 'number') return value / 100;
  else return null;
}

export function formatCentsToDollars(value: number | null | undefined) {
  if (typeof value === 'number') return formatNumber(centsToDollars(value) as number, 'c2');
  else return '';
}
