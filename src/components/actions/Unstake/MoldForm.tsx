import React, { useEffect } from 'react';
import { useReadContract, useAccount, useWriteContract, useBlock } from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../../../web3/abi/FonduePit.json';
import { FONDUEPIT_ADDRESS, periodMapping } from '../../../web3';
import { toBN, format, toNumber } from '../../../shared/token';

import moment from 'moment';

interface MoldFormProps {
  id: number;
}

const MoldForm: React.FC<MoldFormProps> = ({ id }) => {
  const queryClient = useQueryClient();

  const { data: blockData } = useBlock({ watch: true });
  const { address: walletAddress } = useAccount();

  // TODO: add here is isFprm Exist or amount check

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
    if (blockData === undefined) return;
    queryClient.invalidateQueries({ queryKey: queryKeyFD });
    queryClient.invalidateQueries({ queryKey: queryKeyInterest });
  }, [blockData, queryClient, walletAddress]);

  const { writeContract } = useWriteContract();

  const unlock = (formId: any) => {
    writeContract({
      abi: fonduePitABI,
      address: FONDUEPIT_ADDRESS,
      functionName: 'unlock',
      args: [formId],
    });
  };
  if (isLoadingInterest || isLoadingFD || !blockData) return <></>;

  console.log('> formData', formData);

  const amount = toBN(formData[0]);
  const PnL = toBN(interest).div(amount).mul(toBN(100, 18));

  const periodId = toNumber(formData[1]);

  // ---- Time stuff

  const now = moment();
  const start = moment(toNumber(formData[2]) * 1000);
  const end = moment((toNumber(formData[2]) + periodMapping[periodId]) * 1000);
  // console.log(start.format());
  // console.log(end.format());

  const endDiff = end.isAfter(now) ? end.fromNow() : 'Expired';
  const startDiff = start.fromNow(); // e.g., "5 days ago"

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
            <span className="ml-1 font-medium">{startDiff}</span>
          </div>
          <div>
            <span className="text-gray-600">Remaining:</span>
            <span className="ml-1 font-medium">{endDiff}</span>
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
