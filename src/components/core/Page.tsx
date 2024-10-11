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

        <main className="flex justify-center py-8">
          <div className="mx-auto flex w-[85vw]">
            {/* Left Column - Printer */}
            <div className="w-[35%] rounded-xl bg-white shadow-2xl">
              <Printer />
            </div>

            {/* Right Column - White placeholder */}
            <div className="ml-8 w-[50%] rounded-xl bg-white p-6 shadow-2xl">
              {/* Content will go here later */}
            </div>
          </div>
        </main>

        <Footer />
      </body>
    </div>
  );
}
