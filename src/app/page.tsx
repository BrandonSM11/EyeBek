'use client'
import React from 'react';
import { Camera, Users, Clock, Shield, BarChart3, ArrowRight, Sparkles, Scan } from 'lucide-react';

import GenericButton from '@/components/GenericButton/GenericButton';
import FeatureCard from '@/components/featureCard/FeatureCard';
import StepCard from '@/components/stepCard/StepCard';
import OrbitingRings from '@/components/orbitingring/OrbitingRings';
import { useRouter } from 'next/navigation';

const EyebekHome = () => {
  const router = useRouter();
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

  const steps = [
    { number: "01", title: "Registra", desc: "Captura facial en segundos" },
    { number: "02", title: "Detecta", desc: "IA identifica automáticamente" },
    { number: "03", title: "Registra", desc: "Registra asistencias" },
  ];

  const stats = [
    { value: "99.9%", label: "Precisión" },
    { value: "<0.5s", label: "Detección" },
    { value: "24/7", label: "Monitoreo" }
  ];

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 border border-gray-100 rounded-full" />
          <div className="absolute top-40 right-20 w-96 h-96 border border-gray-100 rounded-full" />
          <div className="absolute bottom-20 left-1/4 w-64 h-64 border border-gray-100 rounded-full" />
          
          {/* Puntos de fondo estáticos */}
          {[...Array(15)].map((_, i) => (
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
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
                El futuro<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">del control</span><br />
                de asistencia
              </h1>

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
                icon={<ArrowRight className="w-5 h-5" />}
                className="hover:shadow-violet-500/20"
              />
              </div>

              <div className="flex gap-12 pt-8 border-t border-gray-100">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <OrbitingRings />
          </div>
        </div>

        {/* Scroll Indicator Inline */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-violet-500 tracking-widest uppercase">Proceso</span>
            <h2 className="text-5xl sm:text-6xl font-bold mt-4">
              Simple como<span className="text-gray-300"> 1, 2, 3</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                title={step.title}
                description={step.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-violet-500/10 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-violet-400 tracking-widest uppercase">Características</span>
              <h2 className="text-5xl sm:text-6xl font-bold mt-4 leading-tight">
                Todo lo que necesitas.<span className="text-gray-600"> Nada que no.</span>
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


      {/* CTA SECTION */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl blur-2xl opacity-20 animate-pulse" />
            <div className="relative bg-black text-white p-12 sm:p-20 rounded-3xl">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                ¿Listo para modernizar tu control de asistencia?
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
                Únete a las empresas que ya eliminaron el fraude.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GenericButton 
                  textButton="Empezar ahora" 
                  type="button" 
                  size="lg" 
                  variant="white"
                  icon={<ArrowRight className="w-5 h-5"/>}
                />
                <GenericButton 
                  textButton="Hablar con ventas" 
                  type="button" 
                  size="lg" 
                  variant="ghost" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EyebekHome;