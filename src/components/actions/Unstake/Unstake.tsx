import { useEffect, useState } from 'react';
import MoldForm from './MoldForm';
import Reveal from './Reveal';
import { useReadContract, useAccount, useBlockNumber } from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../../../web3/abi/FonduePit.json';
import { FONDUEPIT_ADDRESS, ACTIVE_CHAIN_ID } from '../../../web3';
import { toNumber } from '../../../shared/token';
import { getRevealState } from '../../../shared/server';
import { BigNumber } from '@ethersproject/bignumber';
import { toBN } from '../../../shared/token';

export default function Unstake() {
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress, chainId: chainId } = useAccount();

  const [revealExist, setRevealExist] = useState(-1);

  const [canReveal, setCanReveal] = useState(false);
  const [amount, setAmount] = useState(BigNumber.from(0));
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    if (blockNumber === undefined) return;
    const update = async () => {
      const result = await getRevealState(walletAddress);
      console.log('> result', result);
      if (result.reveal) {
        setRevealExist(1);
        setCanReveal(result.reveal.canReveal);
        setAmount(toBN(String(result.reveal.amount)));
        setSpin(result.reveal.spin - 1);
      } else {
        setRevealExist(0);
        setCanReveal(false);
      }
    };
    update();
  }, [blockNumber, walletAddress]);

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

  if (!walletAddress || chainId != ACTIVE_CHAIN_ID || revealExist == -1) {
    return <></>;
  } else if (revealExist) {
    return (
      <Reveal
        setRevealExist={setRevealExist}
        canReveal={canReveal}
        amount={amount}
        spin={spin}
      />
    );
  } else if (lastFormId && lastFormId != 0) {
    return (
      <>
        {Array.from({ length: toNumber(lastFormId as any) }, (_, i) => i)
          .reverse()
          .map((id) => (
            <div>
              <MoldForm key={id} id={id} />
            </div>
          ))}
      </>
    );
  } else {
    return <div>You don't have any brrrata staked</div>;
  }
}
