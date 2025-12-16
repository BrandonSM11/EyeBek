import React from 'react';
import { ChevronRight } from 'lucide-react';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  showArrow?: boolean;
}

const StepCard = ({ number, title, description, showArrow = false }: StepCardProps) => {
  return (
    <div className="group relative">
      <div className="bg-white p-10 rounded-3xl border border-gray-100 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-500">
        <span className="text-8xl font-bold text-black-100 group-hover:text-violet-100 transition-colors">
          {number}
        </span>
        <h3 className="text-2xl font-bold mt-4 mb-2">{title}</h3>
        <p className="text-black-500">{description}</p>
      </div>
      {showArrow && (
        <div className="hidden md:block absolute top-1/2 -right-4 z-10">
          <ChevronRight className="w-8 h-8 text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default StepCard;