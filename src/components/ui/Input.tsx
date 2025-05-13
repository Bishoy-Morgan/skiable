'use client';

import Image from 'next/image';
import React from 'react';
import location from '@/public/icons/location.svg';
import earth from '@/public/icons/earth.svg';

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
    const icon = isFrom ? location : earth;
    const iconSize = isFrom ? 30 : 28;

  // Icon classes based on value
    const iconClasses = value
        ? 'absolute top-1/2 -translate-y-1/2 left-3 opacity-100'
        : 'absolute top-1/2 -translate-y-1/2 left-0 opacity-0 group-hover:left-2 group-hover:opacity-100 group-active:opacity-100 group-active:left-3 transition-all duration-300 ease-in-out';

    return (
        <div className={`relative group w-full mt-0 mb-0 max-w-96 ${className}`}>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 pl-10 border border-transparent rounded-lg outline-none bg-[#f5ffff] shadow-lg placeholder:text-[#076585]/70 text-[#076585] transition duration-150 ease-in-out 
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
