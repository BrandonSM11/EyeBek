"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Attendance {
  _id: string;
  coderName: string;
  timestamp: string;
  status: string;
  createdAt: string;
}

export default function AttendancePage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredCoderName, setFilteredCoderName] = useState("");

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/attendance");
      
      if (!response.ok) {
        throw new Error("Error al obtener asistencias");
      }

      const data = await response.json();
      setAttendances(data.attendances || []);
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  // Filtrar asistencias por nombre de coder
  const filtered = filteredCoderName
    ? attendances.filter((a) =>
        a.coderName.toLowerCase().includes(filteredCoderName.toLowerCase())
      )
    : attendances;

  // Agrupar por fecha
  const groupedByDate = filtered.reduce(
    (acc, attendance) => {
      const date = new Date(attendance.timestamp).toLocaleDateString("es-ES");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(attendance);
      return acc;
    },
    {} as Record<string, Attendance[]>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "presente":
        return "bg-black text-white";
      case "ausente":
        return "bg-gray-400 text-white";
      case "retardo":
        return "bg-gray-600 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "presente":
        return "✅ Presente";
      case "ausente":
        return "❌ Ausente";
      case "retardo":
        return "⏰ Retardo";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">
              📋 Registro de Asistencia
            </h1>
            <p className="text-gray-700">
              Total de registros: <span className="font-semibold">{attendances.length}</span>
            </p>
          </div>
          <Link
            href="/dashboard_company"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            ← Volver al Dashboard
          </Link>
        </div>

        {/* Filtro */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-black mb-2">
            Filtrar por nombre de coder:
          </label>
          <input
            type="text"
            placeholder="Escribe un nombre..."
            value={filteredCoderName}
            onChange={(e) => setFilteredCoderName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-700">Cargando asistencias...</p>
          </div>
        ) : error ? (
          <div className="bg-gray-100 border border-gray-400 rounded-lg p-4 text-black">
            Error: {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-gray-100 border border-gray-400 rounded-lg p-4 text-black text-center">
            {filteredCoderName
              ? "No se encontraron registros con ese nombre"
              : "No hay registros de asistencia aún"}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByDate)
              .sort(([dateA], [dateB]) => {
                const a = new Date(dateA).getTime();
                const b = new Date(dateB).getTime();
                return b - a; // Orden descendente
              })
              .map(([date, records]) => (
                <div key={date} className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                  {/* Fecha Header */}
                  <div className="bg-black px-6 py-4">
                    <h2 className="text-xl font-bold text-white">📅 {date}</h2>
                    <p className="text-gray-300 text-sm">
                      {records.length} registro{records.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Tabla */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                            Nombre
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                            Hora
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                            Estado
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {records
                          .sort(
                            (a, b) =>
                              new Date(b.timestamp).getTime() -
                              new Date(a.timestamp).getTime()
                          )
                          .map((record) => {
                            const time = new Date(record.timestamp).toLocaleTimeString(
                              "es-ES",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              }
                            );

                            return (
                              <tr
                                key={record._id}
                                className="hover:bg-gray-50 transition"
                              >
                                <td className="px-6 py-4 text-sm font-medium text-black">
                                  {record.coderName}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                  🕐 {time}
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                      record.status
                                    )}`}
                                  >
                                    {getStatusText(record.status)}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
