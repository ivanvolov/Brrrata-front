import React, { useState } from 'react';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import { sendRevealRequest } from '../../../shared/server';

import normal_burrata from '../../files/normal_burrata.gif';
import double_cheese from '../../files/double_cheese.gif';
import moldy_cheese from '../../files/moldy_cheese.gif'
import printer from '../../files/printer.gif';
import ramsay from '../../files/ramsay.gif';
import melt1 from '../../files/melt1.gif'
import melt2 from '../../files/melt2.gif'

interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setRevealExist: (value: boolean) => void;
  walletAddress: any;
  spin: number;
}

const prizes = [
  {
    "id": "a44c728d-8a0e-48ca-a963-3d5ce6dd41b0--6rz6dlF6jAbds_o1VaJK1",
    "image": normal_burrata,
    "text": "Normal Cheese"
  },
  {
    "id": "7d24b681-82d9-4fc0-b034-c82f9db11a59--7pC6zdUjAraEEGjztgMHp",
    "image": double_cheese,
    "text": "Double Cheese"
  },
  {
    "id": "9da9a287-952f-41bd-8c7a-b488938d7c7a--hrMh312F-eLf5_2qLHhSA",
    "image": moldy_cheese,
    "text": "Moldy Cheese"
  },
  {
    "id": "04106f3f-f99f-47e4-a62e-3c81fc8cf794--yRPVzjCU8K86jClftIFqf",
    "image": ramsay,
    "text": "Ooops, Burnt Cheese"
  },
  {
    "id": "04106f3f-f99f-47e4-a62e-3c81fc8cf794--yRPVzjCU8K86jClftIFqf",
    "image": melt1,
    "text": "Cheese Meltdown 3 days"
  },
  {
    "id": "04106f3f-f99f-47e4-a62e-3c81fc8cf794--yRPVzjCU8K86jClftIFqf",
    "image": melt2,
    "text": "Cheese Meltdown 7 days"
  }
];

const reproductionArray = (array = [], length = 0) => [
  ...Array(length)
    .fill('_')
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

const reproducedPrizeList = [
  ...prizes,
  ...reproductionArray(prizes, prizes.length * 3),
  ...prizes,
  ...reproductionArray(prizes, prizes.length),
];

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

const prizeList = reproducedPrizeList.map((prize) => ({
  ...prize,
  id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
}));

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

  const prizeIndex = prizes.length * 4 + spin;

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
              <RoulettePro
                prizes={prizeList}
                prizeIndex={prizeIndex}
                start={mustSpin}
                onPrizeDefined={() => {
                  setMustSpin(false);
                  setSpinnedOnce(true);
                }}
                defaultDesignOptions={{ prizesWithText: true }}
                options={{ stopInCenter: true, withoutAnimation: true,  }}
                classes={ {prizeItem: 'flex', wrapper: 'flex'}}
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