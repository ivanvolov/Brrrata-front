import axios from 'axios';

// const url = 'https://example.com/api';
const url = 'http://localhost:3001';

export const sendRevealRequest = async (walletAddress: any): Promise<any> => {
  const data = {
    address: walletAddress,
  };

  try {
    const response = await axios.post(`${url}/reveal`, data);
    return response.data;
  } catch (error) {
    console.error('There was an error!', error);
  }
};
