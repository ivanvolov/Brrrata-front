import { createConfig, configureChains } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

// Configure chains and providers
const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

// Get default wallets for RainbowKit (you can skip if not using RainbowKit)
const { connectors } = getDefaultWallets({
  appName: 'YourAppName',
  chains,
});

// Create Wagmi client
const config = createConfig({
  autoConnect: true, // This is still available
  connectors,
  publicClient,
});

export default config;
