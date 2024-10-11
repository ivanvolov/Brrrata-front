import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 p-6 shadow-lg relative">
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-2xl font-bold text-white text-center">
          Brrrata, where cheese meets extraordinary yield and modern ponzinomics
          design
        </h1>
      </div>
      <div className="flex-shrink-0 ml-auto">
        <ConnectButton showBalance={false} />
      </div>
    </header>
  );
}
