import React from 'react';
import Image from 'next/image';
import longArrow from '@/public/icons/long-arrow.svg';
import logo from '@/public/icons/logo.svg';

const Footer = () => {
  return (
    <footer className="w-[90%] 2xl:w-4/5 mx-auto flex items-center justify-center text-[#fffefc] rounded-xl my-12 bg-black py-8 ">
      <div className="w-full flex flex-col items-center justify-center text-center max-w-7xl  ">
        <div className='w-full flex items-center justify-center'>
          <div className='w-1/2 flex flex-col items-start justify-center px-16 py-10'>
            <div className='flex items-center space-x-2 mb-8'>
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
                    Ski<span>able</span>
                </span>
            </div>
            <h4 className="text-3xl font-bold mb-4 max-w-sm text-left">Join the Skiable Community</h4>
            <p className="para-14 mb-8 max-w-52 text-left">Stay updated with the latest news and offers.</p>
          </div>
          <div className='w-1/2 flex items-start justify-end px-16 py-10'>
            <button className='white-btn flex items-center gap-x-4'>
                <Image 
                src={longArrow}
                alt='Arrow Right'
                width={30}
                height={30}
                className='p-1 rounded-lg bg-black '
                />
                <span>
                    Available Offeres
                </span>
            </button>
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
