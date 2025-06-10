'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/icons/logo-black.svg'
import menu from '@/public/icons/menu.svg'

const Navbar = () => {
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];
    const [menuOpen, setMenuOpen] = useState(false);
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
                {/* Desktop Nav  */}
                <div className='hidden lg:flex items-center space-x-12'>
                    <ul className='flex items-center space-x-8 border-r border-black/10 pr-8'>
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${pathname == link.href ? 'text-black' : 'text-black/40 hover:translate-y-1 transition duration-300 ease-in-out'} text-sm font-medium cursor-pointer`}
                            >
                                {link.label}
                            </Link>
                        ))}
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
                {/* Mobile Nav  */}
                <button 
                className='lg:hidden flex space-x-2 items-center bg-black/5 rounded-xl p-2 hover:bg-black/10 hover:scale-105 transition-transform duration-300 ease-in-out'
                style={{
                    fontSize: 'clamp(15px, 1.2vw, 16px)',
                    lineHeight: 'clamp(20px, 2vw, 22px)'
                }}
                onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className='text-black font-medium'>
                        Menu
                    </span>
                    <Image
                        src={menu}
                        alt='Menu'
                        width={16}
                        height={16}
                        />
                </button>
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, y: -30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="fixed md:bg-black top-16 left-1/2 -translate-x-1/2 w-4/5 rounded-xl bg-black z-50 flex lg:hidden"
                        >
                            <div className="w-full h-full p-8 flex flex-col space-y-6 shadow-lg text-white">
                                <button
                                    className="self-end mb-4"
                                    onClick={() => setMenuOpen(false)}
                                    aria-label="Close menu"
                                >
                                    ✕
                                </button>
                                <ul className="flex flex-col space-y-4 border-b border-white/20 pb-8">
                                    {navLinks.map(link => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`${pathname == link.href ? 'text-white' : 'text-white/40 hover:text-white'} text-sm font-medium`}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </ul>
                                <button 
                                    className='bg-white text-black max-w-24 rounded-xl px-4 py-3 font-medium hover:scale-105 transition duration-300'
                                    style={{
                                        fontSize: '14px',
                                        lineHeight: '20px'
                                    }}
                                >
                                    Sign in
                                </button>
                            </div>
                            <div className="flex-1" onClick={() => setMenuOpen(false)} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar
