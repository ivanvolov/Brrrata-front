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
  return formatUnits(value.toBigInt(), 18);
};

export const trueParse = (value: string): BigNumber => {
  try {
    return BigNumber.from(parseUnits(value, 18));
  } catch (err) {
    console.log(err);
    return BigNumber.from(0);
  }
};
