import Image from 'next/image';
import React from 'react';
import plane from '@/public/icons/plane.svg'
import city from '@/public/icons/city.svg'

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
        <div className='w-full absolute top-16 left-0 bg-[#fffdf5] rounded-xs z-10'>
            <div className='px-4 py-2 flex flex-col max-h-60 overflow-y-auto'>
                {airports.map((item) => (
                    <div 
                    key={item?.AirportID}
                    onClick={() => onSelectAirport(item)}
                    className='w-full flex flex-col bg-transparent border-b border-[#050801]/20 py-2'>
                        <div className="w-full p-2 flex items-center space-x-4">
                            <Image 
                            src={city}
                            alt='City'
                            width={20}
                            height={20}
                            />
                            <div className='flex flex-col space-y-0.5 '>
                                <span className='text-sm text-[#050801] font-medium'>
                                    {item?.City}
                                </span>
                                <span className='text-xs text-[#050801]/50'>
                                    City in {item?.Country}
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex items-center space-x-3 py-2 pl-3 my-1 hover:bg-[#FDC830]/20 rounded-xs cursor-pointer ">
                            <Image 
                            src={plane}
                            alt='Plane'
                            width={32}
                            height={32}
                            />
                            <div className='flex flex-col space-y-0.5 '>
                                <span className='text-[#050801] font-semibold'>
                                    {item?.Name} ({item?.IATA})
                                </span>
                                <span className='text-xs text-[#050801]/50 '>
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
