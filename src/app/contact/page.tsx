"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, User, Send } from "lucide-react";
import { sendContactMessage } from "../../services/contact";
// @ts-expect-error no types
import { Alert } from '@/components/alertcomponent/alert.tsx';
import GenericButton from '@/components/GenericButton/GenericButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { name: "", email: "", message: "" };
    const emailRegex = /\S+@\S+\.\S+/;
    let hasError = false;

    if (!formData.name) {
      newErrors.name = "El nombre es obligatorio";
      hasError = true;
    }
    if (!formData.email) {
      newErrors.email = "El email es obligatorio";
      hasError = true;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
      hasError = true;
    }
    if (!formData.message) {
      newErrors.message = "El mensaje es obligatorio";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await sendContactMessage(formData);
      setMessage("Mensaje enviado con éxito!");
      setMessageType('success');
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage("Error al enviar el mensaje. Intenta de nuevo");
      setMessageType('error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left Side - Info */}
          <div>
            <p className="text-sm lg:text-base text-gray-500 font-semibold mb-2">Comunícate con nosotros</p>
            <h1 className="text-3xl lg:text-4xl font-black text-black mb-4">
              Ponte en contacto con EyeBek
            </h1>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-8">
              ¿Tienes preguntas sobre nuestro sistema de asistencia con reconocimiento facial? Contáctanos y nuestro equipo te ayudará lo antes posible.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Correo de soporte</p>
                  <p className="text-gray-600 text-sm">soporte@eyebek.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Disponibilidad</p>
                  <p className="text-gray-600 text-sm">Lunes a viernes, 8am - 6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nombre */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold text-sm">
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Tu nombre"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold text-sm">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="tu.correo@ejemplo.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold text-sm">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                                      placeholder="Cuéntanos sobre tu empresa..."
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all text-sm lg:text-base text-black disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Button */}
              <div className="mt-8">
                <GenericButton
                  textButton={loading ? 'Enviando...' : 'Enviar mensaje'}
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
};

export default Contact;