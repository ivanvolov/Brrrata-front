import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { LuckyWheel } from './LuckyWheel';
import { formatShort } from '../../../shared/token';

interface RevealProps {
  setRevealExist: any;
  canReveal: boolean;
  spin: number;
  amount: any;
}

const Reveal: React.FC<RevealProps> = ({
  canReveal,
  spin,
  amount,
  setRevealExist,
}: any) => {
  const { address: walletAddress } = useAccount();

  // ---- Just react stuff

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-xs rounded-xl bg-white p-1 shadow-1xl">
      <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
        <div className="mb-3 grid grid-cols-1 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Amount:</span>
            <span className="ml-1 font-medium">
              {formatShort(amount)} BRRATA
            </span>
          </div>
        </div>
        <button
          className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600"
          onClick={() => setShowModal(true)}
          disabled={!canReveal}
        >
          {canReveal ? 'Reveal' : 'Wait for oracle randomness'}
        </button>
      </div>
      <LuckyWheel
        setRevealExist={setRevealExist}
        showModal={showModal}
        setShowModal={setShowModal}
        walletAddress={walletAddress}
        spin={spin}
      />
    </div>
  );
};

export default Reveal;
