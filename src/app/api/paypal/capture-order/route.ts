import { generateAccessToken } from "@/lib/paypal";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const PAYPAL_API = "https://api-m.sandbox.paypal.com";

export async function POST(request: NextRequest) {
    try {
        const { orderID } = await request.json();

        if (!orderID) {
            return NextResponse.json(
                { success: false, message: "orderID es requerido" },
                { status: 400 }
            );
        }

        console.log("📦 Capturando orden:", orderID);

        const accessToken = await generateAccessToken();
        console.log("✅ Access token obtenido");

        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "PayPal-Request-Id": crypto.randomUUID(),
            },
        });

        console.log("📍 Response status:", response.status);

        const data = await response.json();
        console.log("📋 Response data:", JSON.stringify(data, null, 2));

        if (!response.ok) {
            console.error("❌ PayPal error:", data);
            return NextResponse.json(
                { 
                    success: false, 
                    message: data.details?.[0]?.issue || "Error al capturar la orden" 
                },
                { status: response.status }
            );
        }

        console.log("✅ Orden capturada exitosamente");
        return NextResponse.json({ 
            success: true, 
            message: "Pago completado",
            data: data 
        });

    } catch (error) {
        console.error("❌ Error en capture-order:", error);
        return NextResponse.json(
            { 
                success: false, 
                message: String(error) || "Error interno del servidor" 
            },
            { status: 500 }
        );
    }
}