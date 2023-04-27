const CURRENCY_FORMATTER = Intl.NumberFormat(undefined, {
  currency: "INR",
  style: "currency",
});
export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number);
}
