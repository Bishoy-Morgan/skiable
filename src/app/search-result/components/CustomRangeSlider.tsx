// components/ui/CustomRangeSlider.tsx

import Image from 'next/image';
import React from 'react';
import triangle from '@/public/icons/triangle.svg'

interface CustomRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

const CustomRangeSlider: React.FC<CustomRangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full relative h-10 flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInput}
        className="absolute w-full h-2 opacity-0 z-20 cursor-pointer"
      />
      <div className="w-full h-2 bg-[#F5F3ED] rounded-full relative z-10">
        <div
          className="h-2 bg-black rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div
        className="absolute top-0 left-0 transform -translate-x-1/2 w-4 h-4 rounded-full z-30"
        style={{ left: `${percentage}%` }}
      >
        <Image 
        src={triangle}
        alt='Triangle'
        width={20}
        height={20}
        style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default CustomRangeSlider;
