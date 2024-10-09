import { formatUnits, parseUnits, toBigInt } from 'ethers/utils';
import { BigNumber } from '@ethersproject/bignumber';

export function toBN(value: any, decimals?: number): BigNumber {
  if (!value) return BigNumber.from(0);
  if (decimals)
    return BigNumber.from(value).mul(BigNumber.from(10).pow(decimals));
  return BigNumber.from(value);
}

export const format = (value: BigNumber): string => {
  return formatUnits(value.toBigInt(), 18);
};

export const parse = (value: string): BigNumber => {
  return BigNumber.from(parseUnits(value, 18));
};
