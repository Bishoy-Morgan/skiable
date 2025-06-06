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
  setTravellerCounts: (counts: TravellerCounts) => void; // Changed this line
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

  // Update tempCounts when travellerCounts changes from parent
  React.useEffect(() => {
    setTempCounts(travellerCounts);
  }, [travellerCounts]);

  const totalTravellers = tempCounts.adults + tempCounts.children + tempCounts.infantsOnSeat + tempCounts.infantsOnLap;

  return (
    <div className="relative">
      <div
        onClick={() => setTravellersOpen(!travellersOpen)}
        className="py-2 px-4 flex items-center space-x-1.5 hover:border-black hover:bg-black/5 rounded-xl cursor-pointer transition-all duration-200 ease-in-out"
      >
        <span className="mr-2 text-black font-medium">
          {totalTravellers}
        </span>

        <Image src={user} alt="User icon" width={22} height={22} />
        <Image 
          src={arrow} 
          alt="Arrow icon" 
          width={22} 
          height={22} 
          className={`transform transition-transform duration-200 ${travellersOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {travellersOpen && (
        <div className="absolute top-full left-0 w-80 mt-2 p-6 bg-[#fffefc] text-black rounded-xl space-y-4 z-50 transition-all duration-300 ease-in-out shadow-lg">
          {[
            { label: 'Adults', key: 'adults', min: 1 }, // Adults should have minimum of 1
            { label: 'Children (2–11)', key: 'children', min: 0 },
            { label: 'Infants (on seat)', key: 'infantsOnSeat', min: 0 },
            { label: 'Infants (on lap)', key: 'infantsOnLap', min: 0 },
          ].map(({ label, key, min }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-base text-black">{label}</span>
              <div className="flex items-center justify-between min-w-[6.5rem] max-w-28">
                <button
                  onClick={() => updateTempCount(key as keyof TravellerCounts, -1)}
                  disabled={tempCounts[key as keyof TravellerCounts] <= min}
                  className={`px-3 py-1 rounded-xl border border-[#F5F3ED]/70 text-black transition-opacity ${
                    tempCounts[key as keyof TravellerCounts] <= min 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-[#F5F3ED]/50'
                  }`}
                >
                  -
                </button>
                <span className="mx-3 font-medium">{tempCounts[key as keyof TravellerCounts]}</span>
                <button
                  onClick={() => updateTempCount(key as keyof TravellerCounts, 1)}
                  className="px-3 py-1 text-black rounded-xl bg-[#F5F3ED]/90 hover:bg-[#F5F3ED] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-4 space-x-2">
            <button
              onClick={cancelChanges}
              className="px-4 py-2 text-black/80 text-sm cursor-pointer hover:bg-[#F5F3ED]/30 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={applyChanges}
              className="px-6 py-2 text-black font-extrabold cursor-pointer hover:bg-[#F5F3ED]/10 rounded-lg transition-colors"
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