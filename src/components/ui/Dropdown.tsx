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
                className={`flex items-center justify-between px-4 py-2 border border-transparent hover:border-[#050801] hover:bg-[#050801]/5 rounded-xs cursor-pointer transition-all duration-200 ease-in-out ${
                    open && '!border-[#050801] bg-[#050801]/5'
                }`}
            >
                <span className='text-[#050801] font-medium'>{selected}</span>
                <Image
                src={arrow}
                alt="arrow"
                width={22}
                height={22}
                className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </div>

            {open && (
                <ul className={`absolute mt-2 bg-[#050801] text-[#FDC830] rounded-xs shadow-sm z-10 p-1.5 ${widthClass ?? 'w-full'}`}>
                    {options.map((option) => (
                        <li
                        key={option}
                        onClick={() => {
                            onChange(option);
                            setOpen(false);
                        }}
                        className={`px-4 py-2 cursor-pointer bg-[#050801]  ${
                            option === selected ? 'font-semibold text-[#050801] bg-[#FDC830] ' : 'hover:bg-[#FDC830]/5 hover:pl-6 transition-all duration-200 ease-in-out'
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
