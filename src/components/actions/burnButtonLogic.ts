import { toBN } from '../../shared/token';
import { ACTIVE_CHAIN_ID } from '../../web3';

export const getBurnButtonLogic = (options: any) => {
  const {
    walletAddress,
    chainId,
    balance,
    amount,
    isLoading,
    handleTransactionBurn,
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
    buttonText = 'Enter Brrrata to burn';
  } else if (amount.gt(toBN(balance))) {
    disabled = false;
    handleClick = emptyHandle;
    buttonText = 'Not enough Brrrata';
  } else {
    disabled = false;
    handleClick = handleTransactionBurn;
    buttonText = 'Burn Brrrata';
  }

  return [buttonText, handleClick, disabled];
};
