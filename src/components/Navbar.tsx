'use client'

import Image from 'next/image'
import React from 'react'
import logo from '@/public/icons/logo-black.svg'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
    const route = useRouter()
    const pathname = usePathname()

    return (
        <nav className='absolute z-50 top-[2%] left-1/2 -translate-x-1/2 w-[90%] 2xl:w-4/5 h-16 flex justify-center items-center max-w-7xl'>
            <div className='w-full flex items-center justify-between'>
                <div 
                onClick={() => route.push(`/`)} 
                className='cursor-pointer flex items-center space-x-2'
                >
                    <Image
                        src={logo}
                        alt='Logo'
                        width={36}
                        height={36}
                        priority
                        quality={100}
                        className='object-cover'
                    />
                    <span className='text-2xl text-[#FDC830] font-extrabold'>
                        Ski<span>able</span>
                    </span>
                </div>
                <div className='flex items-center space-x-12'>
                    <ul className='flex items-center space-x-8 border-r border-black/10 pr-8'>
                        <Link 
                        href={`/`}
                        className={`${pathname == '/' ? 'text-black' : 'text-black/40 hover:translate-y-1 transition duration-300 ease-in-out' } text-sm font-medium  cursor-pointer `}
                        >
                            Home
                        </Link>
                        <Link 
                        href={`/about`}
                        className={`${pathname == '/about' ? 'text-black' : 'text-black/40 hover:translate-y-1 transition duration-300 ease-in-out' } text-sm font-medium  cursor-pointer `}
                        >
                            About
                        </Link>
                        <Link 
                        href={`/contact`}
                        className={`${pathname == '/contact' ? 'text-black' : 'text-black/40 hover:translate-y-1 transition duration-300 ease-in-out' } text-sm font-medium  cursor-pointer `}
                        >
                            Contact
                        </Link>
                    </ul>
                    <button 
                    className='bg-black/5 text-black rounded-xl px-4 py-2 font-medium hover:bg-black/10 hover:scale-105 transition-transform duration-300 ease-in-out'
                    style={{
                        fontSize: 'clamp(15px, 1.2vw, 16px)',
                        lineHeight: 'clamp(20px, 2vw, 22px)'
                    }}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
