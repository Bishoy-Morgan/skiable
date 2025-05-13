import Image from 'next/image';
import React from 'react';
import day from '@/public/icons/day.svg'
import insights from '@/public/icons/insights.svg'
import ticket from '@/public/icons/ticket.svg'

const ToolsSections = () => {
    return (
        <div className='relative w-full flex items-center justify-center py-16 max-w-[1920px]'>
            <div className="w-[90%] py-6 rounded-lg  ">
                <h1 className="text-5xl font-bold mb-10">
                    Useful tools to help you find the best deals
                </h1>

                <div className='w-full flex items-start justify-between'>
                    <div className="w-2/5 flex flex-col gap-6 mb-8">
                        <div className="bg-[#076585] px-6 py-8 rounded-lg flex items-start gap-x-8 ">
                            <Image src={day} alt='Day to fly' width={40} height={40} />
                            <div>
                                <h2 className="text-lg font-semibold text-[#f5ffff] mb-4">
                                    Find the cheapest days to fly
                                </h2>
                                <p className="text-[#f5ffff]">
                                    The Date grid and Price graph make it easy to see the best flight deals
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#076585] px-6 py-8 rounded-lg flex items-start gap-x-8 ">
                            <Image src={insights} alt='Day to fly' width={40} height={40} />
                            <div>
                                <h2 className="text-lg font-semibold text-[#f5ffff] mb-4">
                                    See the whole picture with price insights
                                </h2>
                                <p className="text-[#f5ffff]">
                                    Price history and trend data show you when to book to get the best price on your flight
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#076585] px-6 py-8 rounded-lg flex items-start gap-x-8 ">
                            <Image src={ticket} alt='Day to fly' width={40} height={40} />
                            <div>
                                <h2 className="text-lg font-semibold text-[#f5ffff] mb-4">
                                    Track prices for a trip
                                </h2>
                                <p className="text-[#f5ffff]">
                                    Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2 px-4 rounded-lg ">
                        <h2 className="text-2xl font-semibold text-[#076585] mb-4">
                            Insightful tools help you choose your trip dates
                        </h2>
                        <p className="text-[#f5ffff]">
                            trip. Then, play around with the <span className="font-bold">Date grid</span> and <span className="font-bold">Price graph</span> options on the Search page to find the cheapest days to get to your destination – and back again for round trips.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolsSections;