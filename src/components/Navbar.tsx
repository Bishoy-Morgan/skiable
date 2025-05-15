import Image from 'next/image'
import React from 'react'
import logo from '@/public/icons/logo.svg'
import darkTheme from '@/public/icons/dark-theme.svg'
import Button from './ui/Button'

const Navbar = () => {
    // const [theme, setTheme] = useState<boolean>(false)
    return (
        <nav className='absolute top-0 left-0 w-full h-16 flex justify-center items-center'>
            <div className='w-[90%] 2xl:w-4/5 flex items-center justify-between '>
                <div className='flex items-center space-x-2'>
                    <Image 
                    src={logo}
                    alt=''
                    width={36}
                    height={36}
                    priority
                    quality={100}
                    className='object-cover'
                    />
                    <span className='text-2xl text-[#FDC830] font-extrabold'>Ski<span className=''>able</span></span>
                </div>
                <div className='flex items-center space-x-12'>
                    <div className=''>
                        <Image 
                        src={darkTheme}
                        alt=''
                        width={20}
                        height={20}
                        />
                    </div>
                    <button className='bg-transparent text-[#FDC830] px-6 py-2 border border-[#FDC830] rounded-xs font-medium hover:bg-[#050801] transition-all duration-300 ease-in-out'>
                        Sign in
                    </button>
                </div>
            </div>
        </nav>  
    )
}

export default Navbar
