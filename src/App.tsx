// Import necessary modules
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Set Config
const config = getDefaultConfig({
   appName: 'My RainbowKit App',
   projectId: 'YOUR_PROJECT_ID', // replace with your project ID
   chains: [mainnet, polygon, optimism, arbitrum, base],
   ssr: false,
});

const queryClient = new QueryClient();

// Wrap your app with providers
const App = () => {
   return (
      <WagmiProvider config={config}>
         <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
               {/* Your actual application components */}
               <ConnectButton />
            </RainbowKitProvider>
         </QueryClientProvider>
      </WagmiProvider>
   );
};

// Export your App
export default App;