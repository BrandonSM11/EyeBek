import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/estadisticas', {
      cache: 'no-store'
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error en API route:', error)
    return NextResponse.json({
      success: false,
      estadisticas: null
    }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
