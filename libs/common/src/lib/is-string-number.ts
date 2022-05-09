export function isStringNumber(str: string) {
  return !isNaN(<any>str) && !isNaN(parseFloat(str));
}
