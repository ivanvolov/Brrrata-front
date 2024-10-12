// Import necessary modules
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';
import { mainnet } from 'wagmi/chains';
import { createStorage, deserialize } from 'wagmi';

const cheeseChainTestnet = {
  id: 9209108,
  name: 'CheeseChain Testnet',
  iconUrl: 'https://misc-bucket.caldera.xyz/photo_5030561642252971496_y.jpg',
  iconBackground: '#fff',
  nativeCurrency: { name: 'TestCheese', symbol: 'CHEESE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://cheesechain-testnet.rpc.caldera.xyz/http'] },
  },
} as const satisfies Chain;

export const storage = createStorage({
  deserialize,
  storage: localStorage,
});

export const config = getDefaultConfig({
  appName: 'Brrrata Web App',
  projectId: '1590ddedb144ba56c0842d3b13c4297b',
  chains: [cheeseChainTestnet],
  ssr: false,
  storage: storage,
});

console.log(config);
