import React from 'react';
import { motion } from 'framer-motion';


type TabSelectorProps = {
  activeTab: 'flight' | 'hotels' | 'car';
  onSelect: (tab: 'flight' | 'hotels' | 'car') => void;
};

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onSelect }) => {
  const tabs: ('flight' | 'hotels' | 'car')[] = ['flight', 'hotels', 'car'];

  return (
    <ul className="flex text-black text-center rounded-t-2xl relative overflow-hidden">
      {tabs.map((type) => (
        <li key={type} className="w-1/3 relative z-10">
          <button
            onClick={() => onSelect(type)}
            className={`w-full py-4 text-lg font-bold relative z-20 ${
              activeTab === type ? 'font-extrabold text-xl text-black' : ''
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
          {/* Animate the background highlight */}
          {activeTab === type && (
            <motion.div
              layoutId="tabBackground"
              className="absolute inset-0 bg-[#F5F3ED] rounded-t-2xl z-10"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TabSelector;
