import { useEffect } from 'react';
import {
  useReadContract,
  useAccount,
  useBlockNumber,
  useBalance,
  useWriteContract,
} from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../../web3/abi/FonduePit.json';
import brrrataABI from '../../web3/abi/Brrrata.json';
import wcheeseABI from '../../web3/abi/WCHEESE.json';
import {
  BRRRATA_ADDRESS,
  FONDUEPIT_ADDRESS,
  WCHEESE_ADDRESS,
  toUnit,
  UINT_256_MAX,
  fromUnit,
  toNumber,
} from '../../web3';

export default function Mint() {
  const queryClient = useQueryClient();

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress } = useAccount();

  const { data: balance, queryKey: queryKeyB } = useBalance({
    address: walletAddress,
  });

  const { data: wBalance, queryKey: queryKeyWB } = useBalance({
    address: walletAddress,
    token: WCHEESE_ADDRESS,
  });

  const { data: brrrBalance, queryKey: queryKeyWBrrr } = useBalance({
    address: walletAddress,
    token: BRRRATA_ADDRESS,
  });

  const { data: lastFormId, queryKey: queryKeyLF } = useReadContract({
    abi: fonduePitABI,
    address: FONDUEPIT_ADDRESS,
    functionName: 'formsId',
    args: [walletAddress],
  });

  const { data: allowanceWC, queryKey: queryKeyAllowanceWC } = useReadContract({
    abi: wcheeseABI,
    address: WCHEESE_ADDRESS,
    functionName: 'allowance',
    args: [walletAddress, BRRRATA_ADDRESS],
  });

  const { data: allowanceBR, queryKey: queryKeyAllowanceBR } = useReadContract({
    abi: brrrataABI,
    address: BRRRATA_ADDRESS,
    functionName: 'allowance',
    args: [walletAddress, FONDUEPIT_ADDRESS],
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

  const allowToPit = (value: any) => {
    writeContract({
      abi: brrrataABI,
      address: BRRRATA_ADDRESS,
      functionName: 'approve',
      args: [FONDUEPIT_ADDRESS, value],
    });
  };

  const mintBrrrata = (value: any) => {
    // TODO: Don't forget about spin!
    console.log('>> mintBrrrata', value);
    writeContract({
      abi: brrrataABI,
      address: BRRRATA_ADDRESS,
      functionName: 'giveMeBrrrata',
      args: [value, walletAddress],
    });
  };

  const lockBrrrata = (value: any, periodId: number) => {
    console.log('>> lockBrrrata', value, periodId);
    writeContract({
      abi: fonduePitABI,
      address: FONDUEPIT_ADDRESS,
      functionName: 'stake',
      args: [value, walletAddress, periodId],
    });
  };

  useEffect(() => {
    if (blockNumber === undefined) return;
    console.log('Update at BlockNumber:', blockNumber);
    queryClient.invalidateQueries({ queryKey: queryKeyB });
    queryClient.invalidateQueries({ queryKey: queryKeyWB });
    queryClient.invalidateQueries({ queryKey: queryKeyWBrrr });
    queryClient.invalidateQueries({ queryKey: queryKeyLF });
    queryClient.invalidateQueries({ queryKey: queryKeyAllowanceWC });
    queryClient.invalidateQueries({ queryKey: queryKeyAllowanceBR });
    queryClient.invalidateQueries({ queryKey: queryKeySpin });
  }, [blockNumber, queryClient, walletAddress]);
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Mint</h2>
      <div className="relative mb-4">
        <input
          type="number"
          className="w-full rounded border p-2 pr-16 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="Amount to Mint"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-200 px-2 py-1 text-sm text-gray-700">
          Max
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Amount</label>
          <span className="text-gray-700" id="rangeValue">
            0
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value="0"
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        />
      </div>
      <button className="mt-4 w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition-colors hover:bg-blue-600">
        Mint Brrata
      </button>
    </div>
  );
}
