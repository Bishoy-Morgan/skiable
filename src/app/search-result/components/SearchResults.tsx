import { useFlightSearch } from '@/src/hooks/useFlightSearch';
// import { useSearchParams } from 'next/navigation';
import FlightCard from './FlightCard';
import Button from '@/src/components/ui/Button';
import loadArrow from '@/public/icons/load-arrow.svg';
import Image from 'next/image';
import plane from '@/public/icons/paper-plane.svg';

const SearchResults = () => {
  const {
    directFlights,
    relatedFlights,
    loading,
    loadingMore,
    hasMore,
    loadMore,
  } = useFlightSearch();

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    return `${hours} hr ${remaining} min`;
  };

  // const searchParams = useSearchParams();
  // const tripType = searchParams.get('tripType') || 'round';
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
              <Image src={plane} alt='Paper Flight' width={80} height={80} className="mt-12" />
            </div>
          ) : (
            <>
              {directFlights.length > 0 && (
                <div className="w-full flex flex-col items-start space-y-3 pt-12 pb-8">
                  <p className="main-para font-medium">Top departing flights</p>
                  <span className="text-sm text-black/70 max-w-3xl">
                    Ranked based on price and convenience. Prices include required taxes + fees for 1 adult.
                  </span>
                  <div className="w-full flex flex-col items-center space-y-4 pt-4">
                    {directFlights.map(flight => (
                      <FlightCard 
                      // tripType={tripType}
                      key={flight._id} 
                      flight={flight} 
                      formatDuration={formatDuration} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {relatedFlights.length > 0 && (
                <div className="w-full flex flex-col items-start space-y-3 pt-12 pb-8">
                  <p className="main-para font-medium">Other departing flights</p>
                  <span className='text-sm text-black/70 max-w-4xl'>
                    Prices include required taxes + fees for 1 adult. Optional charges and bag fees may apply. Passenger assistance info.
                  </span>
                  <div className="w-full flex flex-col items-center space-y-4 pt-4">
                    {relatedFlights.map(flight => (
                      <FlightCard
                      // tripType={tripType} 
                      key={flight._id} 
                      flight={flight} 
                      formatDuration={formatDuration} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {hasMore && (
                <Button onClick={loadMore} iconSrc={loadArrow} iconAlt="Load More Flights" disabled={loadingMore} className='shadow-lg'>
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

