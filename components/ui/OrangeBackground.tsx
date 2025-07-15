import React from 'react';

interface OrangeBackgroundProps {
  className?: string;
}

export const OrangeBackground: React.FC<OrangeBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -top-1/2 -left-1/4 w-[110%] h-[106%] bg-[#ff5201] rounded-[25%] transform rotate-16 -skew-x-6 opacity-90"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400 to-orange-500 rounded-full blur-3xl opacity-50 animate-float"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-tr from-orange-600 to-orange-500 rounded-full blur-2xl opacity-40 animate-float animate-reverse"></div>
    </div>
  );
}; 