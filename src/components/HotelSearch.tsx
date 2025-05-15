import React, { useEffect, useState } from 'react';

type airportProps = {
  id: number;
  name: string;
  iso_country: string;
}

const HotelSearch = () => {
  const [airports, setAirports] = useState<airportProps>([]);

  useEffect(() => {
    fetch("/api/airports")
      .then((res) => res.json())
      .then((data) => setAirports(data));
  }, []);

  return (
    <div className="p-6  rounded-lg shadow text-black">
      <h2 className="text-xl font-semibold mb-4">Search Hotels</h2>
      <ul>
        {airports.map((airport: airportProps) => (
          <li key={airport.id}>
            {airport.name} ({airport.iso_country})
          </li>
        ))}
      </ul>
      <p>Hotel search form goes here.</p>
    </div>
  );
};

export default HotelSearch;
