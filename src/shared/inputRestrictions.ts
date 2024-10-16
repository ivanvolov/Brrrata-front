export const amountStringInputRestriction = (value: string): string => {
  // Only numbers
  let newValue = value.toString().replace(/[^0-9.]/gi, '');

  // Only one dot
  let output = newValue.split('.');
  if (output.length > 2) {
    newValue = output.shift() + '.' + output.join('');
  }

  // Decimal places to many
  let splitNum = newValue.split('.');
  if (splitNum[1]) {
    const decimalPlaces = 18;
    if (splitNum[1].length > decimalPlaces) {
      splitNum[1] = splitNum[1].substring(0, decimalPlaces);
    }
    newValue = splitNum.join('.');
  }

  // Natural places to many
  splitNum = newValue.split('.');
  if (splitNum[0]) {
    const decimalPlaces = 59;
    if (splitNum[0].length > decimalPlaces) {
      splitNum[0] = splitNum[0].substring(splitNum[0].length - decimalPlaces);
    }
    newValue = splitNum.join('.');
  }

  return newValue;
};
