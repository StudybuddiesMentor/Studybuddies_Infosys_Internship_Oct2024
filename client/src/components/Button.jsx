import React from 'react';

const Button = ({ label, onClick, bgColor = 'bg-blue-500', hoverColor = 'hover:bg-blue-600', textColor = 'text-white', padding = 'px-4 py-2', rounded = 'rounded-md' }) => {
    return (
        <button 
            className={`${bgColor} ${hoverColor} ${textColor} ${padding} ${rounded} transition duration-300`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default Button;
