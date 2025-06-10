'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import star from '@/public/icons/star.svg'

    const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
    }

const WhyChoose = () => {
    const list = [
        "Smart flight search powered by real-time data — find the best routes and prices fast.",
        "Personalized recommendations that understand your unique travel needs.",
        "Save time and money with automated booking assistance.",
        "Seamless, user-friendly experience designed for ski lovers and adventurers alike."
    ]
    return (
        <motion.section
            className="w-full py-16 mx-auto flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
        >
            <div className='w-[90%] 2xl:w-4/5 mx-auto flex flex-col items-center justify-center max-w-7xl'>
                <motion.h2
                    className="mb-8 font-semibold"
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Why Choose Skiable?
                </motion.h2>
                <motion.p
                    className="para-14 font-medium max-w-xl text-black mb-6"
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Skiable is your ultimate travel companion, combining cutting-edge technology with personalized insights to make every journey smooth and stress-free. Whether you&apos;re planning your next sky adventure or a spontaneous getaway, we provide real-time flight data, smart filtering, and effortless booking tools — so you can focus on what truly matters: the experience.
                </motion.p>
                <ul className="space-y-2 text-black max-w-3xl mx-auto text-left list-inside">
                    {list.map((item, index) => (
                        <motion.li
                            key={index}
                            className="flex items-center justify-start gap-2"
                            variants={fadeInUp}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        >
                            <Image src={star} alt='Star' width={24} height={24} />
                            <span className='text-sm font-medium '>
                                {item}
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.section>
    );
}

export default WhyChoose