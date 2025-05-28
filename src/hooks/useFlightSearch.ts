// hooks/useFlightSearch.ts
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Flight } from '@/src/types/flight';

const LIMIT = 10;

export const useFlightSearch = () => {
    const searchParams = useSearchParams();
    const [directFlights, setDirectFlights] = useState<Flight[]>([]);
    const [relatedFlights, setRelatedFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);

    const fetchFlights = useCallback(async (skipVal = 0, append = false) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', LIMIT.toString());
        params.set('skip', skipVal.toString());

        if (append) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        const res = await fetch(`/api/v1/searchFlights?${params.toString()}`);
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
        const nextSkip = skip + LIMIT;
        setSkip(nextSkip);
        fetchFlights(nextSkip, true);
    };

    return {
        directFlights,
        relatedFlights,
        loading,
        loadingMore,
        hasMore,
        loadMore,
    };
};
