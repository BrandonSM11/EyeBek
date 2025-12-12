'use client'

import { useRef, useState } from 'react'
import Webcam from 'react-webcam'

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void
  onError: (error: string) => void
}

export default function WebcamCapture({ onCapture, onError }: WebcamCaptureProps) {
  const webcamRef = useRef<Webcam>(null)
  const [capturing, setCapturing] = useState(false)

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      onCapture(imageSrc)
      setCapturing(false)
    } else {
      onError('No se pudo capturar la imagen')
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden bg-gray-900">
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
          onUserMedia={() => setCapturing(true)}
          onUserMediaError={() => onError('No se pudo acceder a la cámara. Verifica los permisos.')}
        />

        {!capturing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Iniciando cámara...</p>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={capture}
        disabled={!capturing}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        Capturar Foto
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Asegurate de estar en un lugar bien iluminado y mirar directamente a la camara.
        </p>
      </div>
    </div>
  )
}
