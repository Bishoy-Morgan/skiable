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
        <div className={`relative w-36 ${className} `} ref={dropdownRef}>
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center justify-between px-4 py-2 hover:bg-white/30 rounded cursor-pointer"
            >
                <span>{selected}</span>
                <Image
                src={arrow}
                alt="arrow"
                width={22}
                height={22}
                className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </div>

            {open && (
                <ul className={`absolute mt-2 bg-white text-[#373d43] rounded-lg shadow-md z-10 ${widthClass ?? 'w-full'}`}>
                {options.map((option) => (
                    <li
                    key={option}
                    onClick={() => {
                        onChange(option);
                        setOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-sky-100 rounded-lg ${
                        option === selected ? 'bg-sky-100 font-semibold' : ''
                    }`}
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
