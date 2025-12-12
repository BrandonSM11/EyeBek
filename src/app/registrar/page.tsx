'use client'

import { useState } from 'react'
import Link from 'next/link'
import WebcamCapture from '@/components/WebcamCapture'

export default function RegistrarPage() {
  const [formData, setFormData] = useState({
    empleado_id: '',
    nombre: '',
    email: ''
  })
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!capturedImage) {
      setError('Debes capturar una foto primero')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/registrar-empleado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          foto_base64: capturedImage
        })
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
        setFormData({ empleado_id: '', nombre: '', email: '' })
        setCapturedImage(null)
      } else {
        setError(data.message || 'Error al registrar empleado')
      }
    } catch (err) {
      setError('Error de conexion con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            ← Volver al inicio
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Registrar Nuevo Empleado
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-semibold">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-semibold">{result.message}</p>
              <button
                onClick={() => setResult(null)}
                className="mt-2 text-green-700 underline"
              >
                Registrar otro empleado
              </button>
            </div>
          )}

          {!result && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Empleado
                </label>
                <input
                  type="text"
                  required
                  value={formData.empleado_id}
                  onChange={(e) => setFormData({...formData, empleado_id: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="EMP001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Juan Perez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="juan@empresa.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto del Empleado
                </label>
                {!capturedImage ? (
                  <WebcamCapture
                    onCapture={setCapturedImage}
                    onError={setError}
                  />
                ) : (
                  <div className="space-y-4">
                    <img src={capturedImage} alt="Captura" className="w-full rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setCapturedImage(null)}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg"
                    >
                      Tomar otra foto
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !capturedImage}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                {loading ? 'Registrando...' : 'Registrar Empleado'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
