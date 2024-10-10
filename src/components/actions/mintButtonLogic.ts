export const getMintButtonLogic = (options: any) => {
  const {
    walletAddress,
    chainId,
    balance,
    allowance,
    handleTransactionApprove,
    handleTransactionMint,
    openConnectModal,
    openChainModal,
  } = options;
  let handleClick: any = () => {};
  let buttonText = 'Mint Brrrata';
  let disabled = true;

  if (!walletAddress) {
    disabled = true;
    buttonText = 'Connect wallet';
    handleClick = openConnectModal;
  } else if (chainId != 9209108) {
    disabled = true;
    handleClick = openChainModal;
    buttonText = 'Unsupported chain';
  }
  // } else if (ba)
  console.log(allowance);
  console.log(typeof allowance);

  return [buttonText, handleClick, disabled];
};
