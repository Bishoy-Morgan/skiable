import React from 'react';

type TabSelectorProps = {
    activeTab: 'flight' | 'hotels' | 'car';
        onSelect: (tab: 'flight' | 'hotels' | 'car') => void;
    };

    const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onSelect }) => {
    const tabs: ('flight' | 'hotels' | 'car')[] = ['flight', 'hotels', 'car'];

    return (
        <ul className="flex text-[#076585] text-center rounded-t-2xl   ">
            {tabs.map((type) => (
                <li key={type} className="w-1/3">
                    <button
                        onClick={() => onSelect(type)}
                        className={`w-full py-4 text-lg ${
                        activeTab === type ? 'font-medium text-xl bg-[#076585] rounded-t-lg text-[#f5ffff] ' : ''
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
