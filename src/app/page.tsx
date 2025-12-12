'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Control de Asistencia
          </h1>
          <p className="text-xl text-gray-600">
            Sistema automático con reconocimiento facial
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Registrar Asistencia - PRINCIPAL */}
          <Link href="/asistencia">
            <div className="bg-white p-10 rounded-xl shadow-2xl hover:shadow-3xl transition transform hover:scale-105 cursor-pointer border-4 border-blue-500">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-14 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Registrar Asistencia
                </h2>
                <p className="text-gray-600 text-lg">
                  Marca tu entrada o salida automáticamente
                </p>
              </div>
            </div>
          </Link>

          {/* Registrar Empleado - ADMIN */}
          <Link href="/registrar">
            <div className="bg-white p-10 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 cursor-pointer border-2 border-gray-200">
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-14 h-14 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Nuevo Empleado
                </h2>
                <p className="text-gray-600 text-lg">
                  Registrar empleado en el sistema
                </p>
                <span className="inline-block mt-3 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                  ADMIN
                </span>
              </div>
            </div>
          </Link>

          {/* Ver Empleados */}
          <Link href="/empleados">
            <div className="bg-white p-10 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 cursor-pointer border-2 border-gray-200">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Lista de Empleados
                </h2>
                <p className="text-gray-600 text-lg">
                  Ver todos los empleados registrados
                </p>
              </div>
            </div>
          </Link>

          {/* Historial de Asistencias */}
          <Link href="/historial">
            <div className="bg-white p-10 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 cursor-pointer border-2 border-gray-200">
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-14 h-14 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Historial
                </h2>
                <p className="text-gray-600 text-lg">
                  Ver asistencias registradas
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}