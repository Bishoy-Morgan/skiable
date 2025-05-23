import Image from 'next/image';
import React from 'react';
import day from '@/public/icons/day.svg'
import insights from '@/public/icons/insights.svg'
import ticket from '@/public/icons/ticket.svg'

const ToolsSections = () => {
    return (
        <div className='relative w-full flex items-center justify-center py-16 '>
            <div className="w-[90%] 2xl:w-4/5 rounded-xl bg-[#F5F3ED] p-24 max-w-[100rem] ">
                <h2 className="mb-16 max-w-lg ">
                    Useful tools to help you find the best deals
                </h2>
                <div className='w-full flex items-start justify-between gap-x-[5%]'>
                    <div className="w-[45%] flex flex-col gap-6 mb-8">
                        <div className="bg-[#fffefc] shadow-lg p-10 rounded-xl flex items-start gap-x-8 ">
                            <Image src={day} alt='Day to fly' width={60} height={60} className='p-3 rounded-xl bg-black shadow-xl' />
                            <div>
                                <h3 className="font-semibold text-black mb-8">
                                    Find the cheapest days to fly
                                </h3>
                                <p className="para-14 font-medium text-black">
                                    The Date grid and Price graph make it easy to see the best flight deals
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#fffefc] shadow-lg p-10 rounded-xl flex items-start gap-x-8 ">
                            <Image src={insights} alt='Day to fly' width={60} height={60} className='p-3 rounded-xl bg-black shadow-xl' />
                            <div>
                                <h3 className="font-semibold text-black mb-8">
                                    See the whole picture with price insights
                                </h3>
                                <p className="para-14 font-medium text-black">
                                    Price history and trend data show you when to book to get the best price on your flight
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#fffefc] shadow-lg p-10 rounded-xl flex items-start gap-x-8 ">
                            <Image src={ticket} alt='Day to fly' width={60} height={60} className='p-3 rounded-xl bg-black shadow-xl' />
                            <div>
                                <h3 className="font-semibold text-black mb-8">
                                    Track prices for a trip
                                </h3>
                                <p className="para-14 font-medium text-black">
                                    Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2 px-4 rounded-xl ">
                        <h2 className=" text-black mb-4">
                            Insightful tools help you choose your trip dates
                        </h2>
                        <p className="para-14 text-black/90">
                            trip. Then, play around with the <span className="font-bold">Date grid</span> and <span className="font-bold">Price graph</span> options on the Search page to find the cheapest days to get to your destination – and back again for round trips.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolsSections;