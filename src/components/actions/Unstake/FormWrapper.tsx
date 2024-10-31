import React, { useEffect } from 'react';
import { useReadContract, useAccount, useBlock } from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import fonduePitABI from '../../../web3/abi/FonduePit.json';
import { FONDUEPIT_ADDRESS } from '../../../web3';
import MoldForm from './MoldForm';

interface FormWrapperProps {
  id: number;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ id }) => {
  const queryClient = useQueryClient();

  const { data: blockData } = useBlock({ watch: true });
  const { address: walletAddress } = useAccount();

  const {
    data: formExist,
    queryKey: queryKeyFE,
    isLoading: isLoadingFE,
  } = useReadContract({
    abi: fonduePitABI,
    address: FONDUEPIT_ADDRESS,
    functionName: 'isFormExist',
    args: [walletAddress, id],
  });

  useEffect(() => {
    if (blockData === undefined) return;
    queryClient.invalidateQueries({ queryKey: queryKeyFE });
  }, [blockData, queryClient, walletAddress]);

  if (isLoadingFE || !blockData) return <></>;

  if (formExist == true) return <MoldForm id={id} />;
  else return <></>;
};

export default FormWrapper;
