import React from 'react';

type TabSelectorProps = {
    activeTab: 'flight' | 'hotels' | 'car';
        onSelect: (tab: 'flight' | 'hotels' | 'car') => void;
    };

    const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onSelect }) => {
    const tabs: ('flight' | 'hotels' | 'car')[] = ['flight', 'hotels', 'car'];

    return (
        <ul className="flex text-sky-400 bg-white text-center rounded-t-2xl   ">
            {tabs.map((type) => (
                <li key={type} className="w-1/3">
                    <button
                        onClick={() => onSelect(type)}
                        className={`w-full py-4 hover:bg-white/20 tracking-wider text-lg ${
                        activeTab === type ? 'bg-skyBlue rounded-t-2xl text-white font-medium  ' : ''
                        } `}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TabSelector;
