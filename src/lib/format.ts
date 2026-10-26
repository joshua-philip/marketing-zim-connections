/**
 * @module lib/format
 * @meta Formats campaign amounts consistently as whole-pound GBP values.
 */

const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}
