'use client';

import Image from 'next/image';
import React from 'react';
import location from '@/public/icons/location.svg';
import landing from '@/public/icons/landing.svg';

type InputProps = {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
    className?: string;
};

const Input: React.FC<InputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    type = 'text',
    error,
    className = '',
}) => {
    const isFrom = name === 'whereFrom';
    const icon = isFrom ? location : landing;
    const iconSize = isFrom ? 30 : 28;

  // Icon classes based on value
    const iconClasses = value
        ? 'absolute top-1/2 -translate-y-1/2 left-3 opacity-100  w-8 h-8 2xl:w-10 2xl:h-10 '
        : 'absolute top-1/2 -translate-y-1/2 left-0 opacity-0 group-hover:left-2 group-hover:opacity-100 group-active:opacity-100 group-active:left-3 transition-all duration-300 ease-in-out w-8 h-8 2xl:w-10 2xl:h-10';

    return (
        <div className={`relative group w-full mt-0 mb-0 max-w-96 2xl:max-w-[30rem] ${className}`}>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-4 2xl:py-5 pl-11 2xl:pl-12 border border-transparent outline-none bg-[#fffdf5] rounded-xs placeholder:text-[#050801]/70 text-[#050801] 2xl:placeholder:text-xl 2xl:text-xl transition duration-150 ease-in-out focus:border-[#050801] focus:bg-[#fffdf5] active:bg-[#fffdf5]
                ${error ? 'border-red-500' : ''} focus:-translate-y-0.5 `}
            />
            <Image
                src={icon}
                alt="icon"
                width={iconSize}
                height={iconSize}
                className={iconClasses}
            />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default Input;
