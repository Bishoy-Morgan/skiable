'use client';

import React, { useState, useRef, useEffect } from 'react';
import arrow from '@/public/icons/arrow.svg';
import Image from 'next/image';

type DropdownProps = {
    options: string[];
    selected: string;
    onChange: (value: string) => void;
    className?: string;
    widthClass?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onChange, className = '', widthClass }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setOpen(false);
        }
        };
            document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative min-w-36 max-w-60 ${className} `} ref={dropdownRef}>
            <div
                onClick={() => setOpen((prev) => !prev)}
                className={`flex items-center justify-between px-4 py-2 hover:bg-black/5 rounded-xl cursor-pointer transition-all duration-200 ease-in-out ${
                    open && 'bg-black/5'
                }`}
            >
                <span className='text-black font-medium'>{selected}</span>
                <Image
                src={arrow}
                alt="arrow"
                width={22}
                height={22}
                className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </div>

            {open && (
                <ul className={`absolute mt-2 bg-[#fffefc] text-black rounded-xl shadow-lg p-2 z-10 ${widthClass ?? 'w-full'}`}>
                    {options.map((option) => (
                        <li
                        key={option}
                        onClick={() => {
                            onChange(option);
                            setOpen(false);
                        }}
                        className={`px-4 py-2 cursor-pointer rounded-xl  ${
                            option === selected ? 'font-semibold text-black ' : 'hover:bg-black/5 hover:pl-6 transition-all duration-200 ease-in-out '
                        } `}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
