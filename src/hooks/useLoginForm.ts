'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoginFormData, LoginFormErrors, UseLoginFormReturn } from '@/types/auth.types';

export const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validación de email
  const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return 'El email es requerido';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email inválido';
    }
    
    return undefined;
  };

  // Validación de password
  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return 'La contraseña es requerida';
    }
    
    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return undefined;
  };

  // Validar todo el formulario
  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validación en tiempo real
    if (name === 'email') {
      const error = validateEmail(value);
      setErrors(prev => ({
        ...prev,
        email: error,
      }));
    }
    
    if (name === 'password') {
      const error = validatePassword(value);
      setErrors(prev => ({
        ...prev,
        password: error,
      }));
    }
  };

  // Limpiar error específico
  const clearError = (field: keyof LoginFormErrors) => {
    setErrors(prev => ({
      ...prev,
      [field]: undefined,
    }));
  };

  // Manejar submit del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Limpiar error general
    setErrors(prev => ({ ...prev, general: undefined }));
    
    // Validar formulario
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({
          general: result.error || 'Error al iniciar sesión',
        });
        return;
      }

      if (result?.ok) {
        // Login exitoso - redirigir
        router.push('/dashboard'); // REDIRECCIONAMIENTO
        router.refresh();
      }
    } catch (error: any) {
      setErrors({
        general: error.message || 'Error inesperado al iniciar sesión',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    clearError,
  };
};