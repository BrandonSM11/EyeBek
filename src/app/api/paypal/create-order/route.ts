// app/api/paypal/create-order/route.ts
// Este endpoint crea una nueva orden de PayPal.

import { NextResponse } from 'next/server';
import axios from 'axios';
// Asegúrate de que esta ruta sea correcta para tu función helper de token
import { generateAccessToken } from '@/lib/paypal'; 

// Configuración básica del entorno y monto
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Usamos Sandbox para desarrollo
const TRANSACTION_AMOUNT = '10.00'; // Define el monto de la transacción

export async function POST(request: Request) {
    try {
        // 1. Obtener el token de acceso
        const accessToken = await generateAccessToken(); 
        console.log("-> 1. Token de acceso generado.");

        // 2. Definir el cuerpo de la solicitud (Payload/Data)
        const ORDER_DATA = {
            // Intención de la transacción: CAPTURE (capturar el dinero inmediatamente) o AUTHORIZE
            intent: 'CAPTURE', 
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: TRANSACTION_AMOUNT,
                    },
                    // Opcional: Puedes añadir una descripción o referencia de la unidad de compra
                    // custom_id: 'ORDER-REF-12345',
                },
            ],

        };

        // 3. Realizar la solicitud POST a PayPal para crear la orden
        const response = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            
            // ARGUMENTO 2: La Data de la Orden
            ORDER_DATA, 
            
            // ARGUMENTO 3: El Objeto de Configuración (Headers) - ¡Esencial para la autenticación!
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // Token de autenticación
                    'Content-Type': 'application/json',
                    // Importante: Indicar que aceptamos JSON
                    'Accept': 'application/json', 
                },
            }
        );

        console.log("-> 2. Orden creada exitosamente. ID devuelto:", response.data.id);
        // Devolvemos el ID de la orden al cliente para que pueda iniciar el componente de PayPal
        return NextResponse.json({ id: response.data.id }, { status: 201 });

    } catch (error: any) {
        // Manejo de errores detallado, especialmente los errores HTTP de PayPal
        if (axios.isAxiosError(error) && error.response) {
            // Log del error 401/422/etc. para depuración en el servidor
            console.error("ERROR DE RESPUESTA DE PAYPAL (Código HTTP):", error.response.status); 
            console.error("DETALLES DEL ERROR:", error.response.data);
            
            // Devolvemos el error específico de PayPal al frontend
            return NextResponse.json({ 
                message: 'Error al comunicarse con PayPal para crear la orden.',
                details: error.response.data
            }, { status: error.response.status });
        } 
        
        // Log para errores internos (ej. fallo en generateAccessToken)
        console.error("ERROR INTERNO AL CREAR ORDEN:", error);
        return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
    }
}