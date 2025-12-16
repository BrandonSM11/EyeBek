// Componente para reconocimiento facial con control de servo motor
// Detecta rostros en tiempo real desde la cámara web y los compara con una imagen de la BD

"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js"; // Librería de face-api.js para detección facial

export default function FacePage() {
  // Referencias y estados del componente
  const videoRef = useRef(null); // Referencia al elemento <video> para acceder a la cámara
  
  // Estados de la interfaz
  const [coders, setCoders] = useState([]); // Array de todos los coders con sus descriptores
  const [status, setStatus] = useState("Cargando modelos..."); // Mensaje de estado actual
  const [isMatch, setIsMatch] = useState(null); // null: no determinado, {matched: true, coder}: reconocido, {matched: false}: no coincide
  const [distance, setDistance] = useState(null); // Distancia euclidiana entre rostros (0-1)

  // Ejecutar inicialización cuando el componente carga
  useEffect(() => {
    initializeApp();
  }, []);

  // Ejecutar detección cuando los coders están listos
  useEffect(() => {
    if (coders.length > 0 && videoRef.current) {
      detectFace();
    }
  }, [coders]);

  // Función principal que inicializa toda la aplicación
  async function initializeApp() {
    try {
      // PASO 1: Cargar los modelos de IA necesarios para detectar rostros
      setStatus("📦 Cargando modelos de IA...");
      console.log("Iniciando carga de modelos...");
      
      // Detector de rostros pequeños (optimizado para velocidad)
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      console.log("✓ TinyFaceDetector cargado");
      
      // Detector de 68 puntos de referencia faciales (ojos, nariz, boca, etc.)
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      console.log("✓ FaceLandmark68Net cargado");
      
      // Red neuronal para generar descriptores faciales (huella digital del rostro)
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      console.log("✓ FaceRecognitionNet cargado");

      // PASO 2: Obtener la imagen de referencia del usuario desde la BD
      setStatus("🔍 Obteniendo imagen de la BD...");
      await loadUserFromDB();

      // PASO 3: Activar la cámara web
      setStatus("📹 Abriendo cámara...");
      await startCamera();

      // PASO 4: Indicar que está listo
      setStatus("✅ Listo - Acércate a la cámara");
    } catch (error) {
      console.error("❌ Error fatal:", error);
      setStatus("❌ Error: " + error.message);
    }
  }

  // Carga TODOS los coders desde la BD y genera sus descriptores faciales
  async function loadUserFromDB() {
    try {
      // Obtener lista de todos los coders desde la API
      const res = await fetch("/api/admin/register");
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: No se pudieron obtener coders`);
      }

      const data = await res.json();
      const codersList = data.coders || [];

      if (codersList.length === 0) {
        throw new Error("No hay coders registrados en la BD");
      }

      console.log(`📋 Se encontraron ${codersList.length} coders`);

      // Procesar cada coder y generar su descriptor
      const codersWithDescriptors = [];

      for (const coder of codersList) {
        try {
          if (!coder.photo) {
            console.warn(`⚠️ ${coder.name} no tiene foto`);
            continue;
          }

          console.log(`🔎 Procesando ${coder.name}...`);
          
          // Descargar la imagen
          const img = await faceapi.fetchImage(coder.photo);
          
          // Detectar rostro y generar descriptor
          const detection = await faceapi
            .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (detection) {
            codersWithDescriptors.push({
              ...coder,
              descriptor: detection.descriptor,
            });
            console.log(`✅ ${coder.name} procesado correctamente`);
          } else {
            console.warn(`⚠️ No se detectó rostro en foto de ${coder.name}`);
          }
        } catch (err) {
          console.warn(`⚠️ Error procesando ${coder.name}:`, err);
        }
      }

      if (codersWithDescriptors.length === 0) {
        throw new Error("No se pudieron procesar los coders");
      }

      setCoders(codersWithDescriptors);
      console.log(`✅ ${codersWithDescriptors.length} coders cargados con descriptores`);
    } catch (error) {
      console.error("Error al cargar coders:", error);
      throw error;
    }
  }

  // Accede a la cámara web del dispositivo
  async function startCamera() {
    try {
      // Solicitar acceso a la cámara
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 400, height: 300 } // Resolución de la cámara
      });
      console.log("✓ Cámara accesible");

      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Conectar stream a elemento <video>
        console.log("✓ Stream conectado al video");
      }
    } catch (error) {
      console.error("Error de cámara:", error);
      throw new Error("No se pudo acceder a la cámara");
    }
  }

  // Detecta rostros en el video en tiempo real y los compara con TODOS los coders
  function detectFace() {
    if (coders.length === 0) {
      console.warn("⚠️ No hay coders disponibles para comparar");
      return;
    }

    console.log("🚀 Iniciando loop de detección con " + coders.length + " coders...");
    
    // Configurar opciones del detector (umbral de confianza)
    const options = new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.5 });
    let detectionCount = 0;
    let lastMatchTime = 0; // Prevenir múltiples activaciones del servo en corto tiempo

    // Ejecutar detección cada 500ms (análisis continuo del video)
    const interval = setInterval(async () => {
      if (!videoRef.current) {
        clearInterval(interval);
        return;
      }

      try {
        // Detectar rostro en el frame actual del video
        const detection = await faceapi
          .detectSingleFace(videoRef.current, options)
          .withFaceLandmarks() // Obtener puntos de referencia
          .withFaceDescriptor(); // Generar descriptor del rostro detectado

        // Si no hay rostro detectado, continuar esperando
        if (!detection) {
          if (detectionCount % 10 === 0) {
            console.log("⏳ Esperando rostro...");
          }
          detectionCount++;
          return;
        }

        detectionCount = 0;

        // Comparar con TODOS los coders
        let bestMatch = null;
        let bestDistance = Infinity;

        for (const coder of coders) {
          const dist = faceapi.euclideanDistance(
            coder.descriptor,
            detection.descriptor
          );

          if (dist < bestDistance) {
            bestDistance = dist;
            bestMatch = coder;
          }
        }

        setDistance(bestDistance.toFixed(3));
        console.log(`📊 Mejor coincidencia: ${bestMatch?.name} (distancia: ${bestDistance.toFixed(3)})`);

        // Si la distancia es menor a 0.5, es un match
        if (bestDistance < 0.5 && bestMatch) {
          console.log(`🎉 ¡RECONOCIDO! ${bestMatch.name} - Distancia: ${bestDistance.toFixed(3)}`);
          
          const now = Date.now();
          if (now - lastMatchTime > 2000) {
            lastMatchTime = now;
            setIsMatch({ matched: true, coder: bestMatch });
            console.log("📤 Llamando abrirServo...");
            abrirServo(bestMatch.name); // Pasar el nombre directamente
          }
        } else {
          console.log(`❌ NO COINCIDE - Distancia: ${bestDistance.toFixed(3)}`);
          setIsMatch({ matched: false });
        }
      } catch (error) {
        console.error("Error en detección:", error);
      }
    }, 500); // Ejecutar cada 500 milisegundos

    // Limpiar interval cuando el componente se desmonte
    return () => clearInterval(interval);
  }

  // Envía comando MQTT a través de la API para abrir el servo motor
  async function abrirServo(coderName: string) {
    try {
      console.log("📤 Iniciando petición abrirServo...");
      
      // Llamar a la API del servidor para enviar comando MQTT a la Raspberry Pi
      const response = await fetch("/api/servo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accion: "ABRIR" }),
      });

      console.log("📥 Respuesta recibida:", response.status);

      const data = await response.json();
      
      if (response.ok) {
        console.log("✅ Servo activado:", data);
        
        // Registrar asistencia en la BD
        if (coderName) {
          await registrarAsistencia(coderName);
        }
        
        // Cerrar el servo automáticamente después de 3 segundos
        setTimeout(() => cerrarServo(), 3000);
      } else {
        console.error("❌ Error:", data);
      }
    } catch (error) {
      console.error("Error al controlar servo:", error);
    }
  }

  // Registra la asistencia en la BD
  async function registrarAsistencia(coderName: string) {
    try {
      console.log("📝 Registrando asistencia para:", coderName);
      
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coderName,
          status: "presente",
        }),
      });

      const data = await response.json();
      console.log("📥 Respuesta de attendance:", response.status, data);
      
      if (response.ok) {
        console.log("✅ Asistencia registrada:", data);
      } else {
        console.error("❌ Error al registrar asistencia:", data);
      }
    } catch (error) {
      console.error("❌ Error en registrarAsistencia:", error);
    }
  }

  // Envía comando MQTT para cerrar el servo motor
  async function cerrarServo() {
    try {
      console.log("📥 Cerrando servo...");
      const response = await fetch("/api/servo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accion: "CERRAR" }),
      });

      if (response.ok) {
        console.log("✅ Servo cerrado");
        
        // Resetear el estado después de 500ms para esperar otro rostro
        setTimeout(() => {
          console.log("🔄 Reseteando estado...");
          setIsMatch(null);
          setDistance(null);
          console.log("✅ Estado reseteado, esperando otro rostro...");
        }, 500);
      }
    } catch (error) {
      console.error("Error al cerrar servo:", error);
    }
  }

  // Renderizar la interfaz de usuario
  return (
    <div style={{ 
      textAlign: "center", 
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "500px",
      margin: "0 auto"
    }}>
      <h1>👤 Reconocimiento Facial</h1>
      
      {/* Video en vivo de la cámara */}
      <video
        ref={videoRef}
        width="400"
        height="300"
        style={{ 
          // Cambiar color del borde según el resultado
          border: isMatch?.matched === true ? "5px solid green" : 
                  isMatch?.matched === false ? "5px solid red" : 
                  "3px solid #333",
          borderRadius: "10px",
          display: "block",
          margin: "20px auto",
          transition: "border 0.3s"
        }}
        autoPlay
        playsInline
        muted
      />

      {/* Panel de información */}
      <div style={{ 
        backgroundColor: "#f0f0f0", 
        padding: "15px", 
        borderRadius: "8px",
        marginBottom: "15px"
      }}>
        <p style={{ margin: "5px", fontSize: "16px", color: "#333" }}>
          <strong>Estado:</strong> {status}
        </p>
        {distance && (
          <p style={{ margin: "5px", fontSize: "14px", color: "#666" }}>
            <strong>Distancia:</strong> {distance}
          </p>
        )}
      </div>

      {/* Mensaje cuando el usuario es RECONOCIDO */}
      {isMatch?.matched === true && (
        <div style={{ 
          padding: "20px", 
          backgroundColor: "#d4edda", 
          color: "#155724", 
          borderRadius: "8px",
          fontSize: "24px",
          fontWeight: "bold",
          border: "2px solid #28a745"
        }}>
          ✅ ¡RECONOCIDO! ¡Bienvenido {isMatch?.coder?.name}!
        </div>
      )}

      {/* Mensaje cuando el usuario NO es reconocido */}
      {isMatch?.matched === false && (
        <div style={{ 
          padding: "20px", 
          backgroundColor: "#f8d7da", 
          color: "#721c24", 
          borderRadius: "8px",
          fontSize: "20px",
          fontWeight: "bold",
          border: "2px solid #f5c6cb"
        }}>
          ❌ No coincide. Intenta de nuevo.
        </div>
      )}

      {/* Sección de ayuda para ver los logs */}
      <details style={{ marginTop: "20px", textAlign: "left" }}>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          📋 Logs (abre para ver detalles)
        </summary>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          Abre la consola del navegador (F12) para ver los logs completos de depuración.
        </p>
      </details>
    </div>
  );
}
