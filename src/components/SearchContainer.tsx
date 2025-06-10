'use client'

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion'; // Add this import
import TabSelector from './ui/TabSelector';
import FlightSearch from './FlightSearch';
import HotelSearch from './HotelSearch';
import CarSearch from './CarSearch';
import { Airport } from './ui/AirportDropdown';

const SearchContainer = () => {
    const [activeTab, setActiveTab] = useState<'flight' | 'hotels' | 'car'>('flight');
    const [searchCache, setSearchCache] = useState<Record<string, Airport[]>>({});
    
    const searchAirports = useCallback(async (query: string): Promise<Airport[]> => {
        if (!query || query.length < 2) return [];
        
        const cacheKey = query.toLowerCase();
        
        if (searchCache[cacheKey]) {
            return searchCache[cacheKey];
        }
        
        try {
            const res = await fetch(`/api/v1/airports?query=${encodeURIComponent(query)}&limit=8`);
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            
            const data = await res.json();
            
            // Cache the results
            setSearchCache(prev => ({
                ...prev,
                [cacheKey]: data,
                // Keep cache size manageable (last 20 searches)
                ...Object.keys(prev).length > 20 && {
                    [Object.keys(prev)[0]]: undefined
                }
            }));
            
            return data;
        } catch (err) {
            console.error('Airport search error:', err);
            return [];
        }
    }, [searchCache]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'flight':
                return <FlightSearch searchAirports={searchAirports} />;
            case 'hotels':
                return <HotelSearch />;
            case 'car':
                return <CarSearch />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            className="relative w-full pt-10 lg:pt-40 pb-20 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <div className="w-[90%] 2xl:w-4/5 rounded-xl max-w-7xl mx-auto">
                <TabSelector activeTab={activeTab} onSelect={setActiveTab} />
                <div className="w-full p-6 rounded-b-xl bg-[#F5F3ED]">
                    {renderTabContent()}
                </div>
            </div>
        </motion.div>
    );
};

export default SearchContainer;