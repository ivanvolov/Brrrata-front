import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Tabs from './Tabs';
import PriceChart from '../interfaces/PriceChart';
import gif1 from '../files/1.gif';
import gif2 from '../files/2.gif';
import gif3 from '../files/3.gif';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <section className="flex flex-col items-center justify-start py-4">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-start gap-6">
          {/* Large Chart Component */}
          <div className="w-full md:w-3/4 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-start mb-6">Brrrata/Cheese Price</h2>
            <PriceChart />
          </div>
          {/* Smaller Tabs Component */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <Tabs />
          </div>
        </div>
      </section>
      <section className="w-full max-w-6xl mx-auto my-4 pb-16">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-start mb-6">Welcome to Brrrata!</h2>
          <p className="text-lg leading-relaxed">
            Hello, welcome to Holland! The land of windmills, cheese, and fields of beautiful flowers! But flowers? Maaaan, forget the tulips. Here, we're cranking out pure, unfiltered chaos. I mean, it's Holland—so why settle for flowers when you could be minting cheese-fueled, hallucinogenic Brrrata tokens? Let's freaking go! Here are the rules, quick and dirty:
          </p>
          <ol className="list-decimal list-inside mt-4 text-lg">
            <li className="mt-4"><strong>Mint Brrrata Tokens</strong>
              <ul className="list-disc list-inside mt-2">
                <li><strong>Cheese Printer from Hell:</strong> Hit the button and let the cheese printer brrrr! The more you mint, the crazier it gets.</li>
                <li><strong>Bonding Curve:</strong> Price goes up as more cheese is printed. Early minting = cheap cheese.</li>
                <li><strong>33 Phases:</strong> We got 33 phases, each lasting 3 days. Every new phase? Less Brrrata, more value, more hype.</li>
              </ul>
            </li>
            <div className="relative w-1/2 pb-[50%] mx-auto flex items-center justify-center">
                <iframe
                  src={gif1}
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            <li className=""><strong>Spin the Wheel of Cheese-tiny:</strong> Mint some tokens and spin the wheel. Maybe you double your cheese, maybe Gordon Ramsay yells at you—it’s all fair game.</li>
            <div className="flex flex-row h-full justify-center items-center ">
              <div className="relative w-1/2 pb-[50%] flex items-center justify-center">
                <iframe
                  src={gif2}
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="relative w-1/2 pb-[50%] flex items-center justify-center">
                <iframe
                  src={gif3}
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <li className="mt-4"><strong>Stake in the Fondue Pit</strong>
              <ul className="list-disc list-inside mt-2">
                <li><strong>Stake for Gooey Rewards:</strong> Toss your Brrrata into the Fondue Pit and let it melt. Earn gooey cheese rewards while others dream of tulips.</li>
                <li><strong>20% Staking Rewards:</strong> 20% of all cheese is set aside for stakers. But don't let it burn or you’ll end up with sad, crusty cheese.</li>
              </ul>
            </li>
            <div className="relative w-1/2 pb-[50%] mx-auto py-6 flex items-center justify-center">
                <iframe
                  src="https://giphy.com/embed/3ov9jGViTnEpcmybbq"
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
          </ol>
          <div className="mt-6 text-center">
            <p className="text-xl font-bold">Ready for a Wild Ride?</p>
            <p>Click the button, start minting, and let’s paint Holland cheese-yellow! 🧀🚀</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}