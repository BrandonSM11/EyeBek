import React from 'react';
import { Scan, Clock, BarChart3, Shield } from 'lucide-react';
import FeatureCard from '@/components/featureCard/FeatureCard';

const features = [
  {
    icon: <Scan className="w-8 h-8" />,
    title: "Reconocimiento Facial IA",
    description: "Precisión del 99.9% en menos de 0.5 segundos",
    accent: true
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Tiempo Real",
    description: "Monitoreo instantáneo desde cualquier dispositivo",
    accent: false
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Anti-Fraude",
    description: "Elimina suplantación y marcajes fantasma",
    accent: false
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-violet-500/10 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-semibold text-violet-400 tracking-widest uppercase">
              Características
            </span>
            <h2 className="text-5xl sm:text-6xl font-bold mt-4 leading-tight">
              Todo lo que necesitas.
              <span className="text-gray-600"> Nada que no.</span>
            </h2>
            <p className="text-xl text-gray-400 mt-6 max-w-md">
              Tecnología de vanguardia diseñada para simplificar, no para complicar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                accent={feature.accent}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;