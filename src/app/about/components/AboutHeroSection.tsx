'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import airport1 from '@/public/images/aboutPage/slider/airport1.jpg'
import airport2 from '@/public/images/aboutPage/slider/airport2.jpg'
import airport3 from '@/public/images/aboutPage/slider/airport3.jpg'
import airport4 from '@/public/images/aboutPage/slider/airport4.jpg'
import airport5 from '@/public/images/aboutPage/slider/airport5.jpg'
import airport6 from '@/public/images/aboutPage/slider/airport6.jpg'
import A380 from '@/public/images/aboutPage/slider/A380.jpg'
import italy from '@/public/images/aboutPage/slider/italy.jpg'
import london from '@/public/images/aboutPage/slider/london.jpg'
import china from '@/public/images/aboutPage/slider/china.jpg'
import spain from '@/public/images/aboutPage/slider/spain.jpg'
import german from '@/public/images/aboutPage/slider/german.jpg'
import greece from '@/public/images/aboutPage/slider/greece.jpg'
import timeSquare from '@/public/images/aboutPage/slider/timeSquare.jpg'



const AboutHeroSection: React.FC = () => {
    const heroImages = [
        { id: 1, src: greece, rotation: 'rotate-[2deg]'},
        { id: 1, src: airport6, rotation: 'rotate-[2deg]'},
        { id: 2, src: spain, rotation: '-rotate-[3deg]'},
        { id: 3, src: airport1, rotation: 'rotate-[5deg]'},
        { id: 4, src: german, rotation: '-rotate-[3deg]'},
        { id: 5, src: A380, rotation: '-rotate-[1deg]'},
        { id: 6, src: airport2, rotation: 'rotate-[2deg]'},
        { id: 7, src: italy, rotation: '-rotate-[3deg]'},
        { id: 8, src: airport3, rotation: 'rotate-[5deg]'},
        { id: 9, src: china, rotation: '-rotate-[1deg]'},
        { id: 10, src: london, rotation: '-rotate-[1deg]'},
        { id: 10, src: airport4, rotation: '-rotate-[3deg]'},
        { id: 10, src: timeSquare, rotation: '-rotate-[3deg]'},
        { id: 10, src: airport5, rotation: '-rotate-[1deg]'},
    ];

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: 'snap',
        slides: {
            perView: 3,
            spacing: 16,
        },
        breakpoints: {
        '(min-width: 768px)': {
            slides: { perView: 4 },
        },
        '(min-width: 1024px)': {
            slides: { perView: 5 },
        },
        },
    })

    const timeout = useRef<NodeJS.Timeout | null>(null)
    const interval = 1000 

    useEffect(() => {
        const slider = instanceRef.current
        if (!slider) return

        function next() {
            if (slider) slider.next()
        }

        timeout.current = setInterval(next, interval)

        return () => {
            if (timeout.current) clearInterval(timeout.current)
        }
    }, [instanceRef])

    return (
        <section className='relative w-full h-auto flex flex-col items-center justify-center bg-[#F5F3ED] '>
            {/* <Navbar /> */}
            <div className='relative z-20 w-[90%] 2xl:w-4/5 mt-[10%] flex flex-col justify-center items-center  '>
                <h1 className='font-semibold tracking-tighter max-w-2xl text-center'>
                    Discover the Story Behind Skiable
                </h1>
                <p className='main-para my-10 font-medium text-center max-w-xl '>
                    From snowy dreams to seamless ski adventures <br/> learn how we&apos;re transforming the way you explore the mountains.
                </p>

                 {/* Keen Slider Section */}
                <div 
                ref={sliderRef} 
                className='keen-slider py-10 mt-8 2xl:mt-16 max-w-6xl 2xl:max-w-7xl'
                >
                    {heroImages.map((image, index) => (
                        <div
                        key={index}
                        className={`keen-slider__slide min-w-0 flex-shrink-0 h-60 overflow-hidden p-2  `}
                        >
                            <Image
                            src={image.src}
                            alt={`Hero Image ${index + 1}`}
                            width={400}
                            height={240}
                            quality={75}
                            className={`${image.rotation} w-full h-full object-cover rounded-2xl `}
                            />
                        </div>
                    ))}
                </div>
                <div className='w-full py-8 flex justify-center items-center max-w-4xl 2xl:max-w-5xl'>
                    <div className='px-12 2xl:px-16 py-10 flex flex-col justify-start items-start gap-y-5'>
                        <h3 className='font-semibold'>
                            Our Story
                        </h3>
                        <p className='para-14 font-medium'>
                            Skiable was born out of a love for adventure and the frustration of endless flight searches. We believe booking flights should be effortless, smart, and tailored just for you. Our mission is to transform how you explore the mountains by making your travel planning seamless and enjoyable.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutHeroSection
