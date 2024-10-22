import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Tabs from './Tabs';
import PriceChart from '../interfaces/PriceChart';
import gif1 from '../files/printer.gif';
import gif2 from '../files/double_cheese.gif';
import gif3 from '../files/ramsay.gif';
import gif4 from '../files/pizza.gif';
import { ToastContainer, toast } from 'react-toastify';
import { useBlockNumber } from 'wagmi';
import { getPrices } from '../../shared/server';
import 'react-toastify/dist/ReactToastify.css';

const defaultPerformanceData = [
  {
    date: 'Oct 05',
    pureETH: 1,
    Based: 1,
  },
  {
    date: 'Oct 12',
    pureETH: 1,
    Based: 1,
  },
];

export default function Page() {
  const [performanceData, setPerformanceData] = useState(
    defaultPerformanceData,
  );
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const tokenAddress = "0xCF8390A74c59e008df3f6154bECf798402301698";

  useEffect(() => {
    const getAndUpdateData = async () => {
      const result = await getPrices();
      console.log('Prices:', result.prices);

      setPerformanceData(
        result.prices.map((obj: any) => ({
          date: obj.dateString,
          pureETH: 1,
          Based: obj.price,
        })),
      );
    };
    getAndUpdateData();
  }, [blockNumber]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tokenAddress);
    toast.success('Token address copied to clipboard!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <section className="flex flex-col items-center justify-start py-4">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-start gap-6">
          {/* Large Chart Component */}
          <div className="w-full md:w-3/4 bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Brrrata/Cheese Price</h2>
              <span className="text-3xl font-bold">
                {performanceData
                  ? (
                      performanceData[performanceData.length - 1].Based
                    ).toFixed(3)
                  : ''}
              </span>
            </div>
            <PriceChart performanceData={performanceData} />
          </div>
          {/* Token Address and Tabs Components */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <div>
              {/* Token Address Component */}
              <div className="bg-gray-200 p-4 rounded-lg mb-4 flex items-center justify-between">
                <span className="text-md font-semibold">Token: {tokenAddress.slice(0, 5)}...{tokenAddress.slice(-3)}</span>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Copy
                </button>
              </div>
              {/* Tabs Component */}
              <div className="mt-4">
                <Tabs />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full max-w-6xl mx-auto my-4 pb-16">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-start mb-6">
            Welcome to Brrrata!
          </h2>
          <p className="text-lg leading-relaxed">
            GM, kings! Welcome to Holland—the land of windmills, cheese, and
            fields of beautiful flowers. But flowers? Maaaan, forget the tulips.
            Here, we're cranking out pure, unfiltered chaos. I mean, it's
            Holland—so why settle for flowers when you could be minting
            cheese-fueled, hallucinogenic Brrrata tokens? Let's freaking go!
            Here are the rules, quick and dirty:
          </p>
          <ol className="list-decimal list-inside mt-4 text-lg">
            <li className="mt-4">
              <strong>Mint Brrrata Tokens</strong>
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>Cheese Printer from Hell:</strong> Hit the button and
                  let the cheese printer brrrr! The more you mint, the crazier
                  it gets. Like, windmill-level crazy.
                </li>
                <li>
                  <strong>Bonding Curve:</strong> Price goes up as more cheese
                  is printed. Think of it like the flowers—they bloom, they get
                  expensive. Early minting = cheap cheese.
                </li>
              </ul>
            </li>
            <div className="relative w-1/2 pb-[50%] mx-auto flex items-center justify-center">
              <img
                src={gif1}
                alt="Cheese Printer from Hell"
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <li className="mt-4">
              <strong>Spin the Wheel of Cheese-tiny</strong>
              <p className="mt-2">
                Mint some tokens and spin the wheel. What'll it be?
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>Normal cheese (45%):</strong> Yeah, it's just cheese—no
                  frills, no thrills.
                </li>
                <li>
                  <strong>Double your cheese (15%):</strong> Twice the dairy, twice
                  the flex!
                </li>
                <li>
                  <strong>Normal cheese locked for 1 day (15%):</strong> Sit tight,
                  cheese takes time, buddy.
                </li>
                <li>
                  <strong>Normal cheese locked for 1 week (10%):</strong> Aged to
                  perfection—hope you like waiting!
                </li>
                <li>
                  <strong>Moldy cheese (7%):</strong> Yikes, lose 10% of your
                  cheese—better luck next time.
                </li>
                <li>
                  <strong>Burnt cheese (3%):</strong> Gordon Ramsay just showed up,
                  called you an idiot sandwich, and poof—your cheese is GONE!
                </li>
              </ul>
            </li>
            <div className="flex flex-row h-full justify-center items-center mt-4">
              <div className="relative w-1/2 pb-[50%] flex items-center justify-center">
                <img
                  src={gif2}
                  alt="Double Cheese"
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
              <div className="relative w-1/2 pb-[50%] flex items-center justify-center">
                <img
                  src={gif3}
                  alt="Burnt Cheese"
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </div>
            <li className="mt-4">
              <strong>Stake in the Fondue Pit</strong>
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>Stake for Gooey Rewards:</strong> Toss your Brrrata
                  into the Fondue Pit and let it melt. Earn gooey cheese rewards
                  while others dream of tulips.
                </li>
                <li>
                  <strong>69% APY with 3 Staking Options:</strong> Stake your
                  Brrrata for:
                  <ul className="list-disc list-inside mt-2 ml-4">
                    <li>
                      <strong>1 day:</strong> x1 rewards.
                    </li>
                    <li>
                      <strong>3 days:</strong> x1.2 rewards.
                    </li>
                    <li>
                      <strong>7 days:</strong> x1.5 rewards.
                    </li>
                  </ul>
                  But beware—once the staking period is over, your cheese stops
                  growing. No interest after that, so time it right or end up
                  with sad, crusty cheese.
                </li>
              </ul>
            </li>
            <div className="relative w-1/2 pb-[50%] mx-auto py-6 flex items-center justify-center">
              <img
                src={gif4}
                width="100%"
                height="100%"
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </ol>
          <div className="mt-6 text-center">
            <p className="text-xl font-bold">Ready for a Wild Ride?</p>
            <p>
              Click the button, start minting, and let’s paint Holland
              cheese-yellow! 🧀🚀
            </p>
          </div>
        </div>
      </section>
      <Footer />
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
