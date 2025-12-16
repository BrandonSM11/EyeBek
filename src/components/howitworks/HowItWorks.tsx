import React from 'react';
import StepCard from '@/components/stepCard/StepCard';

const steps = [
  { number: "01", title: "Registra", desc: "Captura facial en segundos" },
  { number: "02", title: "Detecta", desc: "IA identifica automáticamente" },
];

const HowItWorks = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-sm font-semibold text-violet-500 tracking-widest uppercase">
            Proceso
          </span>
          <h2 className="text-5xl sm:text-6xl font-bold mt-4">
            Simple como
            <span className="text-gray-300"> 1, 2, 3</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              title={step.title}
              description={step.desc}
              showArrow={index < steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;