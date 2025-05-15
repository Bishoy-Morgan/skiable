'use client'

import React, { useState } from 'react';
import TabSelector from './ui/TabSelector';
import FlightSearch from './FlightSearch';
import HotelSearch from './HotelSearch';
import CarSearch from './CarSearch';


const SearchContainer = () => {
    const [activeTab, setActiveTab] = useState<'flight' | 'hotels' | 'car'>('flight');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'flight':
                return <FlightSearch />;
            case 'hotels':
                return <HotelSearch />;
            case 'car':
                return <CarSearch />;
            default:
                return null;
        }
    };

    return (
        <div className="relative w-full pb-16 flex flex-col items-center justify-center -translate-y-14  ">
            <div className="w-[90%] 2xl:w-4/5 rounded-xs bg-transparent ">
                <TabSelector activeTab={activeTab} onSelect={setActiveTab} />
                <div className="w-full p-6 rounded-b-lg bg-[#FDC830] ">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default SearchContainer;

