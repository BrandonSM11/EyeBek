import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Badge from '@/components/badge/Badge';
import StatItem from '@/components/statItem/StatItem';
import ScrollIndicator from '@/components/scrollIndicator/ScrollIndicator';
import GenericButton from '@/components/GenericButton/GenericButton';
import FloatingDots from '@/components/floatingDots/FloatingDots';
import OrbitingRings from '@/components/orbitingring/OrbitingRings';
import { useRouter } from 'next/router';

const HeroSection = () => {
  const router = useRouter();
  const stats = [
    { value: "99.9%", label: "Precisión" },
    { value: "<0.5s", label: "Detección" },
    { value: "24/7", label: "Monitoreo" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 border border-gray-100 rounded-full" />
        <div className="absolute top-40 right-20 w-96 h-96 border border-gray-100 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 border border-gray-100 rounded-full" />
        <FloatingDots count={15} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">

            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
                El futuro
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">
                  del control
                </span>
                <br />
                de asistencia
              </h1>
            </div>

            <p className="text-xl text-gray-500 max-w-md leading-relaxed">
              Reconocimiento facial que transforma la gestión de tu equipo. 
              Sin contacto. Sin errores. Sin fraude.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <GenericButton
                textButton="Comienza con nosotros"
                type="button"
                size="md"
                variant="black"
                onClick={()=>router.push('/register')}
                icon={<ArrowRight className="w-5 h-5" />}
                className="hover:shadow-violet-500/20"
              />
              
            </div>

            <div className="flex gap-12 pt-8 border-t border-gray-100">
              {stats.map((stat, index) => (
                <StatItem key={index} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>

          {/* Right - Visual Element */}
          <OrbitingRings />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;