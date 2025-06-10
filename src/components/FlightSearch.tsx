'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Dropdown from './ui/Dropdown';
import TravellerDropdown from './ui/TravellerDropdown';
import Input from './ui/Input';
import AirportDropdown, { Airport } from './ui/AirportDropdown';
import DateRangePicker from './ui/DateRangePicker';
import Image from 'next/image';
import arrow from '@/public/icons/arrow.svg';
import explore from '@/public/icons/explore.svg';
import { useRouter } from 'next/navigation';
import Button from './ui/Button';
import { FlightSearchParams } from '@/src/types/FlightSearchParams';

type FlightSearchProps = {
  searchAirports: (query: string) => Promise<Airport[]>;
};

const FlightSearch: React.FC<FlightSearchProps> = ({ searchAirports }) => {
  const router = useRouter();

  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    travellerCounts: {
      adults: 1,
      children: 0,
      infantsOnSeat: 0,
      infantsOnLap: 0,
    },
    tripType: 'Round trip',
    cabinClass: 'Economy',
    whereFrom: '',
    whereTo: '',
    originFlight: null,
    destinationFlight: null,
    activeField: null,
    range: null,
    error: '',
  });

  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    travellerCounts,
    tripType,
    cabinClass,
    whereFrom,
    whereTo,
    activeField,
    range,
    error,
  } = searchParams;

  // Debounced search with abort controller for cleanup
  const debouncedSearch = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setAirports([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchAirports(query);
      setAirports(results);
    } catch (error) {
      console.error('Search error:', error);
      setAirports([]);
    } finally {
      setLoading(false);
    }
  }, [searchAirports]);

  // Debounce search requests
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activeField === 'from') {
        debouncedSearch(fromQuery);
      } else if (activeField === 'to') {
        debouncedSearch(toQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fromQuery, toQuery, activeField, debouncedSearch]);

  const handleWhereFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => ({
      ...prev,
      whereFrom: value,
      activeField: 'from',
      originFlight: null,
    }));
    setFromQuery(value);
  };

  const handleWhereTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => ({
      ...prev,
      whereTo: value,
      activeField: 'to',
      destinationFlight: null,
    }));
    setToQuery(value);
  };

  const handleAirportSelect = (airport: Airport) => {
    if (activeField === 'from') {
      setSearchParams((prev) => ({
        ...prev,
        originFlight: { originIATA: airport.IATA || '' },
        whereFrom: `${airport.Name}, ${airport.City} (${airport.IATA})`,
        activeField: null,
      }));
      setFromQuery('');
    } else if (activeField === 'to') {
      setSearchParams((prev) => ({
        ...prev,
        destinationFlight: { destinationIATA: airport.IATA || '' },
        whereTo: `${airport.Name}, ${airport.City} (${airport.IATA})`,
        activeField: null,
      }));
      setToQuery('');
    }
    setAirports([]);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setSearchParams((prev) => ({ ...prev, activeField: null }));
      setAirports([]);
    }, 200);
  };

  const handleSearch = () => {
    if (!searchParams.originFlight || !searchParams.destinationFlight || !searchParams.range) {
      setSearchParams((prev) => ({
        ...prev,
        error: 'Please fill in all required fields.',
      }));
      return;
    }

    const { originIATA } = searchParams.originFlight;
    const { destinationIATA } = searchParams.destinationFlight;
    const { adults, children, infantsOnSeat, infantsOnLap } = searchParams.travellerCounts;

    const startDateStr = new Date(searchParams.range.startDate).toISOString().split('T')[0];
    const endDateStr = new Date(searchParams.range.endDate).toISOString().split('T')[0];

    const queryParams = new URLSearchParams({
      originIATA,
      destinationIATA,
      whereFrom: searchParams.whereFrom,
      whereTo: searchParams.whereTo,
      startDate: startDateStr,
      endDate: endDateStr,
      adults: adults.toString(),
      children: children.toString(),
      infantsOnSeat: infantsOnSeat.toString(),
      infantsOnLap: infantsOnLap.toString(),
      tripType: tripType.toLowerCase().replace(/\s/g, ''),
      limit: '10',
      skip: '0',
    });

    router.push(`/search-result?${queryParams.toString()}`);
  };

  return (
    <div className="px-2 py-6 lg:px-6 space-y-4">
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="w-1/2 flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-2">
          <Dropdown
            options={['Round trip', 'One way', 'Multi-city']}
            selected={tripType}
            onChange={(val) => setSearchParams((prev) => ({ ...prev, tripType: val }))}
          />
          <TravellerDropdown
            travellerCounts={travellerCounts}
            setTravellerCounts={(val) => setSearchParams((prev) => ({ ...prev, travellerCounts: val }))}
          />
          <Dropdown
            options={['Economy', 'Premium economy', 'Business', 'First']}
            selected={cabinClass}
            onChange={(val) => setSearchParams((prev) => ({ ...prev, cabinClass: val }))}
            widthClass="w-52"
          />
        </div>
        <div className="w-1/2 flex items-center justify-end">
          {range && (
            <div className="flex items-center space-x-1.5 text-sm text-[#050801]">
              <span>You selected:</span>
              <span className="ml-2">{range.startDate.toDateString()}</span>
              <Image src={arrow} alt="arrow" width={22} height={22} />
              <span>{range.endDate.toDateString()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center gap-y-6 lg:gap-y-0 lg:gap-x-4 my-6">
        <div className="relative w-full lg:w-1/3 flex flex-col space-y-4">
          <Input
            name="whereFrom"
            placeholder="Airport or City"
            value={whereFrom}
            onChange={handleWhereFrom}
            onBlur={handleInputBlur}
            error={error}
          />
          {activeField === 'from' && (
            <>
              {loading && (
                <div className="absolute top-full left-0 bg-white border rounded shadow-lg p-3 text-sm text-gray-500 z-10">
                  Searching airports...
                </div>
              )}
              {!loading && airports.length > 0 && (
                <AirportDropdown airports={airports} onSelectAirport={handleAirportSelect} />
              )}
            </>
          )}
        </div>

        <div className="relative w-full lg:w-1/3 flex flex-col space-y-4">
          <Input
            name="whereTo"
            placeholder="Where to?"
            value={whereTo}
            onChange={handleWhereTo}
            onBlur={handleInputBlur}
            error={error}
          />
          {activeField === 'to' && (
            <>
              {loading && (
                <div className="absolute top-full left-0 bg-white border rounded shadow-lg p-3 text-sm text-gray-500 z-10">
                  Searching airports...
                </div>
              )}
              {!loading && airports.length > 0 && (
                <AirportDropdown airports={airports} onSelectAirport={handleAirportSelect} />
              )}
            </>
          )}
        </div>

        <div className="w-full lg:w-1/3 flex flex-col space-y-4">
          <DateRangePicker onSelectRange={(r) => setSearchParams((prev) => ({ ...prev, range: r }))} />
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Button iconSrc={explore} iconAlt="Explore" onClick={handleSearch}>
          Explore
        </Button>
      </div>
    </div>
  );
};

export default FlightSearch;