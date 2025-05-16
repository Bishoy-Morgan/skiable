'use client';

import React, { useEffect, useState } from 'react';
import Dropdown from './ui/Dropdown';
import TravellerDropdown from './ui/TravellerDropdown';
import Input from './ui/Input';
import AirportDropdown from './ui/AirportDropdown';
import { Airport } from './ui/AirportDropdown';
import DateRangePicker from './ui/DateRangePicker';
import Image from 'next/image';
import arrow from '@/public/icons/arrow.svg'
import explore from '@/public/icons/explore.svg'
import { useRouter } from 'next/navigation';


const FlightSearch = () => {
  const router = useRouter();
  const [travellerCounts, setTravellerCounts] = useState({
    adults: 1,
    children: 0,
    infantsOnSeat: 0,
    infantsOnLap: 0,
  });

  const [tripType, setTripType] = useState('Round trip');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [airports, setAirports] = useState<Airport[]>([]);
  const [whereFrom, setWhereFrom] = useState<string>('');
  const [whereTo, setWhereTo] = useState<string>('');
  const [originFlight, setOriginFlight] = useState<{ originSkyId: string; originEntityId: string }>();
  const [destinationFlight, setDestinationFlight] = useState<{ destinationSkyId: string; destinationEntityId: string }>();
  const [activeField, setActiveField] = useState<'from' | 'to' | null>(null);
  const [range, setRange] = useState<{ startDate: Date; endDate: Date } | null>(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

useEffect(() => {
  if (!query) return;

  const fetchAirports = async () => {
    try {
      const res = await fetch(`/api/airports?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      setAirports(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchAirports();
}, [query]);


const handleWhereFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setWhereFrom(value);
  setQuery(value);
  setActiveField('from');
};

const handleWhereTo = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setWhereTo(value);
  setQuery(value);
  setActiveField('to');
};


const handleAirportSelect = (airport: Airport) => {
  if (activeField === 'from') {
    setOriginFlight({
      originSkyId: airport.gps_code || '',
      originEntityId: airport.iata_code || '',
    });
    setWhereFrom(`${airport.name}, ${airport.municipality} (${airport.iata_code})`);
  } else if (activeField === 'to') {
    setDestinationFlight({
      destinationSkyId: airport.gps_code || '',
      destinationEntityId: airport.iata_code || '',
    });
    setWhereTo(`${airport.name}, ${airport.municipality} (${airport.iata_code})`);
  }
  setQuery('');
  setAirports([]);
};


const handleSearch = () => {
  if (!originFlight || !destinationFlight || !range) {
    setError('Please fill in all required fields.');
    return;
  }

  const queryParams = new URLSearchParams({
    originSkyId: originFlight.originSkyId,
    destinationSkyId: destinationFlight.destinationSkyId,
    originEntityId: originFlight.originEntityId.toString(),
    destinationEntityId: destinationFlight.destinationEntityId.toString(),
    cabinClass: cabinClass.toLowerCase(),
    adults: travellerCounts.adults.toString(),
    sortBy: 'best',
    currency: 'USD',
    market: 'en-US',
    countryCode: 'US',
    startDate: range.startDate.toISOString().split('T')[0],
    endDate: range.endDate.toISOString().split('T')[0],
  });

  router.push(`/search-result?${queryParams.toString()}`);
};



  return (
    <div className="p-6 space-y-4">
      <div className="w-full flex items-center justify-between">
        <div className='w-1/2 flex items-center space-x-2'>
          <Dropdown
          options={['Round trip', 'One way', 'Multi-city']}
          selected={tripType}
          onChange={setTripType}
          />
          <TravellerDropdown
            travellerCounts={travellerCounts}
            setTravellerCounts={setTravellerCounts}
          />
          <Dropdown
            options={['Economy', 'Premium economy', 'Business', 'First']}
            selected={cabinClass}
            onChange={setCabinClass}
            widthClass="w-52"
          />
        </div>
        <div className='w-1/2 flex items-center justify-end'>
          {range && (
            <div className="flex items-center space-x-1.5 text-sm text-[#050801]">
                <span className='text-[#050801]'>
                  You selected:
                </span>
                <span className='ml-2'>
                  {range.startDate.toDateString()} 
                </span>
                <Image
                src={arrow}
                alt="arrow"
                width={22}
                height={22}
                />
                <span>
                  {range.endDate.toDateString()}
                </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex items-center gap-x-4  ">
        {/* Where from? Airports or city  */}
        <div className='relative w-1/3 flex flex-col space-y-4  '>
          <Input
            name="whereFrom"
            placeholder="Airport or City"
            value={whereFrom}
            onChange={handleWhereFrom}
            error={error}
            className='relative'
          />
          {activeField === 'from' && query && airports.length > 0 && (
            <AirportDropdown
              airports={airports}
              onSelectAirport={handleAirportSelect}
            />
          )}
        </div>
        {/* Where to? Airports or city  */}
        <div className='relative w-1/3 flex flex-col space-y-4 '>
          <Input
            name="whereTo"
            placeholder="Where to?"
            value={whereTo}
            onChange={handleWhereTo}
            error={error}
            className='relative'
          />
          {activeField === 'to' && query && airports.length > 0 && (
            <AirportDropdown
              airports={airports}
              onSelectAirport={handleAirportSelect}
            />
          )}
        </div>
        <div className='w-1/3 flex flex-col space-y-4 '>
          <DateRangePicker onSelectRange={(r) => setRange(r)} />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            // if (!whereFrom || !whereTo || !range) {
            //   setError('Please fill in all required fields.');
            //   return;
            // }
            setError('');
            handleSearch();
          }}
          className="flex items-center gap-2 px-8 py-3 bg-[#050801] text-[#FDC830] rounded-xs font-bold text-lg "
        >
          <Image src={explore} alt='Explore' width={24} height={24} />
          <span>
            Explore
          </span>
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;
