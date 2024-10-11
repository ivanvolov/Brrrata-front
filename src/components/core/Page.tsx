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
      <body className="flex h-screen flex-col bg-gray-100 font-sans leading-normal tracking-normal">
        <Header />

        <main className="flex flex-grow items-center justify-center p-8">
          <div className="flex w-full max-w-6xl flex-col items-stretch justify-center">
            <div className="flex w-full gap-8">
              <section
                id="about"
                className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl"
              >
                <Printer />
              </section>

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

            <section
              id="buckets"
              className="w-full flex-grow mt-8 flex justify-center flex-wrap gap-4"
            >
              <Buckets />
            </section>
          </div>
        </main>

        <Footer />
      </body>
    </div>
  );
}
