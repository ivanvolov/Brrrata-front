import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="w-full flex items-center bg-gradient-to-r from-blue-500 to-purple-500 pt-4 pb-4 pr-6 pl-6 shadow-lg">
      <div className="flex w-full items-center">
        <div className="w-[75%] flex justify-start">
          <h1
            className="font-bold text-white text-center"
            style={{ fontSize: '2vw' }}
          >
            Brrrata
          </h1>
        </div>
        <div className="w-[25%] flex justify-end">
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
