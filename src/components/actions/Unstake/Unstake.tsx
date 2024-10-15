import { useEffect } from 'react';
import MoldForm from './MoldForm';
import Reveal from './Reveal';
import { useReadContract, useAccount, useBlockNumber } from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../../../web3/abi/FonduePit.json';
import brrrataABI from '../../../web3/abi/Brrrata.json';
import {
  FONDUEPIT_ADDRESS,
  ACTIVE_CHAIN_ID,
  BRRRATA_ADDRESS,
} from '../../../web3';
import { toNumber } from '../../../shared/token';

export default function Unstake() {
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress, chainId: chainId } = useAccount();

  const { data: lastFormId, queryKey: queryKeyLF } = useReadContract({
    abi: fonduePitABI,
    address: FONDUEPIT_ADDRESS,
    functionName: 'formsId',
    args: [walletAddress],
  });

  const { data: isReveal, queryKey: queryKeyIR } = useReadContract({
    abi: brrrataABI,
    address: BRRRATA_ADDRESS,
    functionName: 'isReveal',
    args: [walletAddress],
  });

  useEffect(() => {
    if (blockNumber === undefined) return;
    queryClient.invalidateQueries({ queryKey: queryKeyLF });
    queryClient.invalidateQueries({ queryKey: queryKeyIR });
  }, [blockNumber, queryClient, walletAddress]);

  if (!walletAddress || chainId != ACTIVE_CHAIN_ID) {
    return <></>;
  } else if ((!lastFormId || lastFormId === 0) && !isReveal) {
    console.log('Is reveal', isReveal, walletAddress);
    return <div>You don't have any brrrata staked</div>;
  } else {
    if (!lastFormId || lastFormId === 0) return <Reveal />;
    return (
      <>
        <Reveal />
        {Array.from({ length: toNumber(lastFormId as any) }, (_, i) => i).map(
          (id) => (
            <div>
              <MoldForm key={id} id={id} />
            </div>
          ),
        )}
      </>
    );
  }
}
