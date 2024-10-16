// Import necessary modules
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Page from './components/core/Page';
import CheeseClickEffect from './components/actions/CheeseClickEffect';
import 'react-toastify/dist/ReactToastify.css';

import { config } from './web3/wagmiConfig';

const queryClient = new QueryClient();
const App = () => {
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
