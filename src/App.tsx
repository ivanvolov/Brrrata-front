// Import necessary modules
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { reconnect } from '@wagmi/core';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Page from './components/Page';

import { config } from './web3/wagmiConfig';

const queryClient = new QueryClient();
const App = () => {
  reconnect(config);
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
