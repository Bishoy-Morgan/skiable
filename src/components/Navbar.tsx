'use client'

import Image from 'next/image'
import React from 'react'
import logo from '@/public/icons/logo-black.svg'
// import darkTheme from '@/public/icons/dark.svg'
// import lightTheme from '@/public/icons/light.svg'

const Navbar = () => {
    // const [theme, setTheme] = useState<'light' | 'dark'>('light')

    // useEffect(() => {
    //     // Apply theme to <html> tag
    //     document.documentElement.classList.remove('light', 'dark')
    //     document.documentElement.classList.add(theme)

    //     // Optional: save to localStorage
    //     localStorage.setItem('theme', theme)
    // }, [theme])

    // useEffect(() => {
    //     // Optional: load from localStorage on first load
    //     const storedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    //     if (storedTheme) setTheme(storedTheme)
    // }, [])

    // const toggleTheme = () => {
    //     setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    // }

    return (
        <nav className='absolute top-[2%] left-1/2 -translate-x-1/2 w-[90%] 2xl:w-4/5 h-16 flex justify-center items-center max-w-7xl'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
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
                    {/* <button onClick={toggleTheme}>
                        {theme === 'light' ? (
                            <Image src={lightTheme} alt='Light' width={28} height={28} />
                        ) : (
                            <Image src={darkTheme} alt='Dark' width={28} height={28} />
                        )}
                    </button> */}
                    <ul className='flex items-center space-x-8 border-r border-black/10 pr-8'>
                        <li className='text-sm font-medium text-black cursor-pointer hover:translate-y-1 transition duration-300 ease-in-out'>
                            Home
                        </li>
                        <li className='text-sm font-medium text-black cursor-pointer hover:translate-y-1 transition duration-300 ease-in-out'>
                            About
                        </li>
                        <li className='text-sm font-medium text-black cursor-pointer hover:translate-y-1 transition duration-300 ease-in-out'>
                            Contact
                        </li>
                    </ul>
                    <button className='dark-btn '>
                        Sign in
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
