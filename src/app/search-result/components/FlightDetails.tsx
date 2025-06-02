'use client';
import React from 'react';
import Image from 'next/image';
import { Flight } from '../../../types/flight';
// import { desc } from 'framer-motion/client';
import earth from '@/public/icons/flight-details/earth.svg';
import power from '@/public/icons/flight-details/power.svg';
import video from '@/public/icons/flight-details/video.svg';
// import wifi from '@/public/icons/flight-details/wifi.svg';
import locker from '@/public/icons/flight-details/locker.svg';


const FlightDetails = ({ flight }: { flight: Flight }) => {
  const icons = [
    {
      id: 1,
      src: locker,
      description: 'Average legroom (31 in)',
    },
    {
      id: 2,
      src: power,
      description: 'In-seat power & USB outlets',
    },
    {
      id: 3,
      src: video,
      description: 'On-demand video',
    },
    {
      id: 4,
      src: earth,
      description: 'Emissions estimate: 243 kg CO2e',
    },
  ]

  function formatDuration(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs > 0 && mins > 0) return `${hrs} hr ${mins} min`;
    if (hrs > 0) return `${hrs} hr`;
    return `${mins} min`;
  }

  function getTimeDifferenceInMinutes(departure: string, arrival: string): number {
    const depTime = new Date(departure);
    const arrTime = new Date(arrival);

    const diffMs = arrTime.getTime() - depTime.getTime();
    return Math.round(diffMs / 60000); // convert to minutes
  }

  return (
    <div className="w-full py-6 flex flex-col items-center text-black rounded-b-xl border border-black/10 border-t-0">
      <div className="w-[85%] pb-4 flex flex-col items-start ">
        <div className='w-full flex items-start justify-between mb-4'>
          <div className="w-3/4 flex flex-col">
            {/* Origin country legs[0] - first stop */}
            <div className='flex items-center gap-x-2'>
              {/* side dots  */}
              <div className='relative w-[3.5%] h-20 flex flex-col justify-center items-center '>
                <div className='w-2 h-2 rounded-xs bg-[#F5F3ED] rotate-45 '></div>
                <div className='w-[1.6px] h-12 max-h-16 black-graidient my-1 rounded-sm'></div>
                <div className='w-2 h-2 rounded-xs bg-black/40   rotate-45 '></div>
              </div>
              {/* flight details  */}
              <div className='w-[95%] flex flex-col items-start '>
                <div className="text-base mb-2 flex items-center ">
                  <span>
                    {new Date(flight?.legs[0]?.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </span>
                  <div className='w-1 h-1 bg-black/30 rounded-full mx-4'></div>
                  <span>
                    {flight.legs[0].origin_name}, {flight.legs[0]?.origin_city}
                    <span className='font-light ml-2 text-sm'>({flight.legs[0]?.origin_code}) </span>
                  </span>
                </div>
                <p className="text-sm text-black/60">
                  Travel time: {formatDuration(flight?.legs[0]?.duration_minutes || 0)}
                </p>
                {/* Destination country legs[0] - first stop */}
                <div className="text-base mt-3 flex items-center ">
                  <span>
                    {new Date(flight?.legs[0]?.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </span>
                  <div className='w-1 h-1 bg-black/30 rounded-full mx-4'></div>
                  <span>
                    {flight.legs[0].destination_name}, {flight.legs[0]?.destination_city} 
                    <span className='font-light ml-2 text-sm'>
                      ({flight.legs[0]?.destination_code}) 
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <p className="text-black/60 text-[11px] mt-6 ml-10 flex items-center">
              <span className="capitalize">{flight?.carrier_name}</span>
              <div className='w-2 h-[1px] bg-black/30 rounded-sm mx-2'></div>
              <span className="capitalize">{flight.cabin_class}</span>
              <div className='w-2 h-[1px] bg-black/30 rounded-sm mx-2'></div>
              <span>Flight {flight.flight_number + Math.floor(Math.random() * 1000)}</span>
            </p>

          </div>

          {/* Airline features  */}
          <div className="w-1/4 flex flex-col items-start text-xs text-black/90 space-y-2 ">
            {icons.map((icon) => (
              <div key={icon.id} className="flex items-center gap-x-2">
                <Image src={icon.src} alt={icon.description} width={14} height={14}  className='opacity-70'/>
                <span className='text-xs text-black/60'>{icon.description}</span>
              </div>
            ))}
          </div>
        </div>

        {flight?.legs[1] && (
          <div className='w-full ml-10 py-4 flex flex-col items-start justify-center border-y border-black/10'>
            <p className="text-base text-black">
              {formatDuration(
                getTimeDifferenceInMinutes(
                  flight?.legs[0]?.arrival,
                  flight?.legs[1]?.departure
                )
              )}
              <span className='m-4'>
                layover - {flight?.legs[1]?.origin_country}
              </span>
            </p>
          </div>
        )}
        
        {flight?.legs[1] && (
          <div 
          key={flight?.legs[1]?.leg_number}
          className='w-full flex items-start justify-between mt-6'
          >
            <div className="w-3/4 flex flex-col">
              {/* Origin country legs[1] - second stop */}
              <div className='flex items-center gap-x-2'>
                {/* side dots  */}
                <div className='relative w-[3.5%] h-20 flex flex-col justify-center items-center '>
                  <div className='w-2 h-2 rounded-xs bg-black/40 rotate-45 '></div>
                  <div className='w-[1.6px] h-12 max-h-16 black-graidient my-1 rounded-sm'></div>
                  <div className='w-2 h-2 rounded-xs  bg-[#F5F3ED]  rotate-45 '></div>
                </div>
                {/* flight details  */}
                <div className='w-[95%] flex flex-col items-start '>
                  <div className="text-base mb-2 flex items-center ">
                    <span>
                      {new Date(flight?.legs[1]?.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                    <div className='w-1 h-1 bg-black/30 rounded-full mx-4'></div>
                    <span>
                      {flight?.legs[1]?.origin_name}, {flight?.legs[1]?.origin_city}
                      <span className='font-light ml-2 text-sm'>({flight?.legs[1].origin_code}) </span>
                    </span>
                  </div>
                  <p className="text-sm text-black/60">
                    Travel time: {formatDuration(flight?.legs[1]?.duration_minutes || 0)}
                  </p>
                  {/* Destination country legs[1] - first stop */}
                  <div className="text-base mt-3 flex items-center ">
                    <span>
                      {new Date(flight?.legs[1]?.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                    <div className='w-1 h-1 bg-black/30 rounded-full mx-4'></div>
                    <span>
                      {flight?.legs[1]?.destination_name}, {flight?.legs[1]?.destination_city}
                      <span className='font-light ml-2 text-sm'>({flight?.legs[1]?.destination_code}) </span> 
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-black/60 text-[11px] mt-6 ml-10 flex items-center">
                <span className="capitalize">{flight?.carrier_name}</span>
                <div className='w-2 h-[1px] bg-black/30 rounded-sm mx-2'></div>
                <span className="capitalize">{flight.cabin_class}</span>
                <div className='w-2 h-[1px] bg-black/30 rounded-sm mx-2'></div>
                <span>Flight {flight.flight_number + Math.floor(Math.random() * 1000)}</span>
              </p>
          </div>

            {/* Airline features  */}
            <div className="w-1/4 flex flex-col items-start text-xs text-black/90 space-y-2 ">
              {icons.map((icon) => (
                <div key={icon.id} className="flex items-center gap-x-2">
                  <Image src={icon.src} alt={icon.description} width={14} height={14} className='opacity-70'/>
                  <span className='text-xs text-black/60'>{icon.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {flight?.legs[2] && (
          <div className='w-full ml-10 py-4 mt-6 flex flex-col items-start justify-center border-y border-black/10'>
            <p className="text-base text-black">
              {formatDuration(
                getTimeDifferenceInMinutes(
                  flight?.legs[1]?.arrival,
                  flight?.legs[2]?.departure
                )
              )}
              <span className='m-4'>
                layover - {flight?.legs[2]?.origin_country}
              </span>
            </p>
          </div>
        )}
        
        {flight?.legs[2] && (
          <div 
          key={flight?.legs[2]?.leg_number}
          className='w-full flex items-start justify-between mt-6'
          >
            <div className="w-3/4 flex flex-col">
              {/* Origin country legs[2] - second stop */}
              <div className='flex items-center gap-x-2'>
                {/* side dots  */}
                <div className='relative w-[3.5%] h-20 flex flex-col justify-center items-center '>
                  <div className='w-2 h-2 rounded-xs bg-black/40 rotate-45 '></div>
                  <div className='w-[1.6px] h-12 max-h-16 black-graidient my-1 rounded-sm'></div>
                  <div className='w-2 h-2 rounded-xs  bg-[#F5F3ED]  rotate-45 '></div>
                </div>
                {/* flight details  */}
                <div className='w-[95%] flex flex-col items-start '>
                  <div className="text-base mb-2 flex items-center ">
                    <span>
                      {new Date(flight?.legs[2]?.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                    <div className='w-1 h-1 bg-black/30 rounded-full mx-4'></div>
                    <span>
                      {flight?.legs[2]?.origin_name}, {flight?.legs[2]?.origin_city} 
                      <span className='font-light ml-2 text-sm'>({flight?.legs[2]?.origin_code})</span>
                    </span>
                  </div>
                  <p className="text-sm text-black/60">
                    Travel time: {formatDuration(flight?.legs[2]?.duration_minutes || 0)}
                  </p>
                  {/* Destination country legs[2] - first stop */}
                  <div className="text-base mt-3 flex items-center ">
                    <span>
                      {new Date(flight?.legs[2]?.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                    <div className='w-1 h-1 bg-black/30 rounded-full mx-4'></div>
                    <span>
                      {flight?.legs[2]?.destination_name}, {flight?.legs[2]?.destination_city}
                      <span className='font-light ml-2 text-sm'>({flight?.legs[2]?.destination_code}) </span>
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-black/60 text-[11px] mt-6 ml-10 flex items-center">
                <span className="capitalize">{flight?.carrier_name}</span>
                <div className='w-2 h-[1px] bg-black/30 rounded-sm mx-2'></div>
                <span className="capitalize">{flight.cabin_class}</span>
                <div className='w-2 h-[1px] bg-black/30 rounded-sm mx-2'></div>
                <span>Flight {flight.flight_number + Math.floor(Math.random() * 1000)}</span>
              </p>
          </div>

            {/* Airline features  */}
            <div className="w-1/4 flex flex-col items-start text-xs text-black/90 space-y-2 ">
              {icons.map((icon) => (
                <div key={icon.id} className="flex items-center gap-x-2">
                  <Image src={icon.src} alt={icon.description} width={14} height={14}  className='opacity-70'/>
                  <span className='text-xs text-black/60'>{icon.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      

      </div>
    </div>
  );
};

export default FlightDetails;
