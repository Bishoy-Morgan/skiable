'use client';

import React from 'react';

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
    return (
        <div className={`w-full max-w-96 ${className}`}>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 border border-transparent rounded-lg outline-none bg-[#f5ffff] shadow-lg placeholder:text-[#373d43]/50 text-[#373d43] transition duration-150 ease-in-out 
                ${error ? 'border-red-500' : ''} focus:border-sky-500`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default Input;
