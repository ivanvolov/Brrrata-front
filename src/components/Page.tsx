import React, { useEffect, useState } from 'react';
import {
  useReadContract,
  useAccount,
  useBlockNumber,
  useBalance,
  useWriteContract,
} from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../web3/abi/FonduePit.json';
import brrrataABI from '../web3/abi/Brrrata.json';
import wcheeseABI from '../web3/abi/WCHEESE.json';
import {
  BRRRATA_ADDRESS,
  FONDUEPIT_ADDRESS,
  WCHEESE_ADDRESS,
  toUnit,
  UINT_256_MAX,
  fromUnit,
  toNumber,
} from '../web3';

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

  const { data: allowance, queryKey: queryKeyAllowance } = useReadContract({
    abi: wcheeseABI,
    address: WCHEESE_ADDRESS,
    functionName: 'allowance',
    args: [walletAddress, BRRRATA_ADDRESS],
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

  // const { data: totalSupply, queryKey: queryKeyTotalSupply } = useReadContract({
  //   abi: brrrataABI,
  //   address: WCHEESE_ADDRESS,
  //   functionName: 'totalSupply',
  //   args: [],
  // });
  // if (totalSupply) {
  //   console.log('>>', toUnit(totalSupply as any));
  //   console.log('>>', typeof totalSupply);
  // } else {
  //   console.log('>> :(');
  // }

  useEffect(() => {
    if (blockNumber === undefined) return;
    console.log('Update at BlockNumber:', blockNumber);
    queryClient.invalidateQueries({ queryKey: queryKeyB });
    queryClient.invalidateQueries({ queryKey: queryKeyWB });
    queryClient.invalidateQueries({ queryKey: queryKeyWBrrr });
    queryClient.invalidateQueries({ queryKey: queryKeyLF });
    queryClient.invalidateQueries({ queryKey: queryKeyAllowance });
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
        Allowance WCHEESE: {allowance ? toUnit(allowance as any) : 'Loading...'}
      </div>
      <div>
        Balance BRRRATA:
        {brrrBalance ? (brrrBalance as any)?.formatted : 'Loading...'}
      </div>
      <div>
        Spin:
        {spin ? toNumber(spin as any) : 'Not found'}
      </div>

      <div>
        {!lastFormId || lastFormId === 0 ? (
          <div>You don't have any brrrata staked</div>
        ) : (
          <div>Here is the list of your staking forms:</div>
        )}
      </div>
      <button onClick={() => allowToBrrrata(UINT_256_MAX)}>Allow Unlim</button>
      <button onClick={() => mintBrrrata(fromUnit('0.0001'))}>
        Mint Brrrata
      </button>
    </div>
  );
}
