import React from 'react';

interface StatItemProps {
  value: string;
  label: string;
  accent?: string;
}

const StatItem = ({ value, label, accent }: StatItemProps) => {
  // Separar el número del símbolo para colorear
  const parts = value.match(/([<]?\d+\.?\d*)(.*)/);
  
  return (
    <div>
      <div className="text-4xl font-bold">
        {parts ? (
          <>
            {parts[1]}
            <span className="text-violet-500">{parts[2]}</span>
          </>
        ) : (
          value
        )}
      </div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );
};

export default StatItem;