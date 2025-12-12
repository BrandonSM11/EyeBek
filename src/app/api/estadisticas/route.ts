export async function GET() {
  try {
    const response = await fetch('http://localhost:5000/api/estadisticas')
    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error en API route:', error)
    return Response.json({
      success: false,
      estadisticas: null
    }, { status: 500 })
  }
}