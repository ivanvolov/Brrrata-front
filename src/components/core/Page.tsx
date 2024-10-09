import Footer from './Footer';
import Header from './Header';
import Buckets from '../interfaces/Buckets';
import Printer from '../interfaces/Printer';
import Mint from '../actions/Mint';
import Burn from '../actions/Burn';
import Stake from '../actions/Stake';

export default function Page2() {
  return (
    <div>
      <body className="flex h-screen flex-col bg-gray-100 font-sans leading-normal tracking-normal">
        <Header />

        <main className="flex flex-grow items-center justify-center p-8">
          <div className="flex w-full max-w-6xl flex-col items-stretch justify-center">
            <div className="flex w-full gap-8">
              <Printer />

              <section id="app" className="flex">
                <div className="flex flex-col justify-between space-y-4">
                  <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                    <Mint />
                  </div>

                  <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                    <Burn />
                  </div>

                  <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl">
                    <Stake />
                  </div>
                </div>
              </section>
            </div>

            <Buckets />
          </div>
        </main>

        <Footer />
      </body>
    </div>
  );
}
