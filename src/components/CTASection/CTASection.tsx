import React from 'react';
import { ArrowRight } from 'lucide-react';
import GenericButton from '@/components/GenericButton/GenericButton';

const CTASection = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl blur-2xl opacity-20 animate-pulse" />
          <div className="relative bg-black text-white p-12 sm:p-20 rounded-3xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              ¿Listo para modernizar tu control de asistencia?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Únete a las empresas que ya eliminaron el fraude y optimizaron su gestión de personal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GenericButton
                textButton="Empezar ahora"
                type="button"
                size="lg"
                variant="white"
                icon={<ArrowRight className="w-5 h-5" />}
              />
              <GenericButton
                textButton="Hablar con ventas"
                type="button"
                size="lg"
                variant="ghost"
              />
            </div>
            <p className="mt-8 text-sm text-gray-500">
              Sin tarjeta de crédito • Configuración en 5 minutos • Soporte 24/7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;