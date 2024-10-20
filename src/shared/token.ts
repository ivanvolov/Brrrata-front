import { BigNumberish } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/utils';
import { BigNumber } from '@ethersproject/bignumber';

export function toBN(value: any, decimals?: number): BigNumber {
  if (value == undefined || value == null) return BigNumber.from(0);
  if (decimals)
    return BigNumber.from(value).mul(BigNumber.from(10).pow(decimals));
  return BigNumber.from(value);
}

export function toNumber(value: BigNumberish): number {
  return Number(value.toString());
}

export const format = (value: BigNumber): string => {
  const formatted = formatUnits(value.toBigInt(), 18);
  return formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted;
};

export const formatShort = (value: BigNumber): string => {
  let strValue = format(value);
  let decimalPlaces = 6;
  const decimalsToZeroOut = 4;
  let splitNum = strValue.split('.');

  if (String(splitNum[0]).length > decimalsToZeroOut) {
    strValue = splitNum[0];
  } else if (splitNum[1]) {
    let _strValue = strValue;
    do {
      splitNum = _strValue.split('.');
      if (splitNum[1].length > decimalPlaces) {
        splitNum[1] = splitNum[1].substring(0, decimalPlaces);
      }
      decimalPlaces++;
    } while (splitNum[1] == '0'.repeat(decimalPlaces - 1));

    strValue = splitNum.join('.');
  }
  return strValue;
};

export const trueParse = (value: string): BigNumber => {
  try {
    return BigNumber.from(parseUnits(value, 18));
  } catch (err) {
    console.log(err);
    return BigNumber.from(0);
  }
};
