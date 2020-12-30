export function isNumber(str: string) {
  return !isNaN(<any>str) && !isNaN(parseFloat(str));
}
