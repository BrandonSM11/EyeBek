import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: boolean;
}

const FeatureCard = ({ icon, title, description, accent = false }: FeatureCardProps) => {
  return (
    <div 
      className={`
        group p-6 rounded-2xl border transition-all duration-300 hover:scale-105
        ${accent 
          ? 'bg-violet-500 border-violet-400 text-white' 
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-violet-500/50'
        }
      `}
    >
      <div className={`mb-4 ${accent ? 'text-white' : 'text-violet-400'}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className={`text-sm ${accent ? 'text-violet-100' : 'text-gray-400'}`}>
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;