"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalButton() {
  return (

    <div className="h-screen bg-slate-950 flex justify-center items-center">

      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          currency: "USD",
        }}
      >
        <PayPalButtons
          createOrder={async () => {
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
            });

            const data = await res.json();
            return data.id;
          }}

          onApprove={async (data) => {
            // LLAMADA AL ENDPOINT DE CAPTURA
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ orderID: data.orderID }), // Enviamos el ID de la orden
            });

            const captureData = await res.json();

            if (captureData.success) {
              alert("¡Pago capturado y exitoso!");
              // Redirigir o actualizar la UI
            } else {
              alert(`Error en la captura: ${captureData.message}`);
            }
          }}
        />
      </PayPalScriptProvider>
    </div>

  );
}