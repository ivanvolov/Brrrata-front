import Footer from './Footer';
import Header from './Header';
import Buckets from '../interfaces/Buckets';
import Printer from '../interfaces/Printer';
import Mint from '../actions/Mint';
import Burn from '../actions/Burn';
import Stake from '../actions/Stake';

export default function Page() {
  return (
    <div>
      <body className="min-h-screen bg-gray-100 font-sans">
        <Header />

        <main className="flex justify-center py-6">
          <div className="mx-auto flex w-[100vw]">
            <div className="w-[5%]"></div>
            {/* Left Column - Printer */}
            <div className="w-[50%] rounded-xl bg-white shadow-2xl">
              <Printer />
            </div>

            {/* Right Column */}
            <div className="ml-8 w-[53%] rounded-xl bg-none p-0 flex w-full justify-between gap-4">
              <section
                id="app"
                className="w-[50%] p-0 flex flex-col justify-between space-y-4 gap-4"
              >
                <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                  <Mint />
                </div>

                <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                  <Burn />
                </div>

                <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                  <Stake />
                </div>
              </section>
              <section
                id="buckets"
                className="w-[50%] p-0 flex flex-col flex-wrap gap-4"
              >
                <Buckets />
              </section>
            </div>
            <div className="w-[2%]"></div>
          </div>
        </main>

        <Footer />
      </body>
    </div>
  );
}
