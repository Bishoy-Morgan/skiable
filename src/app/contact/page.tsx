import React from 'react'
import ContactForm from './components/ContactForm'

export default function page() {
    return (
        <main>
            <section className='relative w-full h-auto flex flex-col items-center justify-center bg-[#F5F3ED] '>
                <div className='relative z-20 w-[90%] 2xl:w-4/5 mt-[35%] lg:mt-[10%] flex flex-col justify-center items-center pb-16 '>
                    <h1 className='font-semibold tracking-tighter text-center max-w-3xs lg:max-w-md '>
                        Connect to the sky
                    </h1>
                    <ContactForm />
                </div>
            </section>
        </main>
    )
}