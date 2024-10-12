import React, { useEffect, useRef } from 'react';

import Footer from './Footer';
import Header from './Header';
import Printer from '../interfaces/Printer';
import Tabs from './Tabs';

export default function Page() {
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <body className="min-h-screen bg-gray-100 font-sans">
        <section className="min-h-screen">
          <Header />

          <main className="flex justify-center py-8 p-0">
            <div className="flex w-[100vw]">
              <div className="w-[5%]"></div>

              {/* Left Column - Printer */}
              <div
                ref={leftColumnRef}
                className="w-[45%] rounded-xl bg-none flex flex-col"
              >
                <Printer />
              </div>

              {/* Right Column */}
              <div
                ref={rightColumnRef}
                className="ml-8 w-[48%] rounded-xl bg-none p-0 flex flex-col justify-between gap-4"
              >
                <div className="w-full flex items-center justify-center">
                  <div className="flex-col bg-white rounded-lg">
                    <Tabs />
                  </div>
                </div>
              </div>

              <div className="w-[2%]"></div>
            </div>
          </main>
        </section>

        <Footer />
      </body>
    </div>
  );
}
