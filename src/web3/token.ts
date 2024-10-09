import { BigNumber } from '@ethersproject/bignumber';
import { utils } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

export const uintSolidityMaxValue: BigNumber = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

const defaultNumDigits = 18;

export const Token = (
  value: string | number,
  digits = defaultNumDigits,
): BigNumber => {
  if (value === 0 || value === '0' || !value) return BigNumber.from(0);
  if (typeof value == 'number') {
    if (value < 1e-18) return BigNumber.from(0);
    if (value < 1e-6)
      return parseUnits(String((value as number) * 1e12), digits - 12);
  }
  return parseUnits(String(value), digits);
};

export const _Token = (
  _value: BigNumber,
  roundDigits: number = 3,
  decimals: number = 18,
): string => {
  if (!_value) return '0';

  let [a, b] = utils.formatUnits(_value, decimals).toString().split('.');
  b = removeZerosFromBehind(b.slice(0, roundDigits));

  return b ? `${a}.${b}` : a;
};

export const removeZerosFromBehind = (value: any): string => {
  value = value.toString();
  while (value[value.length - 1] === '0') value = value.slice(0, -1);
  if (value == 0) return '0';
  return value;
};

// * if gets undefined, 0 returns -
// * if less then spesific treshold, returns -
export const statisticRepresenter = (value: any): string => {
  if (!value) return '-';
  value = removeZerosFromBehind(value);
  if (value == 0) return '-';
  return value;
};

export const isValidTokenAmount = (x: any) => {
  const err = isNaN(x) || !parseFloat(x);
  return !err;
};
