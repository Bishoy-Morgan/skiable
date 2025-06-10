import React from 'react';
import Image from 'next/image';
import longArrow from '@/public/icons/long-arrow.svg';
import logo from '@/public/icons/logo.svg';
import Button from './ui/Button';

const Footer = () => {
  return (
    <footer className="w-[90%] mx-auto flex items-center justify-center text-[#fffefc] rounded-xl my-12 bg-black py-8 max-w-[1920px]">
      <div className="w-full flex flex-col items-center justify-center text-center   ">
        <div className='w-full flex flex-col lg:flex-row items-center justify-center'>
          <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center lg:justify-end lg:px-16 py-10'>
            <div className='flex items-center space-x-2 lg:mb-8'>
                <Image
                    src={logo}
                    alt='Logo'
                    width={36}
                    height={36}
                    priority
                    quality={100}
                    className='object-cover'
                />
                <span className='text-2xl text-[#FDC830] font-extrabold'>
                    Skiable
                </span>
            </div>
            <h4 className="text-3xl font-bold mb-4 max-w-sm text-center lg:text-left">Join the Skiable Community</h4>
            <p className="para-14 mb-8 max-w-52 text-center lg:text-left">Stay updated with the latest news and offers.</p>
          </div>
          <div className='w-full lg:w-1/2 flex justify-center lg:justify-end lg:px-16 py-10 '>
            <Button
            iconSrc={longArrow}
            iconAlt="Long Arrow"
            className='border border-[#fffefc] '
            >
              Available Offers
            </Button>
          </div>
        </div>
        <div className="w-full mt-4">
          <a href="#" className="text-sm text-[#fffdf5] mx-2">Privacy Policy</a>
          <a href="#" className="text-sm text-[#fffdf5] mx-2">Terms of Service</a>
        </div>
        <p className='text-xs text-[#fffdf5] mt-6'>&copy; {new Date().getFullYear()} Skiable. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
