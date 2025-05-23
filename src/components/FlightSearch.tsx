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
  const [originFlight, setOriginFlight] = useState<{ originIATA: string }>();
  const [destinationFlight, setDestinationFlight] = useState<{ destinationIATA: string}>();
  const [activeField, setActiveField] = useState<'from' | 'to' | null>(null);
  const [range, setRange] = useState<{ startDate: Date; endDate: Date } | null>(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

useEffect(() => {
  if (!query) return;

  const fetchAirports = async () => {
    try {
      const res = await fetch(`/api/v1/airports?query=${encodeURIComponent(query)}`);
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
      originIATA: airport.IATA || '',
    });
    setWhereFrom(`${airport.Name}, ${airport.City} (${airport.IATA})`);
  } else if (activeField === 'to') {
    setDestinationFlight({
      destinationIATA: airport.IATA || '',
    });
    setWhereTo(`${airport.Name}, ${airport.City} (${airport.IATA})`);
  }
  setQuery('');
  setAirports([]);
};

const handleSearch = () => {
  if (!originFlight || !destinationFlight || !range) {
    setError('Please fill in all required fields.');
    return;
  }

  const startDateStr = new Date(range.startDate.setHours(0, 0, 0, 0)).toISOString(); 
  const endDateStr = new Date(range.endDate.setHours(23, 59, 59, 999)).toISOString();

  const queryParams = new URLSearchParams({
    originIATA: originFlight.originIATA,
    destinationIATA: destinationFlight.destinationIATA,
    startDate: startDateStr,
    endDate: endDateStr,
  });

  // Add tripType based on your logic
  if (tripType === 'Round trip') {
    queryParams.append('tripType', 'round');
  } else if (tripType === 'One way') {
    queryParams.append('tripType', 'oneway');
  } else if (tripType === 'Multi-city') {
    queryParams.append('tripType', 'multicity');
  }

  const limit = 10; 
  const skip = 0;  

  queryParams.append('limit', limit.toString());
  queryParams.append('skip', skip.toString());

  router.push(`/search-result?${queryParams.toString()}`);
}



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
      <div className="w-full flex items-center gap-x-4 my-6  ">
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
          className="white-btn flex items-center gap-x-4 "
        >
          <Image src={explore} alt='Explore' width={30} height={30} className='bg-black rounded-lg p-1'/>
          <span>
            Explore
          </span>
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;
