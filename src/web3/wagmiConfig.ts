// Import necessary modules
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';
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

// https://cheesechain.hub.caldera.xyz/
const cheeseChain = {
  id: 383353,
  name: 'CheeseChain',
  iconUrl: 'https://misc-bucket.caldera.xyz/photo_5030561642252971496_y.jpg',
  iconBackground: '#fff',
  nativeCurrency: { name: 'CHEESE', symbol: 'CHEESE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://cheesechain.calderachain.xyz/http'] },
  },
} as const satisfies Chain;

export const storage = createStorage({
  deserialize,
  storage: localStorage,
});

export const config = getDefaultConfig({
  appName: 'Brrrata Web App',
  projectId: '1590ddedb144ba56c0842d3b13c4297b',
  chains: [cheeseChain],
  ssr: false,
  storage: storage,
});
