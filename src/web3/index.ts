// import { BigNumberish } from 'ethers';
// import { formatUnits, parseUnits } from 'ethers/utils';

export const BRRRATA_ADDRESS = '0xceB0EFa4eF35e3De939A27397F378F8A6667f33f';

export const FONDUEPIT_ADDRESS = '0x631628f63f1afF506347E6BB60080C13C2073459';

export const WCHEESE_ADDRESS = '0x6537507cE0d262AE9d7af0fE83A91b019B98397A';

export const UINT_256_MAX =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const ACTIVE_CHAIN_ID = 9209108;

// export function toUnit(value: BigNumberish): string {
//   if (value == null || value == undefined) return '0';
//   return formatUnits(value, 18);
// }

// export function toNumber(value: BigNumberish): number {
//   return Number(value.toString());
// }

// export function fromUnit(value: string): BigNumberish {
//   return parseUnits(value, 18);
// }

// export const removeZerosFromBehind = (value: any): string => {
//   value = value.toString();
//   while (value[value.length - 1] === '0') value = value.slice(0, -1);
//   if (value == 0) return '0';
//   return value;
// };

export const periodMapping: { [key: string]: number } = {
  '0': 5040,
  '1': 5040 * 7 * 2,
  '2': 5040 * 7 * 4,
};
