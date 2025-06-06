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
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
};

const Input: React.FC<InputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    type = 'text',
    onBlur,
    error,
    className = '',
}) => {
    const isFrom = name === 'whereFrom';
    const icon = isFrom ? location : landing;
    // const iconSize = isFrom ? 26 : 24;

  // Icon classes based on value
    const iconClasses = value
        ? 'absolute top-1/2 -translate-y-1/2 left-3 opacity-100 z-10'
        : 'absolute top-1/2 -translate-y-1/2 left-0 opacity-0 group-hover:left-2 group-hover:opacity-100 group-active:opacity-100 group-active:left-3 transition-all duration-300 ease-in-out w-8 h-8 2xl:w-9 2xl:h-9';

    return (
        <div className={`relative group w-full mt-0 mb-0 max-w-96 2xl:max-w-[30rem] shadow-lg rounded-xl ${className}`}>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required
                className={`w-full px-4 py-4 pl-12 outline-none bg-[#fffefc] rounded-xl placeholder:text-black/50 text-black text-base placeholder:text-base transition duration-150 ease-in-out 
                ${error ? 'border-red-500' : ''} focus:-translate-y-0.5 focus:shadow-xl`}
            />
            <Image
                src={icon}
                alt="icon"
                width={12}
                height={12}
                style={{
                    width: '2rem',
                    height: '2rem'
                }}
                className={iconClasses}
            />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default Input;
