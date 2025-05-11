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
        <div className="w-full pb-16 flex flex-col items-center justify-center -translate-y-16 ">
            <div className="blue-container rounded-2xl shadow-md">
                <TabSelector activeTab={activeTab} onSelect={setActiveTab} />
                <div className="w-full p-6 ">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default SearchContainer;

