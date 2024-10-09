import Footer from "./core/Footer";
import Header from "./core/Header";

export default function Page2() {
  return (
    <div>
      <body className="flex h-screen flex-col bg-gray-100 font-sans leading-normal tracking-normal">
        <Header/>

        <main className="flex flex-grow items-center justify-center p-8">
          <div className="flex w-full max-w-6xl flex-col items-stretch justify-center">
            <div className="flex w-full gap-8">
              <section
                id="about"
                className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl"
              >
                <h2 className="mb-4 text-2xl font-bold">Printer go brrr</h2>
                <img
                  src="https://cdn.midjourney.com/a237eaaf-3822-4849-892f-5209fa1c75d9/0_1.png"
                  alt="MemCoin"
                  className="mt-4 rounded-lg shadow-md"
                />
              </section>

              <section id="app" className="flex">
                <div className="flex flex-col justify-between space-y-4">
                  <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                    <h2 className="mb-4 text-xl font-bold">Mint</h2>
                    <div className="relative mb-4">
                      <input
                        type="number"
                        className="w-full rounded border p-2 pr-16 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="Amount to Mint"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-200 px-2 py-1 text-sm text-gray-700">
                        Max
                      </button>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-gray-700">Amount</label>
                        <span className="text-gray-700" id="rangeValue">
                          0
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value="0"
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      />
                    </div>
                    <button className="mt-4 w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition-colors hover:bg-blue-600">
                      Mint Brrata
                    </button>
                  </div>

                  <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                    <h2 className="mb-4 text-xl font-bold">Burn</h2>
                    <div className="relative mb-4">
                      <input
                        type="number"
                        className="w-full rounded border p-2 pr-16 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="Amount to Burn"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-200 px-2 py-1 text-sm text-gray-700">
                        Max
                      </button>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-gray-700">Amount</label>
                        <span className="text-gray-700" id="rangeValue2">
                          0
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value="0"
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      />
                    </div>
                    <button className="mt-4 w-full rounded-lg bg-red-500 py-3 font-medium text-white transition-colors hover:bg-red-600">
                      Burn Brrata
                    </button>
                  </div>

                  <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                    <h2 className="mb-4 text-xl font-bold">Stake</h2>
                    <div className="relative mb-4">
                      <input
                        type="number"
                        className="w-full rounded border p-2 pr-16 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="Amount to Stake"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-200 px-2 py-1 text-sm text-gray-700">
                        Max
                      </button>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-gray-700">Amount</label>
                        <span className="text-gray-700" id="rangeValue3">
                          0
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value="0"
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      />
                    </div>
                    <div className="mb-4 mt-4">
                      <label className="mb-2 block text-gray-700">
                        Staking Duration
                      </label>
                      <select className="w-full cursor-pointer rounded border bg-white p-2">
                        <option>1 week</option>
                        <option>2 weeks</option>
                        <option>3 weeks</option>
                      </select>
                    </div>
                    <button className="mt-4 w-full rounded-lg bg-green-500 py-3 font-medium text-white transition-colors hover:bg-green-600">
                      Stake Brrata
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <div
              id="buckets"
              className="w-full flex-grow mt-8 flex justify-center flex-wrap gap-4"
            >
              <div className="w-1/3 max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-1 font-medium">1000 BRRATA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest:</span>
                      <span className="ml-1 font-medium text-green-600">
                        +50 BRRATA
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Staked:</span>
                      <span className="ml-1 font-medium">5 days ago</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Remaining:</span>
                      <span className="ml-1 font-medium">9 days</span>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600">
                    Unstake
                  </button>
                </div>
              </div>
              <div className="w-1/3 max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-1 font-medium">1000 BRRATA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest:</span>
                      <span className="ml-1 font-medium text-green-600">
                        +50 BRRATA
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Staked:</span>
                      <span className="ml-1 font-medium">5 days ago</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Remaining:</span>
                      <span className="ml-1 font-medium">9 days</span>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600">
                    Unstake
                  </button>
                </div>
              </div>
              <div className="w-1/3 max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-1 font-medium">1000 BRRATA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest:</span>
                      <span className="ml-1 font-medium text-green-600">
                        +50 BRRATA
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Staked:</span>
                      <span className="ml-1 font-medium">5 days ago</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Remaining:</span>
                      <span className="ml-1 font-medium">9 days</span>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600">
                    Unstake
                  </button>
                </div>
              </div>
              <div className="w-1/3 max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-1 font-medium">1000 BRRATA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest:</span>
                      <span className="ml-1 font-medium text-green-600">
                        +50 BRRATA
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Staked:</span>
                      <span className="ml-1 font-medium">5 days ago</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Remaining:</span>
                      <span className="ml-1 font-medium">9 days</span>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600">
                    Unstake
                  </button>
                </div>
              </div>
              <div className="w-1/3 max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-1 font-medium">1000 BRRATA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest:</span>
                      <span className="ml-1 font-medium text-green-600">
                        +50 BRRATA
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Staked:</span>
                      <span className="ml-1 font-medium">5 days ago</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Remaining:</span>
                      <span className="ml-1 font-medium">9 days</span>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600">
                    Unstake
                  </button>
                </div>
              </div>
              <div className="w-1/3 max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-1 font-medium">1000 BRRATA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest:</span>
                      <span className="ml-1 font-medium text-green-600">
                        +50 BRRATA
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Staked:</span>
                      <span className="ml-1 font-medium">5 days ago</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Remaining:</span>
                      <span className="ml-1 font-medium">9 days</span>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600">
                    Unstake
                  </button>
                </div>
              </div>
              <div className="w-1/3 max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-1 font-medium">1000 BRRATA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest:</span>
                      <span className="ml-1 font-medium text-green-600">
                        +50 BRRATA
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Staked:</span>
                      <span className="ml-1 font-medium">5 days ago</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Remaining:</span>
                      <span className="ml-1 font-medium">9 days</span>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600">
                    Unstake
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </body>
    </div>
  );
}
