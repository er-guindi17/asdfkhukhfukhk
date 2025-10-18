import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
    <svg 
        viewBox="0 0 100 100" 
        className={className} 
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(-45deg)' }}
    >
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#8A2BE2'}} />
                <stop offset="100%" style={{stopColor: '#4169E1'}} />
            </linearGradient>
        </defs>
        {/* Arrow head */}
        <path d="M50 0 L65 15 L50 30 L35 15 Z" fill="#FFFFFF"/>
        {/* Heart body */}
        <path d="M50 25 C 20 50, 20 80, 50 100 C 80 80, 80 50, 50 25 Z" fill="url(#logoGradient)"/>
    </svg>
);

export default Logo;