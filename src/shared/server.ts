import axios from 'axios';

// const url = 'https://example.com/api';
const url = 'http://localhost:3001/getFreeSpin';

export const insureSpin = async (walletAddress: any) => {
  const data = {
    address: walletAddress,
  };

  try {
    const response = await axios.post(url, data);
    console.log(response.data);
  } catch (error) {
    console.error('There was an error!', error);
  }
};
