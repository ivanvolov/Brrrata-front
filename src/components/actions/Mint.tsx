import { useEffect, useState } from 'react';
import {
  useReadContract,
  useAccount,
  useBlockNumber,
  useBalance,
  useWriteContract,
} from 'wagmi';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';

import { useQueryClient } from '@tanstack/react-query';
import brrrataABI from '../../web3/abi/Brrrata.json';
import wcheeseABI from '../../web3/abi/WCHEESE.json';
import {
  BRRRATA_ADDRESS,
  WCHEESE_ADDRESS,
  UINT_256_MAX,
  fromUnit,
} from '../../web3';

import { toBN, format, parse } from '../../shared/token';
import { tokenAmountInputRestriction } from '../../shared/inputRestrictions';
import { getMintButtonLogic } from '../actions/mintButtonLogic';

import { BigNumber } from '@ethersproject/bignumber';

export default function Mint() {
  const queryClient = useQueryClient();

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress, chainId: chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const { data: wBalance, queryKey: queryKeyWB } = useBalance({
    address: walletAddress,
    token: WCHEESE_ADDRESS,
  });

  const { data: wAllowance, queryKey: queryKeyAllowanceWC } = useReadContract({
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

  const handleTransactionApprove = (value: any) => {
    writeContract({
      abi: wcheeseABI,
      address: WCHEESE_ADDRESS,
      functionName: 'approve',
      args: [BRRRATA_ADDRESS, value],
    });
  };

  const handleTransactionMint = () => {
    const value = fromUnit('0.0001');
    // TODO: Don't forget about spin!
    console.log('>> mintBrrrata', value, spin);
    writeContract({
      abi: brrrataABI,
      address: BRRRATA_ADDRESS,
      functionName: 'giveMeBrrrata',
      args: [value, walletAddress],
    });
  };

  useEffect(() => {
    if (blockNumber === undefined) return;
    console.log('Update at BlockNumber:', blockNumber);
    queryClient.invalidateQueries({ queryKey: queryKeyWB });
    queryClient.invalidateQueries({ queryKey: queryKeyAllowanceWC });
    queryClient.invalidateQueries({ queryKey: queryKeySpin });
  }, [blockNumber, queryClient, walletAddress]);

  // ---- Just react stuff

  const [amountPercent, setAmountPercent] = useState(0);
  const [amount, setAmount] = useState(BigNumber.from(0));

  const updateAmountPercent = (event: any) => {
    let _amountPercent = event.target.value;
    // console.log('>> updateAmountPercent', _amountPercent);
    setAmountPercent(_amountPercent);
    const _amount = toBN(wBalance?.value)
      .mul(toBN(_amountPercent, 18))
      .div(toBN(100, 18));

    // console.log('>> updateAmount', format(_amount));
    setAmount(_amount);
  };

  const updateAmountInput = (event: any) => {
    let _amountString = event.target.value;
    _amountString = tokenAmountInputRestriction(_amountString);
    let _amount = parse(_amountString);
    setAmount(_amount);
    // console.log('>> updateAmount', format(_amount));

    const _amountPercent = _amount
      .mul(toBN(100, 18))
      .div(toBN(wBalance?.value));
    setAmountPercent(Number(format(_amountPercent)));
    // console.log('>> updateAmountPercent', _amountPercent);
  };

  const setAmountMax = () => {
    setAmountPercent(100);
    setAmount(toBN(wBalance?.value));
  };

  const [buttonText, handleClick, disabled]: any = getMintButtonLogic({
    walletAddress: walletAddress,
    chainId: chainId,
    balance: toBN(wBalance?.value),
    allowance: wAllowance,
    handleTransactionApprove: handleTransactionApprove,
    handleTransactionMint: handleTransactionMint,
    openConnectModal: openConnectModal,
    openChainModal: openChainModal,
  });
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Mint</h2>
      <div className="relative mb-4">
        <input
          className="w-full rounded border p-2 pr-16 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="string"
          placeholder="0.0"
          autoComplete="off"
          onChange={(e) => updateAmountInput(e)}
          value={format(amount)}
          disabled={disabled}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-200 px-2 py-1 text-sm text-gray-700"
          onClick={() => setAmountMax()}
          disabled={disabled}
        >
          Max
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-gray-700">0</label>
          <span className="text-gray-700" id="rangeValue">
            Balance: {!wBalance ? '...' : format(toBN(wBalance?.value))}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={amountPercent}
          onChange={(e) => updateAmountPercent(e)}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          disabled={disabled}
        />
      </div>
      <button
        className="mt-4 w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition-colors hover:bg-blue-600"
        onClick={() => handleClick()}
      >
        {buttonText}
      </button>
    </div>
  );
}
