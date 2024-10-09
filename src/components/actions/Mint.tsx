import { useEffect, useState } from 'react';
import {
  useReadContract,
  useAccount,
  useBlockNumber,
  useBalance,
  useWriteContract,
} from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import brrrataABI from '../../web3/abi/Brrrata.json';
import wcheeseABI from '../../web3/abi/WCHEESE.json';
import {
  BRRRATA_ADDRESS,
  WCHEESE_ADDRESS,
  toUnit,
  UINT_256_MAX,
  removeZerosFromBehind,
  fromUnit,
  toNumber,
} from '../../web3';

import { Token } from '../../web3/token';

import { BigNumber } from '@ethersproject/bignumber';

export default function Mint() {
  const queryClient = useQueryClient();

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress } = useAccount();

  const { data: wBalance, queryKey: queryKeyWB } = useBalance({
    address: walletAddress,
    token: WCHEESE_ADDRESS,
  }) as any;

  const { data: allowanceWC, queryKey: queryKeyAllowanceWC } = useReadContract({
    abi: wcheeseABI,
    address: WCHEESE_ADDRESS,
    functionName: 'allowance',
    args: [walletAddress, BRRRATA_ADDRESS],
  });

  const { data: spin, queryKey: queryKeySpin } = useReadContract({
    abi: brrrataABI,
    address: BRRRATA_ADDRESS,
    functionName: 'spins',
    args: [walletAddress],
  });

  const { writeContract } = useWriteContract();

  const allowToBrrrata = (value: any) => {
    writeContract({
      abi: wcheeseABI,
      address: WCHEESE_ADDRESS,
      functionName: 'approve',
      args: [BRRRATA_ADDRESS, value],
    });
  };

  const mintBrrrata = () => {
    const value = fromUnit('0.0001');
    // TODO: Don't forget about spin!
    console.log('>> mintBrrrata', value, spin);
    writeContract({
      abi: brrrataABI,
      address: BRRRATA_ADDRESS,
      functionName: 'giveMeBrrrata',
      args: [value, walletAddress],
    });
  };

  useEffect(() => {
    if (blockNumber === undefined) return;
    console.log('Update at BlockNumber:', blockNumber);
    queryClient.invalidateQueries({ queryKey: queryKeyWB });
    queryClient.invalidateQueries({ queryKey: queryKeyAllowanceWC });
    queryClient.invalidateQueries({ queryKey: queryKeySpin });
  }, [blockNumber, queryClient, walletAddress]);

  // ---- Just react stuff

  const [valuePercent, setValuePercent] = useState(0);
  const [amount, setAmount] = useState(0);

  const updateAmount = (event: any) => {
    let _valuePercent = event.target.value;
    console.log('>> updateAmount', _valuePercent);
    setValuePercent(_valuePercent);
    let _amount = (Number(toUnit(wBalance?.value)) * _valuePercent) / 100;
    setAmount(_amount);
  };
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Mint</h2>
      <div className="relative mb-4">
        <input
          className="w-full rounded border p-2 pr-16 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="string"
          placeholder="0.0"
          autoComplete="off"
          value={removeZerosFromBehind(amount)}
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-200 px-2 py-1 text-sm text-gray-700">
          Max
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Amount</label>
          <span className="text-gray-700" id="rangeValue">
            Balance: {toUnit(wBalance?.value)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={valuePercent}
          onChange={(e) => updateAmount(e)}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        />
      </div>
      <button
        className="mt-4 w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition-colors hover:bg-blue-600"
        onClick={() => mintBrrrata()}
      >
        Mint Brrata
      </button>
    </div>
  );
}
