'use client';

import React, { useEffect, useState } from 'react';
import Dropdown from './ui/Dropdown';
import TravellerDropdown from './ui/TravellerDropdown';
import Input from './ui/Input';
import AirportDropdown from './ui/AirportDropdown';


type Airport = {
  entityId: string;
  presentation: {
    title: string;
  };
};

const FlightSearch = () => {
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
  const [activeField, setActiveField] = useState<'from' | 'to' | null>(null);
  // const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query.trim()) return; // avoid empty queries

    const fetchData = async () => {
      const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setAirports(result.data);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchData();
  }, [query]);

const handleWhereFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setWhereFrom(value);
  setQuery(value);
  setActiveField('from');
  setError('');
};

const handleWhereTo = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setWhereTo(value);
  setQuery(value);
  setActiveField('to');
  setError('');
};

const handleAirportSelect = (airport: string) => {
  if (activeField === 'from') {
    setWhereFrom(airport);
  } else if (activeField === 'to') {
    setWhereTo(airport);
  }
  setQuery('');
  setAirports([]);
};


  return (
    <div className="p-6 space-y-4">
      <div className="w-full flex items-center space-x-2 ">
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
      <div className="w-full flex items-center gap-x-4 ">
        {/* Where from? Airports or city  */}
        <div className='relative w-1/3 flex flex-col space-y-4 '>
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
          {/* <Calendar dateRange={dateRange} setDateRange={setDateRange} /> */}
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
