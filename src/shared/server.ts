import axios from 'axios';

const url = 'https://api.brrrata.fun';
// const url = 'http://localhost:3002';

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

export const getRevealState = async (walletAddress: any): Promise<any> => {
  try {
    const response = await axios.post(`${url}/canReveal`, {
      address: walletAddress,
    });
    return response.data;
  } catch (error) {
    console.error('There was an error!', error);
  }
};

export const getPrices = async (): Promise<any> => {
  try {
    const response = await axios.post(`${url}/prices`, {});
    return response.data;
  } catch (error) {
    console.error('There was an error!', error);
  }
};
