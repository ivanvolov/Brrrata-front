import React, { useEffect } from 'react';
import {
  useReadContract,
  useAccount,
  useBlockNumber,
  useWriteContract,
} from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../../web3/abi/FonduePit.json';
import { FONDUEPIT_ADDRESS, toUnit, toNumber, periodMapping } from '../../web3';

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
  const { data: formData, queryKey: queryKeyFD } = result;

  useEffect(() => {
    if (blockNumber === undefined) return;
    queryClient.invalidateQueries({ queryKey: queryKeyFD });
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

  if (formData) {
    let [amount, periodId, startBlock] = formData as any;
    amount = toUnit(formData[0] as any);
    periodId = toNumber(formData[1] as any);
    startBlock = toNumber(formData[0] as any);
    const endBlock = startBlock + periodMapping[periodId];
    const bloksLeft = blockNumber
      ? endBlock - toNumber(blockNumber as any)
      : -1;

    return (
      <div className="w-1/3 max-w-xs rounded-xl bg-white p-6 shadow-2xl">
        <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
          <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Amount:</span>
              <span className="ml-1 font-medium">{amount} BRRATA</span>
            </div>
            <div>
              <span className="text-gray-600">Interest:</span>
              <span className="ml-1 font-medium text-green-600">
                +50 BRRATA
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
  } else {
    return <div>Loading...</div>;
  }
};

export default MoldForm;
