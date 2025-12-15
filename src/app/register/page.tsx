'use client';
import { Building2, Mail, Phone, MapPin, Lock } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GenericButton from '../../components/GenericButton/GenericButton';
import { Alert } from '@/components/alertcomponent/alert';
import { createCompany, sendEmail} from '@/services/user';

type AlertType = 'success' | 'error';

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [alert, setAlert] = useState<{ 
    type: AlertType; 
    message: string; } | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre de la empresa es requerido";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Ingresa un correo válido (ejemplo@dominio.com)";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (form.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = "El teléfono debe tener al menos 7 dígitos";
    }

    if (!form.address.trim()) {
      newErrors.address = "La dirección es requerida";
    } else if (form.address.trim().length < 5) {
      newErrors.address = "La dirección debe tener al menos 5 caracteres";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "La contraseña debe contener al menos un número";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const message = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #000000; padding: 40px 20px; margin: 0;">
    <div style="max-width: 600px; background: #ffffff; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.4);">
      
      
      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; text-align: center; padding: 60px 20px; position: relative;">
        <div style="position: relative; z-index: 1;">
          <img src="" alt="Eyebek Logo" style="max-width: 120px; height: auto; margin: 0 0 20px 0;">
          <div style="height: 3px; background: white; width: 100px; margin: 15px auto; opacity: 0.8;"></div>
          <p style="margin: 15px 0 0 0; font-weight: 300; font-size: 14px; opacity: 0.95; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);">Reconocimiento Facial Inteligente</p>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px 20px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 700;">¡Bienvenido, \${name}!</h2>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Tu cuenta ha sido creada exitosamente</p>
      </div>

      <div style="padding: 40px 30px; color: #000000; line-height: 1.8;">
        <p style="margin: 0 0 10px 0; font-size: 16px;">Hola <strong>\${name}</strong>,</p>
        
        <p style="margin: 0 0 25px 0; font-size: 15px; color: #333;">
          Te damos la más cordial bienvenida a <strong style="color: #000;">Eyebek</strong>. Tu cuenta ha sido creada exitosamente y ahora tienes acceso completo a nuestra plataforma de gestión de asistencia con reconocimiento facial.
        </p>

        <!-- Características -->
        <div style="margin: 30px 0;">
          <p style="font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px 0;"><strong>Qué puedes hacer ahora:</strong></p>
          <ul style="margin: 0; padding-left: 20px; list-style: none;">
            <li style="margin: 8px 0; font-size: 14px; color: #333;"><strong>✓</strong> Acceder a tu panel de control personalizado</li>
            <li style="margin: 8px 0; font-size: 14px; color: #333;"><strong>✓</strong> Registrar asistencia con reconocimiento facial</li>
            <li style="margin: 8px 0; font-size: 14px; color: #333;"><strong>✓</strong> Ver reportes y análisis de asistencia</li>
            <li style="margin: 8px 0; font-size: 14px; color: #333;"><strong>✓</strong> Gestionar usuarios y permisos</li>
          </ul>
        </div>

        <p style="margin: 25px 0 10px 0; font-size: 15px; color: #333;">
          Usa tu correo electrónico y contraseña para acceder a la plataforma.
        </p>
      </div>

      <div style="text-align: center; padding: 0 30px 30px 30px;">
        <a href="https://eyebek.app/login" style="display: inline-block; background: #000000; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 16px; letter-spacing: 0.5px; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
          ACCEDER A MI CUENTA
        </a>
      </div>

      <div style="background: #f9f9f9; padding: 20px 30px; border-top: 1px solid #e0e0e0;">
        <p style="margin: 0; font-size: 12px; color: #999; line-height: 1.6;">
          <strong style="color: #000;">Importante:</strong> Nunca compartas tu contraseña con nadie. Si no fuiste tú quien realizó este registro, por favor contáctanos inmediatamente.
        </p>
      </div>

      <div style="background: #000000; color: white; text-align: center; padding: 30px 20px;">
      
        <p style="margin: 12px 0 0 0; font-size: 11px; color: #888;">
          © 2025 Eyebek. Todos los derechos reservados.
        </p>
      </div>

    </div>
  </div>
  `;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (errors[name as keyof Errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
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

      // Enviar email con el mensaje personalizado
      const emailMessage = message.replace(/\$\{name\}/g, form.name);
      await sendEmail(form.email, "¡Bienvenido a Eyebek!", emailMessage);

      setAlert({ type: "success", message: "Empresa registrada con éxito. Revisa tu correo." });
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
      });

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
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black ${
                    errors.address ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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