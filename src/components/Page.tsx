import React, { useEffect, useState } from 'react';
import { useReadContract, useAccount, useBlockNumber, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useQueryClient } from '@tanstack/react-query';
// // import the token contract ABI
// import tokenAbi from '../abis/WCHEESE.json';
// import { WCHEESE_ADDRESS } from '../web3';

import { reconnect } from '@wagmi/core';
import { injected } from '@wagmi/connectors';
import { config } from '../web3/wagmiConfig';

export default function Page() {
  // useEffect(() => {
  //   console.log('> reconnect try');
  //   const reconnectFunction = async () => {
  //     const result = await reconnect(config, { connectors: [injected()] });
  //     console.log(result);
  //   };
  //   reconnectFunction();
  // }, []); // The empty array means that it will only get called on initial component mount

  // const [supplyData, setSupplyData] = useState(0);

  // const queryClient = useQueryClient();
  // const { data: blockNumber } = useBlockNumber({ watch: true });
  // const { data: balance, queryKey } = useBalance({
  //   address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  // });

  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey });
  // }, [blockNumber, queryClient]);

  // const { address: walletAddress } = useAccount();

  // // console.log("address:", address);

  // // const { data: wCheeseBalance, isLoading: wCheeseBalanceIsLoading } = useReadContract({
  // //   abi: tokenAbi,
  // //   address: WCHEESE_ADDRESS,
  // //   functionName: "balanceOf",
  // //   args: [address],
  // // });

  // // console.log("wCheeseBalance:", wCheeseBalance);

  // console.log('balance:', balance);
  return (
    <div>
      <ConnectButton showBalance={false} />
      {/* <div>{(balance as any).formatted}</div> */}
      {/* <div>{walletAddress as any}</div> */}
      {/* <div>Your WCheese Balance: {wCheeseBalance}</div> */}
    </div>
  );
}
