import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { allChains, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider } = configureChains(allChains, [
  alchemyProvider({ alchemyId: 'TXsw-vslXP7HD5w_QyDkwuR1XyKoE8zX' }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: 'Brrrata Web App',
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
