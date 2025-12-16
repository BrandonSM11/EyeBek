import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnection } from "@/lib/dbConnection";

// Esquema y modelo para registros de asistencia
function getAttendanceModel() {
  if (mongoose.models.Attendance) {
    return mongoose.models.Attendance;
  }

  const attendanceSchema = new mongoose.Schema(
    {
      coderName: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ["presente", "ausente", "retardo"],
        default: "presente",
      },
    },
    { timestamps: true }
  );

  return mongoose.model("Attendance", attendanceSchema);
}

// POST: Registrar asistencia
export async function POST(req: NextRequest) {
  try {
    console.log("🔵 [POST /api/attendance] Petición recibida");
    
    const body = await req.json();
    console.log("📥 Body recibido:", body);
    
    const { coderName, status = "presente" } = body;

    if (!coderName) {
      console.error("❌ coderName es requerido");
      return NextResponse.json(
        { error: "El nombre del coder es requerido" },
        { status: 400 }
      );
    }

    console.log("🔌 Conectando a MongoDB...");
    await dbConnection();
    console.log("✅ Conectado a MongoDB");

    const AttendanceModel = getAttendanceModel();
    console.log("📋 Modelo Attendance obtenido");

    const attendance = new AttendanceModel({
      coderName,
      timestamp: new Date(),
      status,
    });

    console.log("💾 Guardando registro:", attendance);
    const saved = await attendance.save();
    console.log("✅ Registro guardado exitosamente:", saved);

    return NextResponse.json(
      {
        success: true,
        message: `Asistencia registrada para ${coderName}`,
        attendance: saved,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error al registrar asistencia:", error);
    return NextResponse.json(
      { 
        error: "Error al registrar asistencia",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// GET: Obtener registros de asistencia (opcional, para listar)
export async function GET(req: NextRequest) {
  try {
    console.log("🔵 [GET /api/attendance] Petición recibida");
    
    await dbConnection();
    console.log("✅ Conectado a MongoDB");

    const AttendanceModel = getAttendanceModel();
    const attendances = await AttendanceModel.find().sort({ timestamp: -1 });

    console.log("📋 Registros obtenidos:", attendances.length);

    return NextResponse.json({
      success: true,
      count: attendances.length,
      attendances,
    });
  } catch (error) {
    console.error("❌ Error al obtener asistencias:", error);
    return NextResponse.json(
      { 
        error: "Error al obtener asistencias",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
