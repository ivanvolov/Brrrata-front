import { toBN } from '../../shared/token';

export const getBurnButtonLogic = (options: any) => {
  const {
    walletAddress,
    chainId,
    balance,
    amount,
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
  } else if (chainId != 9209108) {
    disabled = true;
    handleClick = openChainModal;
    buttonText = 'Unsupported chain';
  } else if (!balance) {
    disabled = true;
    handleClick = emptyHandle;
    buttonText = 'Loading...';
  } else if (!amount || amount.isZero()) {
    disabled = false;
    handleClick = emptyHandle;
    buttonText = 'Enter BRRRATA to burn';
  } else if (amount.gt(toBN(balance))) {
    disabled = false;
    handleClick = emptyHandle;
    buttonText = 'Not enough BRRR';
  } else {
    disabled = false;
    handleClick = handleTransactionBurn;
    buttonText = 'Burn Brrrata';
  }

  return [buttonText, handleClick, disabled];
};
