import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { Chain } from '@rainbow-me/rainbowkit';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet } from '@rainbow-me/rainbowkit/wallets';
import { injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';

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
      wallets: [rainbowWallet, metaMaskWallet, injectedWallet],
    },
  ],
  {
    appName: 'Brrrata Web App',
    projectId: '1590ddedb144ba56c0842d3b13c4297b',
  },
);

export const config = createConfig({
  chains: [mainnet, sepolia, cheeseChainTestnet],
  connectors: connectors,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [cheeseChainTestnet.id]: http(),
  },
});
