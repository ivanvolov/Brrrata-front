import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 p-4 sm:p-6 shadow-lg">
      <div className="flex w-full items-center justify-between">
        {/* Heading with 80% width */}
        <div className="w-[80%] max-w-[1000px]">
          <h1
            className="font-bold text-white text-left sm:text-center"
            style={{ fontSize: '2vw' }}
          >
            Brrrata, where cheese meets extraordinary yield and modern
            ponzinomics
          </h1>
        </div>
        {/* Connect Button with 20% width and no extra space to the right */}
        <div className="w-[25%] ml-auto flex-shrink-0 flex justify-end pr-0">
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'address',
            }}
          />
        </div>
      </div>
    </header>
  );
}
