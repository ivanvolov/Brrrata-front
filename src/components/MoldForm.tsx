import React, { useEffect } from 'react';
import {
  useReadContract,
  useAccount,
  useBlockNumber,
  useWriteContract,
} from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../web3/abi/FonduePit.json';
import { FONDUEPIT_ADDRESS, toUnit, toNumber, periodMapping } from '../web3';

interface MoldFormProps {
  id: number;
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
      <div>
        Form:
        <br></br>
        <div>Amount: {amount}</div>
        <div>End Block: {endBlock}</div>
        <div>Blocks left: {bloksLeft}</div>
        <button onClick={() => unlock(id)}>Unlock</button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default MoldForm;
