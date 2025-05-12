// app/search/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchResults = () => {
    const params = useSearchParams();
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const fetchFlights = async () => {
        const url = 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightEverywhere?originEntityId=95673320&cabinClass=economy&journeyType=one_way&currency=USD';
        // const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?${params.toString()}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
                'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log('Flights result:', data);
            setSearchResult(data)
            // Set state here to display flights
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    fetchFlights();
}, [params]);

    return (
        <div>
            <h1 className='text-center text-7xl mt-20 font-extrabold'>Flight Search Results</h1>
                {searchResult.map((item, index) => (
                    <div key={index}>
                        {item}
                    </div>
                ))}
        </div>
    );
};

export default SearchResults;
