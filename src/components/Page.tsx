// import React, { useEffect, useState } from 'react';
// import { useReadContract, useAccount, useBlockNumber, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// import { useQueryClient } from '@tanstack/react-query';
// // // import the token contract ABI
// // import tokenAbi from '../abis/WCHEESE.json';
// // import { WCHEESE_ADDRESS } from '../web3';

// import { storage } from '../web3/wagmiConfig2';

export default function Page() {
  // const [supplyData, setSupplyData] = useState(0);

  // const queryClient = useQueryClient();
  // const { data: blockNumber } = useBlockNumber({ watch: true });
  // const { address: walletAddress } = useAccount();

  // const { data: balance, queryKey: queryKeyB } = useBalance({
  //   address: walletAddress,
  // });

  // const recentConnectorId = storage.getItem('recentConnectorId');
  // console.log('recentConnectorId:', recentConnectorId);
  // useEffect(() => {
  //   if (blockNumber === undefined) return;
  //   console.log('Update at BlockNumber:', blockNumber);
  //   console.log('QueryKey:', queryKeyB);
  //   queryClient.invalidateQueries({ queryKey: queryKeyB });
  // }, [blockNumber, queryClient]);

  // // console.log("address:", address);

  // const { data: balance, queryKey } = useBalance({
  //   address: walletAddress,
  // });

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
      {/* <div>{balance ? (balance as any)?.formatted : 'Loading...'}</div> */}
      {/* <div>{walletAddress as any}</div> */}
      {/* <div>Your WCheese Balance: {wCheeseBalance}</div> */}
    </div>
  );
}
