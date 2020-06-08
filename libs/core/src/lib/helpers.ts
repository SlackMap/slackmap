
/**
 * helper functions
 */
export function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
export function isNumber(value) {
  return Number.isInteger(value);
}
export function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
