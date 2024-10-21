import { toBN } from '../../shared/token';
import { ACTIVE_CHAIN_ID } from '../../web3';

export const getMintButtonLogic = (options: any) => {
  const {
    walletAddress,
    chainId,
    balance,
    amount,
    isLoading,
    handleTransactionMint,
    openConnectModal,
    openChainModal,
  } = options;
  const emptyHandle = () => {};
  let handleClick;
  let buttonText;
  let disabled;
  let partialRender = false;

  if (!walletAddress) {
    disabled = true;
    partialRender = true;
    buttonText = 'Connect wallet';
    handleClick = openConnectModal;
  } else if (chainId != ACTIVE_CHAIN_ID) {
    disabled = true;
    partialRender = true;
    handleClick = openChainModal;
    buttonText = 'Unsupported chain';
  } else if (isLoading) {
    disabled = true;
    handleClick = emptyHandle;
    buttonText = 'Loading...';
  } else if (amount.isZero()) {
    disabled = false;
    handleClick = emptyHandle;
    buttonText = 'Enter 🧀 to deposit';
  } else if (amount.gt(toBN(balance))) {
    disabled = false;
    handleClick = emptyHandle;
    buttonText = 'Not enough 🧀';
  } else {
    disabled = false;
    handleClick = handleTransactionMint;
    buttonText = 'Mint Brrrata';
  }

  return [buttonText, handleClick, disabled, partialRender];
};
