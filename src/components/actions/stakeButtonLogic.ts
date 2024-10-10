import { toBN } from '../../shared/token';
import { ACTIVE_CHAIN_ID } from '../../web3';

export const getStakeButtonLogic = (options: any) => {
  const {
    walletAddress,
    chainId,
    balance,
    allowance,
    amount,
    isLoading,
    handleTransactionApprove,
    handleTransactionStake,
    openConnectModal,
    openChainModal,
  } = options;
  const emptyHandle = () => {};
  let handleClick;
  let buttonText;
  let disabled;

  if (!walletAddress) {
    disabled = true;
    buttonText = 'Connect wallet';
    handleClick = openConnectModal;
  } else if (chainId != ACTIVE_CHAIN_ID) {
    disabled = true;
    handleClick = openChainModal;
    buttonText = 'Unsupported chain';
  } else if (isLoading) {
    disabled = true;
    handleClick = emptyHandle;
    buttonText = 'Loading...';
  }

  if (balance.isZero()) {
    disabled = true;
    handleClick = emptyHandle;
    buttonText = 'Not enough Brrrata';
  } else if (amount.isZero()) {
    disabled = false;
    handleClick = emptyHandle;
    buttonText = 'Enter Brrrata to stake';
  } else if (amount.gt(toBN(balance))) {
    disabled = false;
    handleClick = emptyHandle;
    buttonText = 'Not enough Brrrata';
  } else if (amount.gt(toBN(allowance))) {
    disabled = false;
    handleClick = handleTransactionApprove;
    buttonText = 'Approve Brrrata';
  } else {
    disabled = false;
    handleClick = handleTransactionStake;
    buttonText = 'Stake Brrrata';
  }

  return [buttonText, handleClick, disabled];
};
