import React from 'react';

interface BadgeProps {
  icon: React.ReactNode;
  text: string;
}

const Badge = ({ icon, text }: BadgeProps) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-100 rounded-full">
      <span className="text-violet-500">{icon}</span>
      <span className="text-sm font-medium text-violet-600">{text}</span>
    </div>
  );
};

export default Badge;