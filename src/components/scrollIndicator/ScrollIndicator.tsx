import React from 'react';

const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
      <span className="text-xs tracking-widest uppercase">Scroll</span>
      <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
        <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default ScrollIndicator;