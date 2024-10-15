import { useEffect, useState } from 'react';
import { useReadContract, useAccount, useBlockNumber } from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import brrrataABI from '../../../web3/abi/Brrrata.json';

import { BRRRATA_ADDRESS } from '../../../web3';
import { toBN, format } from '../../../shared/token';
import { LuckyWheel } from './LuckyWheel';

const Reveal = () => {
  const queryClient = useQueryClient();

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress } = useAccount();

  let {
    data: luckyCheeseAmount,
    queryKey: queryKeyLC,
    isLoading: isLoadingLC,
  }: any = useReadContract({
    abi: brrrataABI,
    address: BRRRATA_ADDRESS,
    functionName: 'luckyCheese',
    args: [walletAddress],
  });
  luckyCheeseAmount = toBN(luckyCheeseAmount);

  useEffect(() => {
    if (blockNumber === undefined) return;
    queryClient.invalidateQueries({ queryKey: queryKeyLC });
  }, [blockNumber, queryClient, walletAddress]);

  // ---- Just react stuff

  const [showModal, setShowModal] = useState(false);

  if (isLoadingLC || !blockNumber) return <></>;

  return (
    <div className="max-w-xs rounded-xl bg-white p-1 shadow-1xl">
      <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
        <div className="mb-3 grid grid-cols-1 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Amount:</span>
            <span className="ml-1 font-medium">
              {format(luckyCheeseAmount)} BRRATA
            </span>
          </div>
        </div>
        <button
          className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600"
          onClick={() => setShowModal(true)}
        >
          Reveal
        </button>
      </div>
      <LuckyWheel
        showModal={showModal}
        setShowModal={setShowModal}
        walletAddress={walletAddress}
      />
    </div>
  );
};

export default Reveal;
