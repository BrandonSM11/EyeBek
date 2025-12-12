import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('http://127.0.0.1:8000/health', {
      signal: AbortSignal.timeout(5000)
    })
    
    const data = await response.json()
    
    return NextResponse.json({
      nextjs: 'ok',
      python: data.status,
      database: data.database,
      message: 'Ambos servidores funcionando correctamente'
    })
  } catch (error: any) {
    return NextResponse.json({
      nextjs: 'ok',
      python: 'error',
      database: 'unknown',
      message: 'El servidor Python no está disponible',
      error: error.message
    }, { status: 503 })
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'