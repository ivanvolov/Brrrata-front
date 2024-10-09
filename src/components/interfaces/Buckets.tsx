import { useEffect } from 'react';
import MoldForm from './MoldForm';
import { useReadContract, useAccount, useBlockNumber } from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../../web3/abi/FonduePit.json';
import { FONDUEPIT_ADDRESS, toNumber } from '../../web3';

export default function Buckets() {
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress } = useAccount();

  const { data: lastFormId, queryKey: queryKeyLF } = useReadContract({
    abi: fonduePitABI,
    address: FONDUEPIT_ADDRESS,
    functionName: 'formsId',
    args: [walletAddress],
  });

  useEffect(() => {
    if (blockNumber === undefined) return;
    queryClient.invalidateQueries({ queryKey: queryKeyLF });
  }, [blockNumber, queryClient, walletAddress]);
  return (
    <div>
      {!lastFormId || lastFormId === 0 ? (
        <div>You don't have any brrrata staked</div>
      ) : (
        <div
          id="buckets"
          className="w-full flex-grow mt-8 flex justify-center flex-wrap gap-4"
        >
          {Array.from({ length: toNumber(lastFormId as any) }, (_, i) => i).map(
            (id) => (
              <MoldForm key={id} id={id} />
            ),
          )}
        </div>
      )}
    </div>
  );
}
