import { toBN } from '../../shared/token';
import { ACTIVE_CHAIN_ID } from '../../web3';

export const getMintButtonLogic = (options: any) => {
  const {
    walletAddress,
    chainId,
    balance,
    allowance,
    amount,
    handleTransactionApprove,
    handleTransactionMint,
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
  } else if (!balance || !allowance) {
    disabled = true;
    handleClick = emptyHandle;
    buttonText = 'Loading...';
  } else if (!amount || amount.isZero()) {
    disabled = false;
    handleClick = emptyHandle;
    buttonText = 'Enter WCHEESE to deposit';
  } else if (amount.gt(toBN(balance))) {
    disabled = false;
    handleClick = emptyHandle;
    buttonText = 'Not enough WCHEESE';
  } else if (amount.gt(toBN(allowance))) {
    disabled = false;
    handleClick = handleTransactionApprove;
    buttonText = 'Approve WCHEESE';
  } else {
    disabled = false;
    handleClick = handleTransactionMint;
    buttonText = 'Mint Brrrata';
  }

  return [buttonText, handleClick, disabled];
};
