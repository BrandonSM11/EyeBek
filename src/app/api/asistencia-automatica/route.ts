import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log('📤 Enviando petición al servidor Python...')

    const response = await fetch('http://127.0.0.1:8000/api/asistencia-automatica', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    console.log('📥 Respuesta del servidor Python:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error del servidor Python:', errorText)
      return NextResponse.json({
        success: false,
        message: 'Error en el servidor de reconocimiento facial',
        empleado: null
      }, { status: 500 })
    }

    const data = await response.json()
    console.log('✅ Datos recibidos:', data)

    return NextResponse.json(data)

  } catch (error: any) {
    console.error('❌ Error en API route:', error)

    return NextResponse.json({
      success: false,
      message: `Error de conexión: ${error.message}. Verifica que el servidor Python esté corriendo.`,
      empleado: null
    }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
