// ============================================
// ARCHIVO: src/app/historial/page.tsx
// ============================================
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HistorialPage() {
  const [asistencias, setAsistencias] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroEmpleado, setFiltroEmpleado] = useState('')

  useEffect(() => {
    fetchAsistencias()
  }, [])

  const fetchAsistencias = async () => {
    try {
      // ✅ CORREGIDO: Usar API route de Next.js
      const response = await fetch('/api/historial-asistencias')
      const data = await response.json()
      
      if (data.success) {
        setAsistencias(data.asistencias)
      }
    } catch (err) {
      console.error('Error al cargar historial:', err)
    } finally {
      setLoading(false)
    }
  }

  const asistenciasFiltradas = filtroEmpleado
    ? asistencias.filter(a => 
        a.nombre.toLowerCase().includes(filtroEmpleado.toLowerCase())
      )
    : asistencias

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-lg font-semibold">
            ← Volver al menú
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Historial de Asistencias
            </h1>
            <button
              onClick={fetchAsistencias}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              🔄 Actualizar
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar por nombre de empleado..."
              value={filtroEmpleado}
              onChange={(e) => setFiltroEmpleado(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : asistenciasFiltradas.length === 0 ? (
            <p className="text-gray-600 text-center py-12 text-lg">
              {filtroEmpleado ? 'No se encontraron resultados' : 'No hay asistencias registradas aún'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Empleado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tipo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fecha</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hora</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {asistenciasFiltradas.map((asistencia, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{asistencia.nombre}</div>
                        <div className="text-sm text-gray-500">{asistencia.empleado_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          asistencia.tipo === 'entrada'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {asistencia.tipo === 'entrada' ? '📥 Entrada' : '📤 Salida'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {asistencia.fecha}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {asistencia.hora}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}