'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import arrow from '@/public/icons/arrow.svg';
import logo from '@/public/images/airlines logos/Qatar.png';
import { useCallback } from 'react';

interface Flight {
  _id: string;
  id: number;
  origin_code: string;
  destination_code: string;
  origin_name: string;
  origin_city: string;
  origin_country: string;
  destination_country: string;
  destination_city: string;
  destination_name: string;
  departure: string;
  arrival: string;
  price_raw: number;
  carrier_name: string;
  stop_count: number;
  flight_number: number;
  duration_minutes: number;
}

const LIMIT = 10;

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const tripType = searchParams.get('tripType') || 'Round trip';

  // Fetch flights function with skip & limit


  const fetchFlights = useCallback(async (skipParam = 0, append = false) => {
    setLoadingMore(true);
    const baseParams = new URLSearchParams(searchParams.toString());
    baseParams.set('limit', LIMIT.toString());
    baseParams.set('skip', skipParam.toString());

    const url = `/api/v1/searchFlights?${baseParams.toString()}`;
    const res = await fetch(url);
    const data = await res.json();

    const newFlights = [...(data.directFlights || []), ...(data.relatedFlights || [])];

    if (append) {
      setFlights((prev) => [...prev, ...newFlights]);
    } else {
      setFlights(newFlights);
    }

    setHasMore(newFlights.length >= LIMIT * 2);
    setLoading(false);
    setLoadingMore(false);
  }, [searchParams]);

  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    fetchFlights(0, false);
  }, [searchParams, fetchFlights]);


  // Initial fetch on search param change
  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    fetchFlights(0, false);
  }, [searchParams]);

  // Load more handler
  const loadMore = () => {
    const newSkip = skip + LIMIT;
    setSkip(newSkip);
    fetchFlights(newSkip, true);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
  };

  return (
    <div className="flex flex-col items-center py-16 px-4">
      <h2 className="text-5xl font-bold mb-16">Flights</h2>
      <div className="w-full 2xl:w-4/5 flex items-center justify-center ">
        <div className="w-4/5 flex flex-col items-center">
          {loading ? (
            <p className="text-xl">Flights loading..</p>
          ) : flights.length === 0 ? (
            <p>No flights found.</p>
          ) : (
            <>
              <div className="w-full flex flex-col items-center space-y-4 ">
                {flights.map((flight) => (
                  <FlightCard key={flight._id} flight={flight} tripType={tripType} formatDuration={formatDuration} />
                ))}
              </div>

              {hasMore && (
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="mt-8 px-6 py-3 bg-[#FDC830] text-[#050801] font-semibold rounded shadow hover:shadow-lg transition"
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const FlightCard = ({
  flight,
  tripType,
  formatDuration,
}: {
  flight: Flight;
  tripType: string;
  formatDuration: (minutes: number) => string;
}) => {
  const [toggleDetails, setToggleDetails] = useState<boolean>(true);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full p-6 flex justify-between items-center shadow shadow-[#FDC830] text-[#050801] bg-[#FDC830] rounded-xs">
        <div className="w-1/3 flex space-x-8 ">
          <Image src={logo} alt="Logo" width={50} height={50} quality={100} className="rounded-full" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold inline-block">
              {new Date(flight.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} —{' '}
              {new Date(flight.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </span>
            <span className="text-sm text-[#050801]/90">{flight.carrier_name}</span>
          </div>
        </div>

        <div className="w-[15%] flex flex-col ">
          <span className="text-lg font-semibold inline-block">{formatDuration(flight.duration_minutes)}</span>
          <span className="text-sm text-[#050801]/90">
            {flight.origin_code}-{flight.destination_code}
          </span>
        </div>

        <div className="w-[15%] flex flex-col ">
          <span className="text-lg font-semibold inline-block">{flight.stop_count} stop</span>
          <span className="text-sm text-[#050801]/90">{tripType}</span>
        </div>

        <div className="w-[10%] flex flex-col items-end ">
          <span className="text-xl font-semibold inline-block px-3 py-2 bg-[#050801] text-[#FDC830] rounded-xs shadow shadow-[#050801]">
            {flight.price_raw.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
        </div>

        <button onClick={() => setToggleDetails(!toggleDetails)} className="w-[5%] flex justify-center items-center">
          <Image
            src={arrow}
            alt="Arrow"
            width={30}
            height={30}
            className={`transform transition-transform duration-300 ${toggleDetails ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </div>
      {toggleDetails && (
        <div className="w-full px-4 py-8 flex flex-col items-center text-[#FDC830] rounded-b-xs shadow shadow-[#FDC830]">
          <div className="w-full flex justify-between items-start">
            <div className="w-2/3 flex flex-col pl-[9%] border">
              <p className="text-lg mb-1 font-medium">
                {new Date(flight.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} -{' '}
                {flight.origin_name} ({flight.origin_code})
              </p>
              <p className="text-sm font-light text-[#FDC830]/90">
                {flight.origin_city}, {flight.origin_country}
              </p>
              {/* Additional details here */}
            </div>
            <div className="w-1/4 flex flex-col items-start text-xs text-[#FDC830]/90 space-y-2 border ">
              <p>Average legroom (31 in)</p>
              <p>In-seat power & USB outlets</p>
              <p>On-demand video</p>
              <p>Emissions estimate: 243 kg CO2e</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
