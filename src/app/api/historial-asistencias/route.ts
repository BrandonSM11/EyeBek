import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/historial-asistencias', {
      cache: 'no-store'
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error:', error.message)
    return NextResponse.json({
      success: false,
      asistencias: [],
      total: 0
    }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'