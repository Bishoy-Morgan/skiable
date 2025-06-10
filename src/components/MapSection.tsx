'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import maps from '@/public/images/google-maps.jpg'

const googleMapsUrl =
  'https://www.google.com/maps/@51.505,-0.09,6z';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const MapSection = () => {
  return (
    <motion.section
      className='relative w-full flex flex-col items-center lg:my-20 bg-transparent max-w-[1920px] mx-auto '
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className='w-[90%] rounded-xl '>
        <motion.h2
          className='mb-10 max-w-xl'
          variants={fadeInUp}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Find cheap flights from United States to anywhere
        </motion.h2>
        <motion.p
          className='para-14 mb-10 max-w-2xl !font-medium '
          variants={fadeInUp}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Search, compare, and book flights from anywhere in the U.S. to any destination worldwide instantly access hundreds of airlines, flexible options, and the lowest available prices, all in one seamless experience.
        </motion.p>
        <motion.a
          className='relative group overflow-hidden rounded-xl cursor-pointer '
          variants={fadeInUp}
          transition={{ duration: 0.7, delay: 0.3 }}
          href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
        >
          <div className='absolute top-0 left-0 z-10 bg-black/50 w-full h-full rounded-xl flex items-center justify-center'>
            <h3 className='text-white font-bold italic group-hover:scale-75 transition-transform duration-1000 ease-in-out'>
              Dicover your distination
            </h3>
          </div>
            <Image
              src={maps}
              alt="Map preview"
              width={3 * 300}
              height={300}
              quality={75}
              loading='lazy'
              className="w-full rounded-xl shadow-lg"
              style={{ height: '300px', objectFit: 'cover' }}
            />
        </motion.a>
      </div>
    </motion.section>
  );
};

export default MapSection;