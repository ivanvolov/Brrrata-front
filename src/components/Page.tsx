import React, { useEffect, useState } from 'react';
import { useReadContract, useAccount, useBlockNumber, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../web3/abi/FonduePit.json';
import brrrataABI from '../web3/abi/Brrrata.json';
import { BRRRATA_ADDRESS, FONDUEPIT_ADDRESS, WCHEESE_ADDRESS } from '../web3';

export default function Page() {
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

  const {
    data: totalSupply,
    queryKey: queryKeyTotalSupply,
    isLoading,
  } = useReadContract({
    abi: brrrataABI,
    address: '0xceB0EFa4eF35e3De939A27397F378F8A6667f33f',
    functionName: 'totalSupply',
    args: [],
  });
  if (totalSupply) {
    console.log('>>', Object.keys(totalSupply as any));
  } else {
    console.log('>>', isLoading);
    console.log('>> :(');
  }

  useEffect(() => {
    if (blockNumber === undefined) return;
    console.log('Update at BlockNumber:', blockNumber);
    queryClient.invalidateQueries({ queryKey: queryKeyB });
    queryClient.invalidateQueries({ queryKey: queryKeyWB });
    queryClient.invalidateQueries({ queryKey: queryKeyWBrrr });
    queryClient.invalidateQueries({ queryKey: queryKeyLF });
    queryClient.invalidateQueries({ queryKey: queryKeyTotalSupply });
  }, [blockNumber, queryClient, walletAddress]);

  return (
    <div>
      <ConnectButton showBalance={false} />
      <div>
        Balance CHEESE: {balance ? (balance as any)?.formatted : 'Loading...'}
      </div>
      <div>
        Balance WCHEESE:{' '}
        {wBalance ? (wBalance as any)?.formatted : 'Loading...'}
      </div>
      <div>
        Balance BRRRATA:{' '}
        {brrrBalance ? (brrrBalance as any)?.formatted : 'Loading...'}
      </div>
      <div>
        Last Form Id: {totalSupply}
        {totalSupply ? (totalSupply as any)?.formatted : 'Loading...'}
      </div>
    </div>
  );
}
