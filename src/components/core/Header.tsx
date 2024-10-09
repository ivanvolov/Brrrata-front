import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 p-6 shadow-lg">
      <h1 className="text-3xl font-bold text-white">
        Brrrata is the best cheese
      </h1>
      <ConnectButton showBalance={false} />
    </header>
  );
}
