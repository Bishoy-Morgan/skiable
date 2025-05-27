'use client';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import FlightCard from './FlightCard';
import { Flight } from './types';
import Image from 'next/image';
import plane from '@/public/icons/paper-plane.svg';
import Button from '@/src/components/ui/Button';
import loadArrow from '@/public/icons/load-arrow.svg';

const LIMIT = 10;

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [directFlights, setDirectFlights] = useState<Flight[]>([]);
  const [relatedFlights, setRelatedFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const tripType = searchParams.get('tripType') || 'Round trip';

  const fetchFlights = useCallback(async (skipParam = 0, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);

    const baseParams = new URLSearchParams(searchParams.toString());
    baseParams.set('limit', LIMIT.toString());
    baseParams.set('skip', skipParam.toString());

    const res = await fetch(`/api/v1/searchFlights?${baseParams.toString()}`);
    const data = await res.json();

    if (append) {
      setRelatedFlights(prev => [...prev, ...(data.relatedFlights || [])]);
    } else {
      setDirectFlights(data.directFlights || []);
      setRelatedFlights(data.relatedFlights || []);
    }

    setHasMore((data.relatedFlights?.length || 0) >= LIMIT);
    setLoading(false);
    setLoadingMore(false);
  }, [searchParams]);

  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    fetchFlights(0, false);
  }, [searchParams, fetchFlights]);

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

  const noResults = !loading && directFlights.length === 0 && relatedFlights.length === 0;

  return (
    <div className="w-full flex flex-col items-center pb-24">
      <div className="w-[90%] 2xl:w-4/5 max-w-7xl mx-auto flex items-center justify-center">
        <div className="w-full flex flex-col items-center">
          {loading ? (
            <span className="loader mt-32"></span>
          ) : noResults ? (
            <div className='mt-32 flex flex-col items-center'>
              <span className="main-para font-medium">No options matching your search</span>
              <span className="text-base text-black/50 mt-2">Try adjusting your search criteria.</span>
              <Image 
                src={plane}
                alt='Paper Flight'
                width={80}
                height={80}
                className="mt-12"
              />
            </div>
          ) : (
            <>
              {directFlights.length > 0 && (
                <div className="w-full flex flex-col items-start space-y-3 pt-12 pb-8">
                  <p className="main-para font-medium">Top departing flights</p>
                  <span className="text-sm text-black/70 max-w-3xl">
                    Ranked based on price and convenience. Prices include required taxes + fees for 1 adult. Optional charges and bag fees may apply.
                  </span>
                  <div className="w-full flex flex-col items-center space-y-4 pt-4">
                    {directFlights.map(flight => (
                      <FlightCard
                        key={flight._id}
                        flight={flight}
                        tripType={tripType}
                        formatDuration={formatDuration}
                      />
                    ))}
                  </div>
                </div>
              )}

              {relatedFlights.length > 0 && (
                <div className="w-full flex flex-col items-start space-y-3 pt-12 pb-8">
                  <p className="main-para font-medium">Other departing flights</p>
                  <div className="w-full flex flex-col items-center space-y-4 pt-4">
                    {relatedFlights.map(flight => (
                      <FlightCard
                        key={flight._id}
                        flight={flight}
                        tripType={tripType}
                        formatDuration={formatDuration}
                      />
                    ))}
                  </div>
                </div>
              )}

              {hasMore && (
                // <button
                //   onClick={loadMore}
                //   disabled={loadingMore}
                //   className="mt-8 px-6 py-3 bg-[#F5F3ED] text-black font-semibold rounded-xl shadow-lg"
                // >
                //   {loadingMore ? 'Loading...' : 'Load More'}
                // </button>
                <Button
                  onClick={loadMore}
                  iconSrc={loadArrow}
                  iconAlt='Load More Flights'
                  disabled={loadingMore}
                  className='shadow-lg'
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
