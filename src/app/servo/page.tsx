// Página de control del servo motor

"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import GenericButton from "@/components/GenericButton/GenericButton";

export default function ServoPage() {
  const [status, setStatus] = useState("Desconectado");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAbrirServo = async () => {
    try {
      setLoading(true);
      setStatus("⏳ Enviando comando...");

      const response = await fetch("/api/servo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accion: "ABRIR" }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Servo ABIERTO");
      } else {
        setStatus("❌ Error: " + data.error);
      }
    } catch (error) {
      setStatus("❌ Error de conexión");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarServo = async () => {
    try {
      setLoading(true);
      setStatus("⏳ Enviando comando...");

      const response = await fetch("/api/servo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accion: "CERRAR" }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Servo CERRADO");
      } else {
        setStatus("❌ Error: " + data.error);
      }
    } catch (error) {
      setStatus("❌ Error de conexión");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-black hover:text-gray-600"
      >
        <ArrowLeft size={20} />
        Volver
      </button>

      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Control del Servo</h1>
        <p className="text-gray-600 mb-8">Abre o cierra el servo motor</p>

        {/* Panel de estado */}
        <div className="bg-gray-100 rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Estado Actual</p>
          <p className="text-2xl font-bold text-gray-900">{status}</p>
        </div>

        
      </div>
    </div>
  );
}
