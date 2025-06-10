'use client'

import React from 'react'
import Image from 'next/image'
import longArrow from '@/public/icons/long-arrow.svg'
import planeGirl from '@/public/images/hero/plane-girl.jpg'
import planeWindow from '@/public/images/hero/plane-window.jpg'
import flightPlane from '@/public/images/hero/flight-plane.jpg'
import plane from '@/public/images/hero/plane.jpg'
import terminal from '@/public/images/hero/terminal.jpg'
import Button from './ui/Button'
import { motion } from 'framer-motion'

const heroImages = [
    { id: 1, src: planeGirl, rotation: 'rotate-[2deg]', translate: 'hover:-translate-y-2 hover:-translate-x-4' },
    { id: 2, src: planeWindow, rotation: '-rotate-[3deg]', translate: 'hover:-translate-y-6 hover:-translate-x-2' },
    { id: 3, src: flightPlane, rotation: 'rotate-[5deg]', translate: 'hover:-translate-y-8' },
    { id: 4, src: plane, rotation: '-rotate-[3deg]', translate: 'hover:-translate-y-8 hover:-translate-x-6' },
    { id: 5, src: terminal, rotation: '-rotate-[1deg]', translate: 'hover:-translate-y-4 hover:translate-x-2' },
];

const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
};

const HeroSection: React.FC = () => {
    const handleSearch = () => {
        console.log('Search button clicked');
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='relative w-full h-auto flex flex-col items-center justify-center bg-[#F5F3ED]'
        >
            <div className='relative z-20 w-[90%] 2xl:w-4/5 mt-[35%] lg:mt-[10%] flex flex-col justify-center items-center'>
                <motion.h1
                    variants={itemVariants}
                    className='font-semibold tracking-tighter max-w-2xs lg:max-w-md text-center'
                >
                    The Sky&apos;s is not the limit
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className='main-para my-10 font-medium text-center max-w-sm lg:max-w-xl'
                >
                    Easily explore and book the most affordable flights across the globe anytime, anywhere, with confidence.
                </motion.p>
                <motion.div variants={itemVariants}>
                    <Button
                        iconSrc={longArrow}
                        iconAlt="Best offers"
                        onClick={handleSearch}
                    >
                        Best offers
                    </Button>
                </motion.div>
                {/* Desktop Hero Images  */}
                <motion.div
                    variants={containerVariants}
                    className='hidden w-full h-64 2xl:h-72 lg:flex justify-center items-center mt-8 2xl:mt-16 max-w-6xl 2xl:max-w-7xl'
                >
                    {heroImages.map((image) => (
                        <motion.div
                            key={image.id}
                            variants={imageVariants}
                            className={`w-1/5 h-4/5 flex justify-center items-center transition-all duration-300 ease-in-out ${image.rotation} ${image.translate}`}
                        >
                            <Image
                                src={image.src}
                                alt={`Hero Image ${image.id}`}
                                width={1.2 * 400}
                                height={400}
                                priority
                                quality={100}
                                objectFit='cover'
                                className='h-full object-cover rounded-2xl shadow-2xl '
                            />
                        </motion.div>
                    ))}
                </motion.div>
                {/* Mobile hero Images  */}
                <motion.div
                    variants={containerVariants}
                    className='lg:hidden w-full h-56 flex flex-col justify-center items-center mt-16'
                >
                    {/* First row: 3 images */}
                    <div className="flex w-full h-full justify-center">
                        {heroImages.slice(0, 3).map((image) => (
                            <motion.div
                                key={image.id}
                                variants={imageVariants}
                                className={`w-1/3 h-full flex justify-center items-center transition-all duration-300 ease-in-out ${image.rotation} ${image.translate}`}
                            >
                                <Image
                                    src={image.src}
                                    alt={`Hero Image ${image.id}`}
                                    width={1.2 * 400}
                                    height={400}
                                    priority
                                    quality={100}
                                    objectFit='cover'
                                    className='h-full object-cover rounded-2xl shadow-2xl '
                                />
                            </motion.div>
                        ))}
                    </div>
                    {/* Second row: 2 images */}
                    <div className="flex w-full h-full justify-center">
                        {heroImages.slice(3).map((image) => (
                            <motion.div
                                key={image.id}
                                variants={imageVariants}
                                className={`w-1/3 h-full flex justify-center items-center transition-all duration-300 ease-in-out ${image.rotation} ${image.translate}`}
                            >
                                <Image
                                    src={image.src}
                                    alt={`Hero Image ${image.id}`}
                                    width={1.2 * 400}
                                    height={400}
                                    priority
                                    quality={100}
                                    objectFit='cover'
                                    className='h-32 object-cover rounded-2xl shadow-2xl '
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    className='w-full py-8 flex flex-col lg:flex-row justify-center items-center max-w-4xl 2xl:max-w-5xl'
                >
                    <motion.div
                        variants={itemVariants}
                        className='px-4 lg:px-12 2xl:px-16 py-10 flex flex-col justify-start items-start gap-y-5 border-b border-r-0 lg:border-b-0 lg:border-r border-black/20'
                    >
                        <h3 className='font-semibold'>
                            Your personal travel assistant fully automated.
                        </h3>
                        <p className='para-14 font-medium'>
                            Skiable handles your entire flight search process. Discover, filter, and book the best flights effortlessly with smart technology that understands your travel needs, beyond dates and destinations.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        className='px-4 lg:px-12 py-10 lg:py-16 flex flex-col justify-start items-start gap-y-5 '
                    >
                        <h3 className='font-semibold text-left'>
                            Book smarter Fly faster<br />Save more.
                        </h3>
                        <p className='para-14 font-medium'>
                            Skip the hassle of flight hunting. Just enter your destination and let Skiable do the work. We scan top airlines in real-time to bring you the best routes and lowest prices, so you save time, money, and effort.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    )
}

export default HeroSection