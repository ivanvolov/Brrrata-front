import {
  createConfig,
  http,
  createStorage,
  cookieStorage,
  deserialize,
} from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { Chain } from '@rainbow-me/rainbowkit';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  injectedWallet,
  metaMaskWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { injected, metaMask } from 'wagmi/connectors';

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

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, injectedWallet, rainbowWallet, coinbaseWallet],
    },
  ],
  {
    appName: 'Brrrata Web App',
    projectId: '1590ddedb144ba56c0842d3b13c4297b',
  },
);

export const storage = createStorage({
  deserialize,
  storage: localStorage,
});

export const config = createConfig({
  chains: [mainnet, sepolia, cheeseChainTestnet],
  connectors: [injected(), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [cheeseChainTestnet.id]: http(),
  },
  storage: storage,
});
