import { useEffect, useState } from 'react';
import {
  useReadContract,
  useAccount,
  useBlockNumber,
  useWriteContract,
} from 'wagmi';
import { useConnectModal, useChainModal } from '@rainbow-me/rainbowkit';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../../web3/abi/FonduePit.json';
import brrrataABI from '../../web3/abi/Brrrata.json';
import { BRRRATA_ADDRESS, FONDUEPIT_ADDRESS, UINT_256_MAX } from '../../web3';

import { toBN, format, parse, toNumber } from '../../shared/token';
import { tokenAmountInputRestriction } from '../../shared/inputRestrictions';
import { getStakeButtonLogic } from './stakeButtonLogic';

import { BigNumber } from '@ethersproject/bignumber';
import { toast } from 'react-toastify';

export default function Stake() {
  const queryClient = useQueryClient();

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress, chainId: chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  let {
    data: balanceBRRR,
    queryKey: queryKeyBBrrr,
    isLoading: isLoadingBBRRR,
  }: any = useReadContract({
    abi: brrrataABI,
    address: BRRRATA_ADDRESS,
    functionName: 'balanceOf',
    args: [walletAddress],
  });
  balanceBRRR = toBN(balanceBRRR);

  let {
    data: allowanceBRRR,
    queryKey: queryKeyABRRR,
    isLoading: isLoadingABRRR,
  }: any = useReadContract({
    abi: brrrataABI,
    address: BRRRATA_ADDRESS,
    functionName: 'allowance',
    args: [walletAddress, FONDUEPIT_ADDRESS],
  });
  allowanceBRRR = toBN(allowanceBRRR);
  const isLoading = isLoadingBBRRR || isLoadingABRRR;

  // Notice: MOCK for testing TODO: remove in production
  // balanceBRRR = toBN(1, 18);
  // allowanceBRRR = toBN(5, 17);

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

  useEffect(() => {
    if (blockNumber === undefined) return;
    console.log('Update at BlockNumber:', blockNumber);
    queryClient.invalidateQueries({ queryKey: queryKeyBBrrr });
    queryClient.invalidateQueries({ queryKey: queryKeyABRRR });
  }, [blockNumber, queryClient, walletAddress]);

  const handleTransactionApprove = () => {
    writeContract({
      abi: brrrataABI,
      address: BRRRATA_ADDRESS,
      functionName: 'approve',
      args: [FONDUEPIT_ADDRESS, UINT_256_MAX],
    });
  };

  const handleTransactionStake = () => {
    writeContract({
      abi: fonduePitABI,
      address: FONDUEPIT_ADDRESS,
      functionName: 'stake',
      args: [amount, walletAddress, periodId],
    });
  };

  // ---- Just react stuff

  const [amountPercent, setAmountPercent] = useState(0);
  const [amount, setAmount] = useState(BigNumber.from(0));
  const [periodId, setPeriodId] = useState(2);

  const updateAmountPercent = (event: any) => {
    let _amountPercent = event.target.value;
    setAmountPercent(_amountPercent);
    const _amount = toBN(balanceBRRR)
      .mul(toBN(_amountPercent, 18))
      .div(toBN(100, 18));
    setAmount(_amount);
  };

  const updateAmountInput = (event: any) => {
    let _amountString = event.target.value;
    _amountString = tokenAmountInputRestriction(_amountString);
    let _amount = parse(_amountString);
    setAmount(_amount);
    const _amountPercent = _amount.mul(toBN(100, 18)).div(toBN(balanceBRRR));
    setAmountPercent(Number(format(_amountPercent)));
  };

  const handleChange = (event: any) => {
    setPeriodId(toNumber(event.target.value));
  };

  const setAmountMax = () => {
    setAmountPercent(100);
    setAmount(toBN(balanceBRRR));
  };

  const [buttonText, handleClick, disabled]: any = getStakeButtonLogic({
    walletAddress: walletAddress,
    chainId: chainId,
    balance: balanceBRRR,
    allowance: allowanceBRRR,
    amount: amount,
    isLoading: isLoading,
    handleTransactionApprove: handleTransactionApprove,
    handleTransactionStake: handleTransactionStake,
    openConnectModal: openConnectModal,
    openChainModal: openChainModal,
  });

  return (
    <>
      <h2 className="mb-4 text-xl font-bold">Stake</h2>
      <div className="relative mb-4">
        <input
          type="string"
          placeholder="0"
          autoComplete="off"
          onChange={(e) => updateAmountInput(e)}
          value={format(amount)}
          disabled={disabled}
          className="w-full rounded border p-2 pr-16 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
            Balance: {isLoadingBBRRR ? '...' : format(balanceBRRR as any)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={amountPercent}
          onChange={(e) => updateAmountPercent(e)}
          disabled={disabled}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        />
      </div>
      <div className="mb-4 mt-4">
        <label className="mb-2 block text-gray-700">Staking Duration</label>
        <select
          className="w-full cursor-pointer rounded border bg-white p-2"
          value={periodId}
          onChange={handleChange}
        >
          <option value="0">1 week - 4% APY</option>
          <option value="1">2 weeks - 10% APY</option>
          <option value="2">3 weeks - 15% APY</option>
        </select>
      </div>
      <button
        className="mt-4 w-full rounded-lg bg-green-500 py-3 font-medium text-white transition-colors hover:bg-green-600"
        onClick={() => handleClick()}
      >
        {buttonText}
      </button>
    </>
  );
}
