'use client';
import { Building2, Mail, Phone, MapPin, Lock } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GenericButton from '../../components/GenericButton/GenericButton';
import { createCompany } from '@/services/user';
import { Alert } from '@/components/alertcomponent/alert';

type AlertType = 'success' | 'error';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [alert, setAlert] = useState<{ 
    type: AlertType; 
    message: string; } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address || !form.password) {
      setAlert({ type: "error", message: "Por favor completa todos los campos" });
      return;
    }

    try {

      const res = await createCompany(
        form.name,
        form.email,
        form.phone,
        form.address,
        form.password
      );

      console.log("Registrado:", res);

      setAlert({ type: "success", message: "Empresa registrada con éxito" });

      setTimeout(() => router.push("/login"), 1300);

    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: "Error al registrar la empresa" });
    }
  };

  return (
    <div className='bg-white'>
      <div className='max-w-[1400px] mx-auto px-8 lg:px-12'>
        <div className='max-w-[500px] mx-auto'>

          {alert && (
            <div className="mb-4">
              <Alert type={alert.type} message={alert.message} />
            </div>
          )}

          <div className='text-center mb-6'>
            <h2 className='text-xl lg:text-2xl font-black text-black mb-2'>
              Comienza hoy mismo
            </h2>
            <p className='text-sm lg:text-base text-gray-600 leading-relaxed'>
              Regístrate y comienza a usar EyeBek en minutos. Sin tarjeta de crédito.
            </p>
          </div>

          <div className='bg-gradient-to-b from-gray-50 to-white rounded-xl p-5 lg:p-6 shadow-md border-2 border-gray-200'>
            <div className='flex gap-2 mb-6 bg-gray-200 rounded-xl p-1'>
              <button
                type="button"
                onClick={() => router.push('/register')}
                className="flex-1 py-3 rounded-lg transition-all font-semibold text-sm lg:text-base bg-black text-white shadow-lg"
              >
                Crear cuenta
              </button>

              <button
                type="button"
                onClick={() => router.push('/login')}
                className="flex-1 py-3 rounded-lg transition-all font-semibold text-sm lg:text-base text-gray-600 hover:text-black"
              >
                Iniciar sesión
              </button>
            </div>

            <form className='space-y-4' onSubmit={handleSubmit}>

              <label className="block text-gray-700 mb-2 font-semibold text-sm">
                Nombre de la empresa
              </label>
              <div className="relative mb-4">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Mi empresa S.A."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black"
                />
              </div>

              <label className="block text-gray-700 mb-2 font-semibold text-sm">
                Teléfono
              </label>
              <div className="relative mb-4">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="+57 300 123 4567"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black"
                />
              </div>

              <label className="block text-gray-700 mb-2 font-semibold text-sm">
                Correo electrónico
              </label>
              <div className="relative mb-4">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="contacto@empresa.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black"
                />
              </div>

              <label className="block text-gray-700 mb-2 font-semibold text-sm">
                Dirección
              </label>
              <div className="relative mb-4">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="calle 93 # 34sur-45"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black"
                />
              </div>

              <label className="block text-gray-700 mb-2 font-semibold text-sm">
                Contraseña
              </label>
              <div className="relative mb-4">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="**********"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black"
                />
              </div>

              <div className="mt-6">
                <GenericButton
                  textButton='Crear cuenta gratis'
                  type='submit'
                  variant='black'
                  size='full'
                />
              </div>

              <p className="text-center text-gray-600 flex justify-center gap-2 text-sm">
                ¿Ya tienes cuenta?
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-black font-semibold hover:underline"
                >
                  Inicia sesión aquí
                </button>
              </p>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 lg:gap-6 mt-8 text-gray-600 flex-wrap text-xs lg:text-sm">
          <div className="flex items-center gap-2">
            <div className='w-4 h-4 bg-black rounded-full flex items-center justify-center'>
              <span className="text-white text-xs">✓</span>
            </div>
            <span>14 días de prueba</span>
          </div>

          <div className="flex items-center gap-2">
            <div className='w-4 h-4 bg-black rounded-full flex items-center justify-center'>
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Sin tarjeta requerida</span>
          </div>

          <div className="flex items-center gap-2">
            <div className='w-4 h-4 bg-black rounded-full flex items-center justify-center'>
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Cancela cuando quieras</span>
          </div>
        </div>

      </div>
    </div>
  );
}
