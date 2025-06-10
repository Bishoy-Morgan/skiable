// 'use client';

// import React, { useEffect, useRef } from 'react';

// const center = { lat: 51.505, lng: -0.09 };

// const MapSection = () => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Only run if window.google is available
//     if (window.google && mapRef.current) {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center,
//         zoom: 3,
//       });

//       new window.google.maps.Marker({
//         position: center,
//         map,
//         title: 'Example Airport - London',
//       });
//     }
//   }, []);

//   // Load Google Maps script if not already loaded
//   useEffect(() => {
//     if (window.google) return;
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
//     script.async = true;
//     script.onload = () => {};
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <section className='relative w-full flex flex-col items-center lg:my-20 bg-transparent '>
//       <div className='w-[90%] 2xl:w-4/5 rounded-xl max-w-7xl'>
//         <h2 className='mb-10 max-w-xl'>
//           Find cheap flights from United States to anywhere
//         </h2>
//         <p className='para-14 mb-10 max-w-2xl !font-medium '>
//           Search, compare, and book flights from anywhere in the U.S. to any destination worldwide instantly access hundreds of airlines, flexible options, and the lowest available prices, all in one seamless experience.
//         </p>
//         <div
//           ref={mapRef}
//           style={{ height: '300px', width: '100%', borderRadius: '.5rem' }}
//           className="shadow-lg"
//         />
//       </div>
//     </section>
//   );
// };

// export default MapSection;

import React from 'react';
import Image from 'next/image';
import maps from '@/public/images/google-maps.jpg'

const googleMapsUrl =
  'https://www.google.com/maps/@51.505,-0.09,6z';

const MapSection = () => {
  return (
    <section className='relative w-full flex flex-col items-center lg:my-20 bg-transparent max-w-[1920px] mx-auto '>
      <div className='w-[90%] rounded-xl '>
        <h2 className='mb-10 max-w-xl'>
          Find cheap flights from United States to anywhere
        </h2>
        <p className='para-14 mb-10 max-w-2xl !font-medium '>
          Search, compare, and book flights from anywhere in the U.S. to any destination worldwide instantly access hundreds of airlines, flexible options, and the lowest available prices, all in one seamless experience.
        </p>
        <div  className='relative group overflow-hidden rounded-xl cursor-pointer '>
          <div className='absolute top-0 left-0 z-10 bg-black/40 w-full h-full rounded-xl'></div>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src={maps}
              alt="Map preview"
              width={3 * 300}
              height={300}
              quality={75}
              loading='lazy'
              className="w-full rounded-xl shadow-lg scale-110 group-hover:scale-100 z-0 transition-transorm duration-700 ease-in-out "
              style={{ height: '300px', objectFit: 'cover' }}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MapSection;