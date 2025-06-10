import React from 'react'

export default function page() {
    return (
        <main>
            <section className='relative w-full h-auto flex flex-col items-center justify-center bg-[#F5F3ED] '>
                <div className='relative z-20 w-[90%] 2xl:w-4/5 mt-[10%] flex flex-col justify-center items-center  '>
                    <h1 className='font-semibold tracking-tighter max-w-md text-center'>
                        Connected to the sky
                    </h1>
                    <div className='w-full py-8 flex justify-center items-center max-w-4xl 2xl:max-w-5xl'>
                        <div className='px-12 2xl:px-16 py-10 flex flex-col justify-start items-start gap-y-5 border-r border-black/20'>
                            <h3 className='font-semibold'>
                                Your personal travel assistant fully automated.
                            </h3>
                            <p className='para-14 font-medium'>
                                Skiable handles your entire flight search process. Discover, filter, and book the best flights effortlessly with smart technology that understands your travel needs, beyond dates and destinations.
                            </p>
                        </div>
                        <div className='px-12 py-16 flex flex-col justify-start items-start gap-y-5 '>
                            <h3 className='font-semibold text-left'>
                                Book smarter Fly faster<br/>Save more.
                            </h3>
                            <p className='para-14 font-medium'>
                                Skip the hassle of flight hunting. Just enter your destination and let Skiable do the work. We scan top airlines in real-time to bring you the best routes and lowest prices, so you save time, money, and effort.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
