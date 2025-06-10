'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import day from '@/public/icons/day.svg'
import insights from '@/public/icons/insights.svg'
import ticket from '@/public/icons/ticket.svg'
import PriceChart from './ui/PriceChart';
import PriceAlertAnimation from './ui/PriceAlertAnimation';
import CalendarAnimation from './ui/CalendarAnimation';

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
};

const details = [
    {
        title: "Find the cheapest days to fly",
        content: (
            <>
                <h4 className="tools-para text-black mb-4">Find the cheapest days to fly</h4>
                <p className="para-14 text-black/90 mb-6">
                    Use the Date grid and Price graph to easily spot the best flight deals. These tools help you compare prices across different days, so you can choose the most affordable dates for your trip.
                    <br /><br />
                    By analyzing fare fluctuations over a calendar view, you can quickly identify which days are the cheapest to fly. This empowers you to adjust your travel plans for maximum savings, whether you’re booking a spontaneous getaway or planning months in advance. Flexible travelers can save hundreds by simply shifting their departure or return by a day or two.
                </p>
                <div className="flex justify-center">
                    <CalendarAnimation />
                </div>
            </>
        )
    },
    {
        title: "See the whole picture with price insights",
        content: (
            <>
                <h4 className="tools-para text-black mb-4">See the whole picture with price insights</h4>
                <p className="para-14 text-black/90 mb-6">
                    Price history and trend data show you when to book to get the best price on your flight. Make informed decisions by understanding how prices change over time.
                    <br /><br />
                    Our price insights tool provides a comprehensive overview of past and current fare trends, helping you decide whether to book now or wait. You’ll see how prices have fluctuated for your route, get alerts about price drops, and discover the best times to buy tickets. This transparency takes the guesswork out of booking and helps you travel smarter.
                </p>
                <div className="flex justify-center">
                    <PriceChart />
                </div>
            </>
        )
    },
    {
        title: "Track prices for a trip",
        content: (
            <>
                <h4 className="tools-para text-black mb-4">Track prices for a trip</h4>
                <p className="para-14 text-black/90 mb-6">
                    Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop. Stay updated and never miss a deal!
                    <br /><br />
                    Set up price alerts for your preferred flights or destinations and receive instant notifications when fares change. This feature is perfect for travelers who want to monitor prices over time and jump on the best deals as soon as they appear. Let us do the tracking for you, so you can focus on planning your adventure.
                </p>
                <div className="flex justify-center">
                    <PriceAlertAnimation />
                </div>
            </>
        )
    }
];

const ToolsSections = () => {
    const [selected, setSelected] = useState(0);

    return (
        <motion.div
            className='relative w-full flex items-center justify-center py-16'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        >
            <div className="w-[90%] 2xl:w-3/4 rounded-xl bg-[#F5F3ED] p-4 lg:p-16 max-w-[100rem] ">
                <motion.h2
                    className="mb-16 max-w-2xl"
                    variants={cardVariants}
                >
                    Useful tools to help you find the best deals
                </motion.h2>
                <div className='w-full flex flex-col lg:flex-row items-start justify-between lg:gap-x-[5%]'>
                    <div className="w-full lg:w-[45%] flex flex-col gap-6 mb-8">
                        <motion.div
                            className={`bg-[#fffefc] shadow-lg p-6 rounded-xl flex items-start gap-x-8 cursor-pointer ${selected === 0 ? 'ring-2 ring-[#FDC830] lg:ring-0 lg:translate-x-3 translate-all duration-500 ease-in-out' : ''}`}
                            variants={cardVariants}
                            onClick={() => setSelected(0)}
                        >
                            <Image src={day} alt='Day to fly' width={60} height={60} className='p-3 rounded-xl bg-black shadow-xl' />
                            <div>
                                <h3 className="font-semibold text-black mb-4">
                                    Find the cheapest days to fly
                                </h3>
                                <p className="para-14 font-medium text-black">
                                    The Date grid and Price graph make it easy to see the best flight deals
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className={`bg-[#fffefc] shadow-lg p-6 rounded-xl flex items-start gap-x-8 cursor-pointer ${selected === 1 ? 'ring-2 ring-[#FDC830] lg:ring-0 lg:translate-x-3 translate-all duration-500 ease-in-out' : ''}`}
                            variants={cardVariants}
                            onClick={() => setSelected(1)}
                        >
                            <Image src={insights} alt='Price insights' width={60} height={60} className='p-3 rounded-xl bg-black shadow-xl' />
                            <div>
                                <h3 className="font-semibold text-black mb-4">
                                    See the whole picture with price insights
                                </h3>
                                <p className="para-14 font-medium text-black">
                                    Price history and trend data show you when to book to get the best price on your flight
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className={`bg-[#fffefc] shadow-lg p-6 rounded-xl flex items-start gap-x-8 cursor-pointer ${selected === 2 ? 'ring-2 ring-[#FDC830] lg:ring-0 lg:translate-x-3 translate-all duration-500 ease-in-out' : ''}`}
                            variants={cardVariants}
                            onClick={() => setSelected(2)}
                        >
                            <Image src={ticket} alt='Track prices' width={60} height={60} className='p-3 rounded-xl bg-black shadow-xl' />
                            <div>
                                <h3 className="font-semibold text-black mb-4">
                                    Track prices for a trip
                                </h3>
                                <p className="para-14 font-medium text-black">
                                    Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="w-full lg:w-1/2 px-4 rounded-xl"
                        variants={cardVariants}
                        key={selected}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        {details[selected].content}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ToolsSections;