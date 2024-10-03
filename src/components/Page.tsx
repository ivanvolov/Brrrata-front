import React, { useEffect, useState } from 'react';
import { useReadContract, useAccount, useBlockNumber, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useQueryClient } from '@tanstack/react-query';
import tokenAbi from '../abis/WCHEESE.json';
import { WCHEESE_ADDRESS } from '../web3';

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

  useEffect(() => {
    if (blockNumber === undefined) return;
    console.log('Update at BlockNumber:', blockNumber);
    queryClient.invalidateQueries({ queryKey: queryKeyB });
  }, [blockNumber, queryClient, walletAddress]);

  useEffect(() => {
    if (blockNumber === undefined) return;
    console.log('Update at BlockNumber2:', blockNumber);
    queryClient.invalidateQueries({ queryKey: queryKeyWB });
  }, [blockNumber, queryClient, walletAddress]);

  // const { data: wCheeseBalance, isLoading: wCheeseBalanceIsLoading } = useReadContract({
  //   abi: tokenAbi,
  //   address: WCHEESE_ADDRESS,
  //   functionName: "balanceOf",
  //   args: [address],
  // });

  return (
    <div>
      <ConnectButton showBalance={false} />
      <div>{balance ? (balance as any)?.formatted : 'Loading...'}</div>
      <div>{wBalance ? (wBalance as any)?.formatted : 'Loading...'}</div>
    </div>
  );
}
