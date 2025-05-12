import React, { useEffect, useState } from 'react';

const HotelSearch = () => {
  const [data, setData] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://sky-scrapper.p.rapidapi.com/api/v1/getConfig';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        setData(result)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [])
  return (
    <div className="p-6  rounded-lg shadow text-black">
      <h2 className="text-xl font-semibold mb-4">Search Hotels</h2>
      {data}
      <p>Hotel search form goes here.</p>
    </div>
  );
};

export default HotelSearch;
