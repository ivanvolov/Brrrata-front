import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import Page from './components/Page';

import { wagmiClient, chains } from './web3/wagmiConfig3';

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Page />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
