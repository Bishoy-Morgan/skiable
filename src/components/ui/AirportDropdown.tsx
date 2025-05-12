import Image from 'next/image';
import React from 'react';
import plane from '@/public/icons/plane.svg'
import location from '@/public/icons/location.svg'

export interface Airport {
    entityId: string;
    presentation: {
        title: string;
        subtitle: string;
    };
    navigation: {
        relevantFlightParams: {
            skyId: string;
        },
        relevantHotelParams: {
            localizedName: string;
        }
    }
}

interface AirportDropdownProps {
    airports: Airport[];
    onSelectAirport: (airport: string) => void;
}

const AirportDropdown: React.FC<AirportDropdownProps> = ({ airports, onSelectAirport }) => {
    if (!airports.length) return null;

    return (
        <div className="absolute top-14 left-0 z-10 w-full flex flex-col space-y-2 bg-[#f5ffff] rounded-lg max-w-sm">
            <div className="w-full p-2 shadow-2xl rounded-lg max-h-60 overflow-y-scroll">
                {airports.map((item) => (
                    <div
                        key={item.entityId}
                        className="mb-2 px-2 py-1 cursor-pointer"
                        onClick={() => onSelectAirport(item?.presentation?.title)}
                    >
                        <div className='w-full flex flex-col border-b border-sky-100 py-1'>
                            <div className="w-full text-[#373d43] flex items-center space-x-1.5">
                                <Image 
                                src={location}
                                alt='Plane'
                                width={24}
                                height={24}
                                />
                                <div className='flex flex-col space-y-0.5 '>
                                    <span className='text-sm text-[#373d43]'>
                                        {item?.navigation?.relevantHotelParams?.localizedName}
                                    </span>
                                    <span className='text-xs text-[#373d43]/50'>
                                        City in {item?.presentation?.subtitle}
                                    </span>
                                </div>
                            </div>
                            <div className="w-full flex items-center space-x-1.5 py-1 pl-2 my-1 hover:bg-sky-100 rounded-lg ">
                                <Image 
                                src={plane}
                                alt='Plane'
                                width={33}
                                height={33}
                                />
                                <div className='flex flex-col space-y-0.5 '>
                                    <span className='text-[#373d43]'>
                                    {item?.presentation?.title}
                                    </span>
                                    <span className='text-xs text-[#373d43]/50'>
                                        {item?.navigation?.relevantFlightParams?.skyId}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AirportDropdown;
