import { useEffect, useState } from 'react';
import {
  useBalance,
  useAccount,
  useBlockNumber,
  useWriteContract,
} from 'wagmi';
import { useConnectModal, useChainModal } from '@rainbow-me/rainbowkit';

import { useQueryClient } from '@tanstack/react-query';
import brrrataABI from '../../web3/abi/Brrrata.json';
import { BRRRATA_ADDRESS } from '../../web3';

import { toBN, format, trueParse, formatShort } from '../../shared/token';
import { amountStringInputRestriction } from '../../shared/inputRestrictions';
import { getMintButtonLogic } from '../actions/mintButtonLogic';

import { BigNumber } from '@ethersproject/bignumber';
import { toast } from 'react-toastify';

interface MintProps {
  setRevealExist: any;
}

const Mint: React.FC<MintProps> = ({ setRevealExist }) => {
  const queryClient = useQueryClient();

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: walletAddress, chainId: chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  let {
    data: balanceWC,
    queryKey: queryKeyBWC,
    isLoading: isLoadingBWC,
  }: any = useBalance({
    address: walletAddress,
  });
  balanceWC = toBN(balanceWC?.value);

  const isLoading = isLoadingBWC;

  useEffect(() => {
    if (blockNumber === undefined) return;
    console.log('Update at BlockNumber:', blockNumber);
    queryClient.invalidateQueries({ queryKey: queryKeyBWC });
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
      if (isSuccess) {
        toast.success('Tx Successful!');
        setRevealExist(1);
      } else toast.warning('Tx rejected!');
    }
    console.log('>> isPending:', isPending);
    console.log('>> isSuccess:', isSuccess);
  }, [isPending, isSuccess]);

  // ---- Notifications END

  const handleTransactionMint = async () => {
    // toast.warning('Wow so easy!');
    // toast.success('Wow so easy!');

    writeContract({
      abi: brrrataABI,
      address: BRRRATA_ADDRESS,
      functionName: 'giveMeBrrrata',
      args: [walletAddress],
      value: amount.toBigInt(),
    });
  };

  // ---- Just react stuff

  const [amountPercent, setAmountPercent] = useState(0);
  const [amount, setAmount] = useState(BigNumber.from(0));
  const [amountString, setAmountString] = useState('');

  const updateAmountPercent = (event: any) => {
    let _amountPercent = event.target.value;
    setAmountPercent(_amountPercent);
    let _amount = balanceWC.mul(toBN(_amountPercent, 18)).div(toBN(100, 18));

    _amount = trueParse(formatShort(_amount)); //shorten Amount

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

  const [buttonText, handleClick, disabled, partialRender]: any =
    getMintButtonLogic({
      walletAddress: walletAddress,
      chainId: chainId,
      balance: balanceWC,
      amount: amount,
      isLoading: isLoading,
      handleTransactionMint: handleTransactionMint,
      openConnectModal: openConnectModal,
      openChainModal: openChainModal,
    });
  return (
    <>
      {!partialRender ? (
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
                Balance: {isLoadingBWC ? '...' : formatShort(balanceWC)}
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
        </>
      ) : (
        <></>
      )}
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
