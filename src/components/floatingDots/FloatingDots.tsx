import React from 'react';

interface FloatingDotsProps {
  count?: number;
}

const FloatingDots = ({ count = 15 }: FloatingDotsProps) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gray-300 rounded-full animate-pulse"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
            animationDelay: `${i * 0.15}s`
          }}
        />
      ))}
    </>
  );
};

export default FloatingDots;