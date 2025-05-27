import Image from 'next/image'
import React, { ReactNode } from 'react'

type ButtonProps = {
    onClick?: () => void
    iconSrc?: string
    iconAlt: string
    children: ReactNode
    className?: string
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    iconSrc,
    iconAlt,
    children,
    className = '',
    disabled = false,
}) => {
    return (
        <button
        onClick={onClick}
        disabled={disabled}
        className={`relative group bg-[#fffefc] text-black rounded-2xl px-6 py-4 font-medium flex items-center gap-x-4 justify-start overflow-hidden transition-all hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        style={{
            fontSize: 'clamp(15px, 1.2vw, 16px)',
            lineHeight: 'clamp(20px, 2vw, 22px)',
        }}
        >
            {iconSrc && (
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    width={30}
                    height={30}
                    className="bg-black rounded-lg p-1 z-10 group-hover:scale-150 transition-discrete duration-300 ease-in-out"
                />
            )}
            <span className="w-56 h-48 rounded bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 "></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                {children}
            </span>
        </button>
    )
}

export default Button
