import { useEffect, useState } from 'react';
import {
  useReadContract,
  useAccount,
  useBlockNumber,
  useWriteContract,
} from 'wagmi';
import { useConnectModal, useChainModal } from '@rainbow-me/rainbowkit';

import { useQueryClient } from '@tanstack/react-query';
import brrrataABI from '../../web3/abi/Brrrata.json';
import wcheeseABI from '../../web3/abi/WCHEESE.json';
import { BRRRATA_ADDRESS, WCHEESE_ADDRESS, UINT_256_MAX } from '../../web3';

import { toBN, format, trueParse } from '../../shared/token';
import { amountStringInputRestriction } from '../../shared/inputRestrictions';
import { getRevealState } from '../../shared/server';
import { getMintButtonLogic } from '../actions/mintButtonLogic';

import { BigNumber } from '@ethersproject/bignumber';
import { toast } from 'react-toastify';

interface MintProps {
  revealTabTransfer: any;
}

const Mint: React.FC<MintProps> = ({ revealTabTransfer }) => {
  const queryClient = useQueryClient();

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress, chainId: chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  let {
    data: balanceWC,
    queryKey: queryKeyBWC,
    isLoading: isLoadingBWC,
  }: any = useReadContract({
    abi: wcheeseABI,
    address: WCHEESE_ADDRESS,
    functionName: 'balanceOf',
    args: [walletAddress],
  });
  balanceWC = toBN(balanceWC);

  let {
    data: allowanceWC,
    queryKey: queryKeyAWC,
    isLoading: isLoadingAWC,
  }: any = useReadContract({
    abi: wcheeseABI,
    address: WCHEESE_ADDRESS,
    functionName: 'allowance',
    args: [walletAddress, BRRRATA_ADDRESS],
  });
  allowanceWC = toBN(allowanceWC);
  const isLoading = isLoadingBWC || isLoadingAWC;

  useEffect(() => {
    if (blockNumber === undefined) return;
    console.log('Update at BlockNumber:', blockNumber);
    queryClient.invalidateQueries({ queryKey: queryKeyBWC });
    queryClient.invalidateQueries({ queryKey: queryKeyAWC });
  }, [blockNumber, queryClient, walletAddress]);

  // ---- Modify contract

  const { writeContract, isPending, isSuccess } = useWriteContract();

  // ---- Notifications START

  const [notificationId, setNotificationId] = useState(-1);
  useEffect(() => {
    if (isPending && notificationId === -1) {
      const newId: any = toast.loading('Pending transaction...');
      setNotificationId(newId);
    }
    if (!isPending && notificationId !== -1) {
      toast.dismiss(notificationId);
      setNotificationId(-1);
      if (isSuccess) toast.success('Tx Successful!');
      else toast.warning('Tx rejected!');
    }
    console.log('>> isPending:', isPending);
    console.log('>> isSuccess:', isSuccess);
  }, [isPending, isSuccess]);

  // ---- Notifications END

  const handleTransactionApprove = () => {
    writeContract({
      abi: wcheeseABI,
      address: WCHEESE_ADDRESS,
      functionName: 'approve',
      args: [BRRRATA_ADDRESS, UINT_256_MAX],
    });
  };

  const handleTransactionMint = async () => {
    // toast.warning('Wow so easy!');
    // toast.success('Wow so easy!');

    writeContract({
      abi: brrrataABI,
      address: BRRRATA_ADDRESS,
      functionName: 'giveMeBrrrata',
      args: [amount, walletAddress],
    });
  };

  // ---- Just react stuff

  const [revealExist, setRevealExist] = useState(false);
  useEffect(() => {
    if (blockNumber === undefined) return;
    const update = async () => {
      const result = await getRevealState(walletAddress);
      if (result.reveal) setRevealExist(true);
      else setRevealExist(false);
    };
    update();
  }, [blockNumber, walletAddress]);

  const [amountPercent, setAmountPercent] = useState(0);
  const [amount, setAmount] = useState(BigNumber.from(0));
  const [amountString, setAmountString] = useState('');

  const updateAmountPercent = (event: any) => {
    let _amountPercent = event.target.value;
    setAmountPercent(_amountPercent);
    const _amount = balanceWC.mul(toBN(_amountPercent, 18)).div(toBN(100, 18));

    setAmount(_amount);
    setAmountString(format(_amount));
  };

  const updateAmountInput = (event: any) => {
    let _amountString = event.target.value;
    _amountString = amountStringInputRestriction(_amountString);
    setAmountString(_amountString);

    let _amount = trueParse(_amountString);
    setAmount(_amount);

    const _amountPercent = _amount.mul(toBN(100, 18)).div(balanceWC);
    setAmountPercent(Number(format(_amountPercent)));
  };

  const setAmountMax = () => {
    setAmountPercent(100);
    setAmount(balanceWC);
    setAmountString(format(balanceWC));
  };

  const [buttonText, handleClick, disabled]: any = getMintButtonLogic({
    walletAddress: walletAddress,
    chainId: chainId,
    balance: balanceWC,
    allowance: allowanceWC,
    amount: amount,
    isLoading: isLoading,
    handleTransactionApprove: handleTransactionApprove,
    handleTransactionMint: handleTransactionMint,
    openConnectModal: openConnectModal,
    openChainModal: openChainModal,
    revealExist: revealExist,
    revealTabTransfer: revealTabTransfer,
  });
  return (
    <>
      <h2 className="mb-4 text-xl font-bold">Mint</h2>
      <div className="relative mb-4">
        <input
          className="w-full rounded border p-2 pr-16 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="string"
          placeholder="0"
          autoComplete="off"
          onChange={(e) => updateAmountInput(e)}
          value={amountString}
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
            Balance: {isLoadingBWC ? '...' : format(balanceWC)}
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
    </>
  );
};

export default Mint;
