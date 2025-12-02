'use client';
import { Mail, Lock } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import GenericButton from '../../components/GenericButton/GenericButton';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className='bg-white'>
      <div className='max-w-[1400px] mx-auto px-8 lg:px-12'>
        <div className='max-w-[500px] mx-auto'>
          <div className='text-center mb-6'>
            <h2 className='text-xl lg:text-2xl font-black text-black mb-2'>
              Bienvenidos de vuelta
            </h2>
            <p className='text-sm lg:text-base text-gray-600 leading-relaxed'>
              Ingresa a tu cuenta para gestionar las asistencias de tu empresa
            </p>
          </div>
          <div className='bg-gradient-to-b from-gray-50 to-white rounded-xl p-5 lg:p-6 shadow-md border-2 border-gray-200'>
            <div className='flex gap-2 mb-6 bg-gray-200 rounded-xl p-1'>
              <button
                type="button"
                onClick={() => router.push('/register')}
                className="flex-1 py-3 rounded-lg transition-all font-semibold text-sm lg:text-base text-gray-600 hover:text-black"
              >
                Crear cuenta
              </button>
              <button
                type="button"
                className="flex-1 py-3 rounded-lg transition-all font-semibold text-sm lg:text-base bg-black text-white shadow-lg"
              >
                Iniciar sesión
              </button>
            </div>
            <form className='space-y-4'>
              <label className="block text-gray-700 mb-2 font-semibold text-sm">
                Correo electrónico
              </label>
              <div className="relative mb-4">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="email"
                  placeholder="contacto@empresa.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black"
                />
              </div>

              <label className="block text-gray-700 mb-2 font-semibold text-sm">
                Contraseña
              </label>
              <div className="relative mb-4">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="password"
                  placeholder="**********"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 cursor-pointer" />
                  <span className="text-gray-600">Recordarme</span>
                </label>
                <button
                  type="button"
                  className="text-black font-semibold hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div className="mt-8">
                <GenericButton textButton='Iniciar sesión' type='submit' variant='black' size='full' />
              </div>

              <p className="text-center text-gray-600 flex justify-center gap-2">
                ¿No tienes cuenta?
                <button
                  type="button"
                  onClick={() => router.push('/register')}
                  className="text-black font-semibold hover:underline"
                >
                  Regístrate gratis
                </button>
              </p>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 lg:gap-8 mt-10 text-gray-600 flex-wrap text-sm lg:text-base">
          <div className="flex items-center gap-2">
            <div className='w-5 h-5 bg-black rounded-full flex items-center justify-center'>
              <span className="text-white text-xs">✓</span>
            </div>
            <span>14 días de prueba</span>
          </div>
          <div className="flex items-center gap-2">
            <div className='w-5 h-5 bg-black rounded-full flex items-center justify-center'>
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Sin tarjeta requerida</span>
          </div>
          <div className="flex items-center gap-2">
            <div className='w-5 h-5 bg-black rounded-full flex items-center justify-center'>
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Cancela cuando quieras</span>
          </div>
        </div>
      </div>
    </div>
  );
}