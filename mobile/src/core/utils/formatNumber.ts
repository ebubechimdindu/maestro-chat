export const formatAmount = (
  amount: string | number,
  isVisible: boolean = true,
) => {
  const numericAmount = amount ? +amount.toString().replaceAll(",", "") : 0;
  const isNegative = numericAmount < 0;

  if (!isVisible) return "******";

  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(numericAmount));

  return isNegative ? `-$${formattedNumber}` : `$${formattedNumber}`;
};
