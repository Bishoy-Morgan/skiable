import Image from 'next/image';
import React from 'react';
import plane from '@/public/icons/plane.svg'
import country from '@/public/icons/country.svg'

export interface Airport {
    AirportID: number;
    Name: string;
    City: number;
    Country: number;  
    IATA: string;
    ICAO: string;
    TzDatabaseTimeZone: string;
}

interface AirportDropdownProps {
    airports: Airport[];
    onSelectAirport: (airport: Airport) => void;
}

const AirportDropdown: React.FC<AirportDropdownProps> = ({ airports, onSelectAirport }) => {
    if (!airports.length) return null;

    return (
        <div className='w-full absolute top-16 left-0 bg-[#fffefc] rounded-lg z-10 shadow-lg'>
            <div className='px-4 py-2 flex flex-col max-h-60 overflow-y-auto'>
                {airports.map((item) => (
                    <div 
                    key={item?.AirportID}
                    onClick={() => onSelectAirport(item)}
                    className='w-full flex flex-col bg-transparent border-b border-black/20 py-2'>
                        <div className="w-full p-2 flex items-center space-x-4">
                            <Image 
                            src={country}
                            alt='Country'
                            width={20}
                            height={20}
                            />
                            <div className='flex flex-col space-y-0.5 '>
                                <span className='text-sm text-black font-medium'>
                                    {item?.City}
                                </span>
                                <span className='text-xs text-black/50'>
                                    City in {item?.Country}
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex items-center space-x-3 py-2 pl-3 my-1 hover:bg-[#F5F3ED] rounded-xl cursor-pointer ">
                            <Image 
                            src={plane}
                            alt='Plane'
                            width={32}
                            height={32}
                            />
                            <div className='flex flex-col space-y-0.5 '>
                                <span className='text-black font-semibold'>
                                    {item?.Name} ({item?.IATA})
                                </span>
                                <span className='text-xs text-black/50 '>
                                    {item?.TzDatabaseTimeZone} ({item?.ICAO})
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AirportDropdown;
