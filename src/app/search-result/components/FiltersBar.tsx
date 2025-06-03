'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Dropdown from '@/src/components/ui/Dropdown';
import TravellerDropdown from '@/src/components/ui/TravellerDropdown';
import Button from '@/src/components/ui/Button';
import CustomRangeSlider from './CustomRangeSlider';
import arrow from '@/public/icons/arrow.svg';
import Image from 'next/image';

const tripTypeOptions = [
  { label: 'Round Trip', value: 'round' },
  { label: 'One Way', value: 'oneway' },
  { label: 'Multi-City', value: 'multicity' },
];

const cabinClassOptions = [
  { label: 'Economy', value: 'economy' },
  { label: 'Premium Economy', value: 'premium' },
  { label: 'Business', value: 'business' },
  { label: 'First', value: 'first' },
];

const getLabelFromValue = (options: { label: string; value: string }[], value: string) =>
  options.find((opt) => opt.value === value)?.label || '';

const getValueFromLabel = (options: { label: string; value: string }[], label: string) =>
  options.find((opt) => opt.label === label)?.value || '';

const parseTravellerCounts = (str: string) => {
  const parts = str.split('-').map(Number);
  if (parts.length === 4 && parts.every((n) => !isNaN(n))) {
    return {
      adults: parts[0],
      children: parts[1],
      infantsOnSeat: parts[2],
      infantsOnLap: parts[3],
    };
  }
  return { adults: 1, children: 0, infantsOnSeat: 0, infantsOnLap: 0 };
};

const FiltersBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract raw param values once
  const tripTypeParam = searchParams.get('tripType') || '';
  const cabinParam = searchParams.get('cabin') || '';
  const travellersParam = searchParams.get('travellers') || '1-0-0-0';
  const priceParam = searchParams.get('price') || '';

  // Initialize state based on searchParams
  const [tripType, setTripType] = useState(() => getLabelFromValue(tripTypeOptions, tripTypeParam) || tripTypeOptions[0].label);
  const [cabinClass, setCabinClass] = useState(() => getLabelFromValue(cabinClassOptions, cabinParam) || cabinClassOptions[0].label);
  const [travellerCounts, setTravellerCounts] = useState(() => parseTravellerCounts(travellersParam));
  const [maxPrice, setMaxPrice] = useState(() => {
    const val = parseInt(priceParam);
    return !isNaN(val) ? val : 5000;
  });

  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (maxPrice !== 5000) {
      params.set('price', `${maxPrice}`);
    } else {
      params.delete('price');
    }

    const tripTypeValue = getValueFromLabel(tripTypeOptions, tripType);
      if (tripTypeValue) {
        params.set('tripType', tripTypeValue);
      } else {
        params.delete('tripType');
      }

    const cabinValue = getValueFromLabel(cabinClassOptions, cabinClass);
      if (cabinValue) {
        params.set('cabin', cabinValue);
      } else {
        params.delete('cabin');
      }

    const travellerString = `${travellerCounts.adults}-${travellerCounts.children}-${travellerCounts.infantsOnSeat}-${travellerCounts.infantsOnLap}`;
    params.set('travellers', travellerString);

    router.push(`/search-results?${params.toString()}`);
  };

  return (
    <div className="w-full py-6 px-6 flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-x-4">
        {/* Trip Type */}
        <Dropdown
          options={tripTypeOptions.map((opt) => opt.label)}
          selected={tripType}
          onChange={setTripType}
        />

        {/* Travellers */}
        <TravellerDropdown
          travellerCounts={travellerCounts}
          setTravellerCounts={setTravellerCounts}
        />

        {/* Cabin */}
        <Dropdown
          options={cabinClassOptions.map((opt) => opt.label)}
          selected={cabinClass}
          onChange={setCabinClass}
          widthClass="w-52"
        />

        {/* Price Range Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowPriceDropdown(!showPriceDropdown)}
            className="flex items-center justify-between gap-2 px-4 py-2 bg-transparent hover:bg-black/5 shadow-lg rounded-xl w-52 ml-8 "
          >
            <span>
              Max Price: <span className="font-semibold"> ${maxPrice}</span>
            </span>
            <Image
              src={arrow}
              alt="arrow"
              width={20}
              height={20}
              className={`transition-transform duration-200 ${showPriceDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {showPriceDropdown && (
            <div className="absolute mt-2 w-64 bg-[#fffefc] rounded-xl shadow-lg p-4 z-50">
              <label className="block mb-2 font-semibold text-sm">Max Price</label>
              <div className="flex flex-col gap-3">
                <div className="flex justify-end">
                  <span className="text-base font-medium">${maxPrice}</span>
                </div>
                <CustomRangeSlider
                  min={0}
                  max={5000}
                  step={120}
                  value={maxPrice}
                  onChange={(val) => setMaxPrice(val)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-end gap-x-3">
        <Button onClick={handleApply} iconAlt="Apply Filter" className="!py-3 !rounded-xl">
          Apply Filter
        </Button>
        <Button onClick={() => router.push('/search-results')} iconAlt="Reset Filter" className="!py-3 !rounded-xl">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FiltersBar;
