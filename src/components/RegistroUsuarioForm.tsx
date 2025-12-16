'use client';

import React, { useRef, useState } from 'react';
import { Camera, X, Upload, Check } from 'lucide-react';
import GenericButton from '@/components/GenericButton/GenericButton';

interface FormData {
  name: string;
  document: string;
  phone: string;
  email: string;
  password: string;
  photo: string;
  type?: string;
}

interface FormErrors {
  name?: string;
  document?: string;
  phone?: string;
  email?: string;
  password?: string;
  photo?: string;
}

interface RegistroUsuarioFormProps {
  userType?: string;
  isEditMode?: boolean;
  coderId?: string;
  onSuccess?: () => void;
}

export default function RegistroUsuarioForm({
  userType = 'coder',
  isEditMode = false,
  coderId,
  onSuccess
}: RegistroUsuarioFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    document: '',
    phone: '',
    email: '',
    password: '',
    photo: '',
    type: userType,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [showCamera, setShowCamera] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar datos si es edición
  React.useEffect(() => {
    if (isEditMode && coderId) {
      loadCoderData();
    }
  }, [isEditMode, coderId]);

  const loadCoderData = async () => {
    try {
      setLoadingData(true);

      // Usar el endpoint apropiado según el tipo de usuario
      const endpoint = userType === 'administrator'
        ? `/api/admin/${coderId}`
        : `/api/coder/${coderId}`;

      const response = await fetch(endpoint);

      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name || '',
          document: data.document || '',
          phone: data.phone || '',
          email: data.email || '',
          password: '', // Seguridad: no cargar password
          photo: data.photo || '',
          type: userType,
        });
        if (data.photo) {
          setPhotoPreview(data.photo);
        }
      } else {
        alert('Error al cargar los datos del usuario');
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
      alert('Error de conexión al cargar datos');
    } finally {
      setLoadingData(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.document.trim()) {
      newErrors.document = 'El documento es requerido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'El teléfono debe tener al menos 7 dígitos';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // En modo edición, la contraseña es opcional
    if (!isEditMode) {
      if (!formData.password) {
        newErrors.password = 'La contraseña es requerida';
      } else if (formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
    } else {
      // En modo edición, validar solo si se proporciona una nueva contraseña
      if (formData.password && formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
    }

    if (!formData.photo) {
      newErrors.photo = 'La foto es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Iniciar cámara
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Esperar a que el video esté listo para obtener las dimensiones
        videoRef.current.onloadedmetadata = () => {
          if (canvasRef.current) {
            canvasRef.current.width = videoRef.current!.videoWidth;
            canvasRef.current.height = videoRef.current!.videoHeight;
          }
        };
        setShowCamera(true);
      }
    } catch (error) {
      alert('No se pudo acceder a la cámara. Asegúrate de dar permisos.');
      console.error('Error de cámara:', error);
    }
  };

  // Capturar foto desde la cámara
  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const imageData = canvasRef.current.toDataURL('image/jpeg', 0.9);
        setPhotoPreview(imageData);
        setFormData({ ...formData, photo: imageData });
        stopCamera();
      } else {
        console.error('❌ No se pudo obtener el contexto del canvas');
      }
    } else {
      console.error('❌ Canvas o video no disponible');
    }
  };

  // Detener cámara
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setShowCamera(false);
    }
  };

  // Manejar subida de archivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setPhotoPreview(imageData);
        setFormData({ ...formData, photo: imageData });
      };
      reader.readAsDataURL(file);
    }
  };

  // Subir a Cloudinary
  const uploadToCloudinary = async (base64Image: string): Promise<string | null> => {
    try {
      const formDataCloud = new FormData();

      // Convertir base64 a blob
      const blob = await fetch(base64Image).then(res => res.blob());
      formDataCloud.append('file', blob);

      // Agregar el upload preset
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      if (!uploadPreset) {
        throw new Error('Upload preset no configurado');
      }
      formDataCloud.append('upload_preset', uploadPreset);

      // Configurar carpeta para almacenamiento
      formDataCloud.append('folder', 'eyebek/users');

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) {
        throw new Error('Cloud name no configurado');
      }

      console.log('Subiendo a Cloudinary...');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formDataCloud,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Error Cloudinary:', data);
        throw new Error(data.error?.message || 'Error al subir la imagen');
      }

      if (!data.secure_url) {
        throw new Error('No se recibió URL de la imagen');
      }

      console.log('Imagen subida exitosamente:', data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error('Error en uploadToCloudinary:', error);
      alert(`Error al subir imagen: ${error}`);
      return null;
    }
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Subir foto a Cloudinary solo si es una imagen nueva en base64
      let photoUrl = formData.photo;
      if (formData.photo.startsWith('data:')) {
        photoUrl = (await uploadToCloudinary(formData.photo)) || formData.photo;
      }

      // Preparar datos para enviar
      const dataToSend: Record<string, unknown> = {
        name: formData.name,
        document: formData.document,
        phone: formData.phone,
        email: formData.email,
        photo: photoUrl,
      };

      // Solo incluir contraseña si se proporcionó
      if (formData.password) {
        dataToSend.password = formData.password;
      }

      if (!isEditMode) {
        dataToSend.type = formData.type;
      }

      // Enviar datos al servidor
      const apiUrl = isEditMode
        ? (userType === 'administrator' ? `/api/admin/${coderId}` : `/api/coder/${coderId}`)
        : '/api/admin/register';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);

        if (!isEditMode) {
          // Solo limpiar el formulario si no está en modo edición
          setFormData({
            name: '',
            document: '',
            phone: '',
            email: '',
            password: '',
            photo: '',
          });
          setPhotoPreview('');
        }

        setTimeout(() => {
          setSuccess(false);
          if (onSuccess) {
            onSuccess();
          }
        }, 2000);
      } else {
        const errorMsg = isEditMode
          ? data.error || 'Error al actualizar'
          : data.message || 'Error al registrar';
        setErrors({ ...errors, email: errorMsg });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ ...errors, email: 'Error de conexión' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  if (loadingData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <p className="text-center text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditMode ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
      </h2>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-semibold flex items-center gap-2">
            <Check size={20} /> Usuario {isEditMode ? 'actualizado' : 'registrado'} exitosamente
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Juan Pérez"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${errors.name
              ? 'border-red-500 focus:border-red-600 bg-red-50'
              : 'border-gray-300 focus:border-black'
              }`}
            disabled={loading}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Documento */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Documento *
          </label>
          <input
            type="text"
            name="document"
            value={formData.document}
            onChange={handleChange}
            placeholder="1234567890"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${errors.document
              ? 'border-red-500 focus:border-red-600 bg-red-50'
              : 'border-gray-300 focus:border-black'
              }`}
            disabled={loading}
          />
          {errors.document && <p className="text-red-600 text-sm mt-1">{errors.document}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+57 300 123 4567"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${errors.phone
              ? 'border-red-500 focus:border-red-600 bg-red-50'
              : 'border-gray-300 focus:border-black'
              }`}
            disabled={loading}
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="juan@example.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${errors.email
              ? 'border-red-500 focus:border-red-600 bg-red-50'
              : 'border-gray-300 focus:border-black'
              }`}
            disabled={loading}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contraseña {isEditMode ? '(Opcional)' : '*'}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={isEditMode ? "Dejar en blanco para mantener la actual" : "Mínimo 6 caracteres"}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${errors.password
              ? 'border-red-500 focus:border-red-600 bg-red-50'
              : 'border-gray-300 focus:border-black'
              }`}
            disabled={loading}
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Foto */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Foto *
          </label>

          {!photoPreview && !showCamera && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center gap-4">


                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={loading}
                >
                  <Upload className="w-5 h-5" />
                  Subir Archivo
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {showCamera && (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-80 bg-black object-cover"
              />
              <canvas
                ref={canvasRef}
                className="hidden"
              />
              <div className="flex gap-2 p-4 bg-gray-100">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <Camera size={18} /> Capturar Foto
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <X size={18} /> Cancelar
                </button>
              </div>
            </div>
          )}

          {photoPreview && !showCamera && (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <img
                src={photoPreview}
                alt="Vista previa"
                className="w-full h-80 object-cover"
              />
              <div className="flex gap-2 p-4 bg-gray-100">
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  disabled={loading}
                >
                  Tomar otra foto
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview('');
                    setFormData({ ...formData, photo: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <X className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          )}

          {errors.photo && <p className="text-red-600 text-sm mt-2">{errors.photo}</p>}
        </div>

        {/* Botón Submit */}
        <div className="pt-4">
          <GenericButton
            textButton={
              loading
                ? (isEditMode ? 'Actualizando...' : 'Registrando...')
                : (isEditMode ? 'Actualizar Usuario' : 'Registrar Usuario')
            }
            type="submit"
            variant="black"
            size="full"
            disabled={loading || loadingData}
          />
        </div>
      </form>
    </div>
  );
}
