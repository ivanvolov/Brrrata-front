// Import necessary modules
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { reconnect, connect } from '@wagmi/core';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Page from './components/Page';
import { injected, metaMask } from '@wagmi/connectors';

import { config } from './web3/wagmiConfig';
import { useEffect } from 'react';

const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    const reconnectWallet = async () => {
      try {
        const result = await reconnect(config, {
          connectors: [injected(), metaMask()],
        });
        console.log('Reconnected successfully', result);
      } catch (error) {
        console.error('Error reconnecting:', error);
      }
    };

    reconnectWallet();
  }, []); // Empty dependency array to run once on mount

  // await reconnect(config, { connectors: [injected(), metaMask()] });
  //     connect(config, { connector: metaMask() }); //TODO: fix this sheet but not now:)
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
