// Import necessary modules
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { reconnect, connect } from '@wagmi/core';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Page from './components/Page';
import { injected, metaMask } from '@wagmi/connectors';

import { config } from './web3/wagmiConfig2';

const queryClient = new QueryClient();
const App = () => {
  //   reconnect(config, { connectors: [metaMask(), injected()] });
  try {
    connect(config, { connector: metaMask() }); //TODO: fix this sheet but not now:)
  } catch (e) {}
  return (
    <WagmiProvider config={config as any} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Page />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

// Export your App
export default App;
