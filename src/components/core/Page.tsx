import Footer from './Footer';
import Header from './Header';
import Printer from '../interfaces/Printer';
import Tabs from './Tabs';

export default function Page() {
  return (
    <div>
      <body className="min-h-screen bg-gray-100 font-sans">
        <Header />

        <main className="flex justify-center py-6 p-0">
          <div className="flex w-[100vw]">
            <div className="w-[5%]"></div>

            {/* Left Column - Printer */}
            <div className="w-[45%] rounded-xl bg-white shadow-2xl flex flex-col">
              <Printer />
            </div>

            {/* Right Column */}
            <div className="ml-8 w-[48%] rounded-xl bg-none p-0 flex flex-col justify-between gap-4">
              <div className="w-full flex items-center justify-center">
                <div className="flex-col bg-white rounded-lg">
                  <Tabs />
                </div>
              </div>
            </div>

            <div className="w-[2%]"></div>
          </div>
        </main>

        <Footer />
      </body>
    </div>
  );
}
