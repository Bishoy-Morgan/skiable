'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import arrow from '@/public/icons/arrow.svg';
import airplane from '@/public/icons/airplane.svg';
import { Flight } from '@/src/types/flight';
import FlightDetails from './FlightDetails';
import { carrierLogos } from '@/src/utils/carrierLogos';


const FlightCard = ({
  flight,
  tripType,
  formatDuration,
}: {
  flight: Flight;
  tripType: string;
  formatDuration: (minutes: number) => string;
}) => {
  const [toggleDetails, setToggleDetails] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <div onClick={() => setToggleDetails(!toggleDetails)} className="w-full px-6 py-4 flex justify-between items-center text-black bg-[#F5F3ED] rounded-t-xl hover:shadow-xs transition-all duration-300">
        <div className="w-1/3 flex gap-x-8 items-center">
          <div className="w-[70px] h-[40px] relative">
            <Image
              src={carrierLogos[flight.carrier_name] || airplane }
              alt={flight.carrier_name}
              fill
              quality={100}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-medium">
              {new Date(flight.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} —{' '}
              {new Date(flight.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </span>
            <span className="text-sm text-black/80">{flight.carrier_name}</span>
          </div>
        </div>

        <div className="w-[15%] flex flex-col">
          <span className="text-base">{formatDuration(flight.duration_minutes)}</span>
          <span className="text-sm text-black/50">
            {flight.origin_code}-{flight.destination_code}
          </span>
        </div>

        <div className="w-[15%] flex flex-col">
          <span className="text-base">{flight.stop_count} stop</span>
          <span className="text-sm text-black/50">{tripType} trip</span>
        </div>

        <div className="w-[10%] flex flex-col items-center">
          <span className="text-base font-semibold text-black">
            {flight.price_raw.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })}
          </span>
        </div>

        <button className="w-[5%] flex justify-center items-center">
          <Image
            src={arrow}
            alt="Arrow"
            width={30}
            height={30}
            className={`transform transition-transform duration-300 ${toggleDetails ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </div>
      <AnimatePresence>
        {toggleDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden w-full"
          >
            <FlightDetails flight={flight} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlightCard;
