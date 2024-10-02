// Import necessary modules
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, Chain } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const cheeseChainTestnet = {
   id: 9209108,
   name: 'CheeseChain Testnet',
   iconUrl: 'https://misc-bucket.caldera.xyz/photo_5030561642252971496_y.jpg',
   iconBackground: '#fff',
   nativeCurrency: { name: 'TestCheese', symbol: 'CHEESE', decimals: 18 },
   rpcUrls: {
     default: { http: ['https://cheesechain-testnet.rpc.caldera.xyz/http'] },
   }
 } as const satisfies Chain;
 

// Set Config
const config = getDefaultConfig({
   appName: 'Brrrata Web App',
   projectId: '1590ddedb144ba56c0842d3b13c4297b',
   chains: [mainnet, cheeseChainTestnet],
   ssr: false,
});

const queryClient = new QueryClient();

// Wrap your app with providers
const App = () => {
   return (
      <WagmiProvider config={config as any}>
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