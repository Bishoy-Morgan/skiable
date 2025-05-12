'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import user from '@/public/icons/user1.svg';
import arrow from '@/public/icons/arrow.svg';

type TravellerCounts = {
  adults: number;
  children: number;
  infantsOnSeat: number;
  infantsOnLap: number;
};

type TravellerDropdownProps = {
  travellerCounts: TravellerCounts;
  setTravellerCounts: React.Dispatch<React.SetStateAction<TravellerCounts>>;
};

const TravellerDropdown: React.FC<TravellerDropdownProps> = ({ travellerCounts, setTravellerCounts }) => {
  const [tempCounts, setTempCounts] = useState({ ...travellerCounts });
  const [travellersOpen, setTravellersOpen] = useState(false);

  const updateTempCount = (key: keyof TravellerCounts, delta: number) => {
    setTempCounts((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const applyChanges = () => {
    setTravellerCounts(tempCounts);
    setTravellersOpen(false);
  };

  const cancelChanges = () => {
    setTempCounts(travellerCounts);
    setTravellersOpen(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setTravellersOpen(!travellersOpen)}
        className="py-1.5 px-4 flex items-center space-x-1.5 cursor-pointer hover:bg-white/30 rounded"
      >
        <span className="mr-2">
          {tempCounts.adults + tempCounts.children + tempCounts.infantsOnSeat + tempCounts.infantsOnLap} 
        </span>

        <Image src={user} alt="User icon" width={22} height={22} />
        <Image src={arrow} alt="Arrow icon" width={22} height={22} />
      </div>

      {travellersOpen && (
        <div className="absolute top-full left-0 w-80 mt-2 p-6 bg-white text-[#373d43] rounded-lg shadow-lg space-y-4 z-50 transition-all duration-300 ease-in-out">
          {[
            { label: 'Adults', key: 'adults' },
            { label: 'Children (2–11)', key: 'children' },
            { label: 'Infants (on seat)', key: 'infantsOnSeat' },
            { label: 'Infants (on lap)', key: 'infantsOnLap' },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-base text-[#373d43]">{label}</span>
              <div className="flex items-center justify-between min-w-[6.5rem] max-w-28">
                <button
                  onClick={() => updateTempCount(key as keyof TravellerCounts, -1)}
                  className="px-3 py-1 rounded bg-[#373d43]/10"
                >
                  -
                </button>
                <span className="mx-3">{tempCounts[key as keyof TravellerCounts]}</span>
                <button
                  onClick={() => updateTempCount(key as keyof TravellerCounts, 1)}
                  className="px-3 py-1 rounded bg-[#a0dade]/50"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <button
              onClick={cancelChanges}
              className="px-4 text-[#373d43]/80 text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={applyChanges}
              className="px-4 text-sky-400 font-extrabold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravellerDropdown;
