import React, { useState } from 'react';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import { sendRevealRequest } from '../../../shared/server';

import { prizeList } from './prizes';

interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setRevealExist: (value: boolean) => void;
  walletAddress: any;
  spin: number;
}

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

  const prizeIndex = 6 * 4 + spin;

  console.log(prizeList.length);
  console.log(prizeList[prizeIndex].text);

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
              <h3 className="text-3xl font-semibold">
                {!spinnedOnce
                  ? 'You have free spin'
                  : prizeList[prizeIndex].test}
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {!spinnedOnce ? (
                <RoulettePro
                  prizes={prizeList}
                  prizeIndex={prizeIndex}
                  start={mustSpin}
                  onPrizeDefined={() => {
                    setMustSpin(false);
                    setSpinnedOnce(true);
                  }}
                  defaultDesignOptions={{ prizesWithText: true }}
                  options={{ stopInCenter: false, withoutAnimation: true }}
                  classes={{ prizeItem: 'flex', wrapper: 'flex' }}
                />
              ) : (
                <>
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={prizeList[prizeIndex].image}
                    alt="Cheese Printer from Hell"
                    className="w-full h-full"
                  />
                  <p className="mt-4 text-xl font-semibold">
                    {prizeList[prizeIndex].text}
                  </p>
                </div>
                </>
              )}
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
