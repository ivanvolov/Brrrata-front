import React, { useEffect } from 'react';
import {
  useReadContract,
  useAccount,
  useBlockNumber,
  useWriteContract,
} from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../../web3/abi/FonduePit.json';
import { FONDUEPIT_ADDRESS, periodMapping } from '../../web3';
import { toBN, format, toNumber } from '../../shared/token';

interface MoldFormProps {
  id: number;
}

function blockToDays(block: number) {
  return (block / 1000000000000).toFixed(0);
}

const MoldForm: React.FC<MoldFormProps> = ({ id }) => {
  const queryClient = useQueryClient();

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress } = useAccount();

  const result: any = useReadContract({
    abi: fonduePitABI,
    address: FONDUEPIT_ADDRESS,
    functionName: 'getForm',
    args: [walletAddress, id],
  });
  const {
    data: formData,
    queryKey: queryKeyFD,
    isLoading: isLoadingFD,
  } = result;

  const {
    data: interest,
    queryKey: queryKeyInterest,
    isLoading: isLoadingInterest,
  } = useReadContract({
    abi: fonduePitABI,
    address: FONDUEPIT_ADDRESS,
    functionName: 'getAccruedInterest',
    args: [walletAddress, id],
  });

  useEffect(() => {
    if (blockNumber === undefined) return;
    queryClient.invalidateQueries({ queryKey: queryKeyFD });
    queryClient.invalidateQueries({ queryKey: queryKeyInterest });
  }, [blockNumber, queryClient, walletAddress]);

  const { writeContract } = useWriteContract();

  const unlock = (formId: any) => {
    writeContract({
      abi: fonduePitABI,
      address: FONDUEPIT_ADDRESS,
      functionName: 'unlock',
      args: [formId],
    });
  };
  if (isLoadingInterest || isLoadingFD || !blockNumber) return <></>;

  const amount = toBN(formData[0]);
  const PnL = toBN(interest).div(amount).mul(toBN(100, 18));

  const periodId = toNumber(formData[1]);
  // const startBlock = toNumber(formData[2]);
  const startBlock = 275092 - 10000;
  const endBlock = startBlock + periodMapping[periodId];
  let bloksLeft = endBlock - toNumber(blockNumber);
  console.log('>blockLeft:', bloksLeft);
  if (bloksLeft < 0) bloksLeft = 0;

  return (
    <div className="max-w-xs rounded-xl bg-white p-1 shadow-1xl">
      <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
        <div className="mb-3 grid grid-cols-1 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Amount:</span>
            <span className="ml-1 font-medium">{format(amount)} BRRATA</span>
          </div>
          <div>
            <span className="text-gray-600">Interest:</span>
            <span className="ml-1 font-medium text-green-600">
              {format(PnL)} %
            </span>
          </div>
          <div>
            <span className="text-gray-600">Staked:</span>
            <span className="ml-1 font-medium">
              {blockToDays(endBlock)} days ago
            </span>
          </div>
          <div>
            <span className="text-gray-600">Remaining:</span>
            <span className="ml-1 font-medium">
              {blockToDays(bloksLeft)} days remaining
            </span>
          </div>
        </div>
        <button
          className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600"
          onClick={() => unlock(id)}
        >
          Unstake
        </button>
      </div>
    </div>
  );
};

export default MoldForm;
