import React from 'react';

interface Airport {
    entityId: string;
    presentation: {
        title: string;
    };
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
                        className="mb-2 px-2 py-1 hover:bg-sky-100 cursor-pointer"
                        onClick={() => onSelectAirport(item.presentation.title)}
                    >
                        <p className="text-[#373d43]">{item.presentation.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AirportDropdown;
