import React from 'react';

type ButtonProps = {
    name: string;
};

const Button: React.FC<ButtonProps> = ({ name }) => {
    return (
        <button className="px-8 py-2 border border-[#f5ffff] bg-transparent  ">
            {name}
        </button>
    );
};

export default Button;
