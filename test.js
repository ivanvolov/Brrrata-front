function shortenDecimals(strValue, decimalPlaces = 6, firstToCut = 8) {
  let splitNum = strValue.split('.');

  if (String(splitNum[0]).length > 8) {
    strValue = splitNum[0];
  } else if (splitNum[1]) {
    let _strValue = strValue;
    do {
      splitNum = _strValue.split('.');
      if (splitNum[1].length > decimalPlaces) {
        splitNum[1] = splitNum[1].substring(0, decimalPlaces);
      }
      decimalPlaces++;
      // console.log(
      //   _strValue,
      //   decimalPlaces - 1,
      //   splitNum[1],
      //   '0'.repeat(decimalPlaces - 1),
      // );
    } while (splitNum[1] == '0'.repeat(decimalPlaces - 1));

    strValue = splitNum.join('.');
  }
  return strValue;
}

// Example usage:
console.log(shortenDecimals('1.007337', 2)); // Output: "1.007"
console.log(shortenDecimals('1.007337', 5)); // Output: "1.00733"
console.log(shortenDecimals('123456789.007337', 6)); // Output: "123456789"
console.log(shortenDecimals('1.007337', 3)); // Output: "1.007"
console.log(shortenDecimals('1.007337', 6)); // Output: "1.007337"
