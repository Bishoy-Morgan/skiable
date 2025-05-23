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
        <div className="relative w-full pt-40 pb-20 flex flex-col items-center justify-center  ">
            <div className="w-[90%] 2xl:w-4/5 rounded-xl max-w-7xl mx-auto ">
                <TabSelector activeTab={activeTab} onSelect={setActiveTab} />
                <div className="w-full p-6 rounded-b-xl bg-[#F5F3ED]  ">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default SearchContainer;

