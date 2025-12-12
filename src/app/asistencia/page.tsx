'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Webcam from 'react-webcam'

export default function AsistenciaPage() {
  const webcamRef = useRef<Webcam>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [countdown, setCountdown] = useState<number | null>(null)
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const scanFace = useCallback(async () => {
    if (!webcamRef.current || !scanning) return

    const imageSrc = webcamRef.current.getScreenshot()
    if (!imageSrc) return

    try {
      const response = await fetch('/api/asistencia-automatica', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foto_base64: imageSrc
        })
      })

      const data = await response.json()

      if (data.success && data.empleado) {
        setResult(data)
        setScanning(false)

        setTimeout(() => {
          setResult(null)
          setError('')
        }, 8000)
      }
    } catch (err) {
      console.error('Error al escanear:', err)
      setError('Error de conexion. Verifica que el servidor este corriendo.')
      setScanning(false)
    }
  }, [scanning])

  useEffect(() => {
    if (scanning) {
      scanIntervalRef.current = setInterval(scanFace, 1000)
    } else {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current)
      }
    }

    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current)
      }
    }
  }, [scanning, scanFace])

  const startScanning = () => {
    setError('')
    setResult(null)
    setCountdown(3)

    const countInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countInterval)
          setScanning(true)
          return null
        }
        return prev! - 1
      })
    }, 1000)
  }

  const stopScanning = () => {
    setScanning(false)
    setCountdown(null)
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-lg font-semibold">
            ← Volver al menu
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            Control de Asistencia
          </h1>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Colócate frente a la cámara para registrar tu entrada o salida
          </p>

          <div className="relative rounded-xl overflow-hidden bg-gray-900 mb-6">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user"
              }}
              className="w-full"
              onUserMediaError={() => setError('No se pudo acceder a la camara')}
            />

            {scanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-4 border-blue-500 rounded-full w-64 h-64 animate-pulse"></div>
              </div>
            )}

            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-white text-9xl font-bold animate-ping">
                  {countdown}
                </div>
              </div>
            )}

            {scanning && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                  Escaneando rostro...
                </div>
              </div>
            )}
          </div>

          {!result && (
            <div className="space-y-4">
              {!scanning && countdown === null ? (
                <button
                  onClick={startScanning}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition transform hover:scale-105 shadow-lg"
                >
                  Iniciar Reconocimiento
                </button>
              ) : (
                <button
                  onClick={stopScanning}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition"
                  disabled={countdown !== null}
                >
                  Detener
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mt-4">
              <p className="text-red-800 font-semibold text-center">{error}</p>
            </div>
          )}

          {result && (
            <div className={`${result.tipo === 'entrada' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'} border-2 rounded-xl p-8 mt-4 animate-fadeIn`}>
              <div className="text-center">
                <div className="text-7xl mb-4">
                  {result.tipo === 'entrada' ? '👋' : '✅'}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {result.tipo === 'entrada' ? 'Bienvenido' : 'Hasta luego'}
                </h2>
                <p className="text-2xl text-gray-800 mb-6">
                  {result.empleado.nombre}
                </p>

                <div className="bg-white rounded-lg p-6 space-y-3 text-left max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Tipo:</span>
                    <span className={`font-bold ${result.tipo === 'entrada' ? 'text-green-600' : 'text-blue-600'}`}>
                      {result.tipo === 'entrada' ? 'ENTRADA' : 'SALIDA'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Hora:</span>
                    <span className="text-gray-900">{result.hora}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Fecha:</span>
                    <span className="text-gray-900">{result.fecha}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Confianza:</span>
                    <span className="text-gray-900">{result.empleado.confianza}%</span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mt-6">
                  Esta ventana se cerrara automaticamente en 5 segundos...
                </p>
              </div>
            </div>
          )}

          {!scanning && !result && countdown === null && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3 text-lg">Instrucciones:</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Colócate frente a la cámara con buena iluminación</li>
                <li>• Presiona Iniciar Reconocimiento</li>
                <li>• Espera a que el sistema reconozca tu rostro</li>
                <li>• El sistema registrará automáticamente tu entrada o salida</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
