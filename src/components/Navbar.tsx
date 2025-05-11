import Image from 'next/image'
import React from 'react'
import logo from '@/public/icons/logo.svg'
import darkTheme from '@/public/icons/dark-theme.svg'
import Button from './ui/Button'

const Navbar = () => {
    // const [theme, setTheme] = useState<boolean>(false)
    return (
        <nav className='absolute top-0 left-0 w-full h-14 flex justify-center'>
            <div className='container w-[90%] flex items-center justify-between '>
                <div className='flex items-center space-x-2'>
                    <Image 
                    src={logo}
                    alt=''
                    width={36}
                    height={36}
                    />
                    <span className='text-2xl text-[#f5ffff] font-extrabold'>Ski<span className='text-[#a0dade]'>able</span></span>
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
                    <Button name={'Sign in'}/>
                </div>
            </div>
        </nav>  
    )
}

export default Navbar
