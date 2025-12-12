import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sistema de Asistencia con Reconocimiento Facial
          </h1>
          <p className="text-xl text-gray-600">
            Control de asistencia automatizado mediante tecnología de reconocimiento facial
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/asistencia" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="text-6xl mb-4 text-center">📸</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Control de Asistencia
              </h2>
              <p className="text-gray-600 text-center">
                Registra tu entrada o salida con reconocimiento facial automático
              </p>
            </div>
          </Link>

          <Link href="/registrar" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="text-6xl mb-4 text-center">➕</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Registrar Empleado
              </h2>
              <p className="text-gray-600 text-center">
                Agrega nuevos empleados al sistema de reconocimiento facial
              </p>
            </div>
          </Link>

          <Link href="/empleados" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="text-6xl mb-4 text-center">👥</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Ver Empleados
              </h2>
              <p className="text-gray-600 text-center">
                Consulta la lista completa de empleados registrados
              </p>
            </div>
          </Link>

          <Link href="/historial" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="text-6xl mb-4 text-center">📊</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Historial
              </h2>
              <p className="text-gray-600 text-center">
                Revisa el historial completo de asistencias
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Características del Sistema
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-2">Seguro</h4>
              <p className="text-gray-600 text-sm">
                Reconocimiento facial de alta precisión
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Rápido</h4>
              <p className="text-gray-600 text-sm">
                Registro de asistencia en segundos
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <h4 className="font-semibold text-gray-900 mb-2">Completo</h4>
              <p className="text-gray-600 text-sm">
                Historial detallado de todas las asistencias
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
