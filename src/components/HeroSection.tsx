import Image from 'next/image'
import React from 'react'
import heroImage from '@/public/images/heroImage.jpg'
import Navbar from './Navbar'

const HeroSection: React.FC = () => {
    return (
        <section className='relative w-full h-dvh flex items-center justify-center '>
            <div className='absolute top-0 left-0 w-full h-full -z-0'>
                <Image 
                src={heroImage}
                alt='Flight'
                fill
                objectFit='cover'
                priority
                quality={100}
                />
            </div>
            <Navbar />
            {/* <div className='absolute left-0 top-0 z-10 w-1/3 h-full bg-skyBlue drop-shadow-2xl ' /> */}
            <div className='relative z-20 w-[90%] 2xl:w-4/5 flex flex-col justify-start'>
                <h1 className='text-9xl font-extrabold uppercase max-w-4xl'>Take to <br/> the
                    <span className='text-[#FDC830]'>
                        &nbsp;Skies
                    </span>
                </h1>
                <p className='text-xl leading-8 my-6 font-medium max-w-sm'>
                    Discover the best flights at the lowest prices anytime, anywhere.
                </p>
            </div>
        </section>
    )
}

export default HeroSection
