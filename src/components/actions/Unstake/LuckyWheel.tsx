import React, { useState } from 'react';

import { Wheel } from 'react-custom-roulette';
import { sendRevealRequest } from '../../../shared/server';

interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setRevealExist: (value: boolean) => void;
  walletAddress: any;
  spin: number;
}

// https://www.npmjs.com/package/react-custom-roulette
const data = [
  {
    option: 'Normal Cheese',
    style: { backgroundColor: 'green', textColor: 'black' },
  },
  { option: 'Double Cheese', style: { backgroundColor: 'white' } },
  { option: 'Moldy Cheese' },
  { option: 'Meltdown 1' },
  { option: 'Meltdown 2' },
  { option: 'Rare Cheese NFTs' },
];

export const LuckyWheel: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  setRevealExist,
  walletAddress,
  spin,
}) => {
  if (!showModal) return null;

  const [spinnedOnce, setSpinnedOnce] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);

  const handleSpinClick = async () => {
    if (!mustSpin) {
      await sendRevealRequest(walletAddress);
      setMustSpin(true);
    }
  };

  const close = () => {
    setShowModal(false);
    if (spinnedOnce) {
      setRevealExist(false);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">You have free spin</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {/* Modal content can go here */}
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={spin}
                data={data}
                onStopSpinning={() => {
                  setMustSpin(false);
                  setSpinnedOnce(true);
                }}
              />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={close}
              >
                Close
              </button>
              {!spinnedOnce ? (
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleSpinClick}
                >
                  Spin the wheel
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
