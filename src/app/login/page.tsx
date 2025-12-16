'use client';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GenericButton from '@/components/GenericButton/GenericButton';
// @ts-expect-error no types
import { Alert } from '@/components/alertcomponent/alert.tsx';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Por favor completa todos los campos');
      setMessageType('error');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        setMessage('Inicio de sesión exitoso');
        setMessageType('success');

        setTimeout(() => {
          router.push('/dashboard_company');
        }, 1500);
      } else if (result?.error) {
        setMessage(result.error || 'Error al iniciar sesión');
        setMessageType('error');
      } else {
        setMessage('Error desconocido. Intenta de nuevo');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error de conexión. Verifica tu internet');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="max-w-[500px] mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-black text-black mb-3">
              Bienvenidos de vuelta
            </h2>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
              Ingresa a tu cuenta para gestionar las asistencias de tu empresa
            </p>
          </div>

          {/* Card Principal */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-200">
            {/* Alerta de mensaje */}
            {message && (
              <div className="mb-6">
                <Alert
                  type={messageType}
                  title={messageType === 'success' ? '¡Éxito!' : 'Error'}
                  message={message}
                  onClose={() => setMessage('')}
                />
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Campo Email */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold text-sm">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="contacto@empresa.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Campo Password */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold text-sm">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder="**********"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:cursor-not-allowed"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>


              {/* Botón Submit */}
              <div className="mt-8">
                <GenericButton
                  textButton={loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  type="submit"
                  variant="black"
                  size="full"
                />
              </div>
            </form>
          </div>
        </div>


      </div>
    </div>
  );
}