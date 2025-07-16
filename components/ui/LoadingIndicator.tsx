import React from 'react';

interface LoadingIndicatorProps {
  size?: number | string; // e.g. 32, '2rem', '32px'
  colorClass?: string; // Tailwind or custom class for color
  ringClass?: string; // Optional for secondary ring
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 64,
  colorClass = 'border-[var(--primary-incentronaut)]',
  ringClass = 'border-blue-400',
}) => {
  const sizeStyle = typeof size === 'number' ? `${size}px` : size;
  return (
    <div className="relative mb-8" style={{ width: sizeStyle, height: sizeStyle }}>
      <div
        className={`w-full h-full border-8 ${colorClass}/20 border-t-[var(--primary-incentronaut)] rounded-full animate-spin`}
      ></div>
      <div
        className={`absolute inset-0 w-full h-full border-4 ${ringClass}/20 border-t-blue-400 rounded-full animate-spin animate-reverse`}
        style={{ animationDuration: '1.5s' }}
      ></div>
    </div>
  );
}; 