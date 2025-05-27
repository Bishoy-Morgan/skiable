import React from 'react'
import Image from 'next/image'
import star from '@/public/icons/star.svg'

const WhyChoose = () => {
    const list = [
        "Smart flight search powered by real-time data — find the best routes and prices fast.",
        "Personalized recommendations that understand your unique travel needs.",
        "Save time and money with automated booking assistance.",
        "Seamless, user-friendly experience designed for ski lovers and adventurers alike."
    ]
    return (
        <section className="w-full py-16 mx-auto flex flex-col justify-center ">
            <div className='w-[90%] 2xl:w-4/5 mx-auto flex flex-col items-center justify-center max-w-7xl  '>
                <h2 className="mb-8 font-semibold ">Why Choose Skiable?</h2>
                <p className="para-14 font-medium max-w-xl text-black mb-6">
                    Skiable is your ultimate travel companion, combining cutting-edge technology with personalized insights to make every journey smooth and stress-free. Whether you&apos;re planning your next sky adventure or a spontaneous getaway, we provide real-time flight data, smart filtering, and effortless booking tools — so you can focus on what truly matters: the experience.
                </p>
                <ul className="space-y-2 text-black max-w-3xl mx-auto text-left list-inside">
                    {list.map((item, index) => (
                        <li key={index} className="flex items-center justify-start gap-2">
                            <Image src={star} alt='Star' width={24} height={24} />
                            <span className='text-sm font-medium '>
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
);
}

export default WhyChoose
