export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await fetch('http://localhost:5000/api/registrar-empleado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    return Response.json(data, { status: response.status })
  } catch (error) {
    console.error('Error en API route:', error)
    return Response.json({
      success: false,
      message: 'Error de conexión con el servidor Python'
    }, { status: 500 })
  }
}