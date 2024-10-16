export const tokenAmountInputRestriction = (value: string) => {
  // Only numbers
  let newValue = value.toString().replace(/[^0-9.]/gi, '');

  // Only one dot
  let output = newValue.split('.');
  if (output.length > 2) {
    newValue = output.shift() + '.' + output.join('');
  }

  // Decimal places to many
  let splitNum = newValue.split('.');

  const decimalPlaces = 18;
  if (splitNum[1].length > decimalPlaces) {
    splitNum[1] = splitNum[1].substring(0, decimalPlaces);
  }

  newValue = splitNum.join('.');

  return newValue;
};
