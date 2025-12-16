"use client"
import PlanCard from '@/components/Plancard/PlanCard'
import { Pencil, Trash, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'

interface Plan {
    categoria: string
    precio: number
    descripcion: string[]
    tiempo: string
}

export const DashboardCompany = () => {
    const [showPlans, setShowPlans] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
    const [loading, setLoading] = useState(false)

    const planes: Plan[] = [
        {
            categoria: "Starter",
            precio: 29,
            descripcion: ["Hasta 10 empleados", "Panel básico", "Soporte por email"],
            tiempo: "mes"
        },
        {
            categoria: "Professional",
            precio: 79,
            descripcion: ["Hasta 50 empleados", "Panel avanzado", "Reportes", "Soporte prioritario"],
            tiempo: "mes"
        },
        {
            categoria: "Enterprise",
            precio: 199,
            descripcion: ["Empleados ilimitados", "API completa", "Soporte dedicado", "Integraciones personalizadas"],
            tiempo: "mes"
        }
    ]

    // Cargar el script de PayPal cuando se selecciona un plan
    useEffect(() => {
        if (selectedPlan) {
            const script = document.createElement('script')
            script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`
            script.async = true
            script.onload = () => {
                // @ts-ignore
                if (window.paypal) {
                    renderPayPalButtons()
                }
            }
            document.body.appendChild(script)
        }
    }, [selectedPlan])

    const createOrder = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/paypal/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedPlan?.precio.toString(),
                    planName: selectedPlan?.categoria
                })
            })

            const data = await response.json()
            if (data.id) {
                return data.id
            } else {
                throw new Error('Error al crear la orden')
            }
        } catch (error) {
            console.error('Error creating order:', error)
            alert('Error al crear la orden. Intenta de nuevo.')
            return null
        } finally {
            setLoading(false)
        }
    }

    const captureOrder = async (orderID: string) => {
        try {
            setLoading(true)
            const response = await fetch('/api/paypal/capture-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderID })
            })

            const data = await response.json()
            if (data.success) {
                alert(`✅ ¡Pago completado! Plan ${selectedPlan?.categoria} activado.`)
                setSelectedPlan(null)
                setShowPlans(false)
                // Aquí puedes agregar lógica para actualizar el estado de la aplicación
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            console.error('Error capturing order:', error)
            alert('Error al procesar el pago. Intenta de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    const renderPayPalButtons = () => {
        // @ts-ignore
        window.paypal.Buttons({
            createOrder: async () => {
                const orderID = await createOrder()
                return orderID
            },
            onApprove: async (data: any) => {
                await captureOrder(data.orderID)
            },
            onError: (err: any) => {
                console.error('PayPal error:', err)
                alert('Error en el pago. Por favor intenta de nuevo.')
            },
            onCancel: () => {
                console.log('Pago cancelado por el usuario')
            }
        }).render('#paypal-button-container')
    }

    const handlePlanSelect = (plan: Plan) => {
        setSelectedPlan(plan)
    }

    const closePlanModal = () => {
        setSelectedPlan(null)
    }

    return (
        <>
            <section className='p-6 flex flex-col gap-6'>
                <div className='bg-white shadow-sm rounded-xl p-6 flex justify-between'>
                    <p className='text-2xl font-bold text-gray-900'>Tienes <span className='text-white bg-black rounded-md p-1'>6</span> cupos disponibles para empleados</p>
                    <p className='text-2xl font-bold text-gray-900'>28 empleados <span className='text-white bg-black rounded-md p-1'>Activos</span></p>
                    <p className='text-2xl font-bold text-gray-900'>Quedan <span className='text-white bg-black rounded-md p-1'>25</span> días de plan</p>
                </div>

                <div className='flex mt-10 justify-end gap-4'>
                    <button 
                        onClick={() => setShowPlans(true)}
                        className="w-[200px] px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition"
                    >
                        Adquirir un plan
                    </button>
                    <button className="w-[200px] px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition">
                        Crear usuario
                    </button>
                </div>

                <div>
                    <div className="bg-white shadow-sm rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Administradores</h2>
                            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">100 users</span>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm text-gray-500">
                                    <th className="py-3"><input type="checkbox" /></th>
                                    <th className="py-3">Name</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Role</th>
                                    <th className="py-3">Email address</th>
                                    <th className="py-3">Teams</th>
                                    <th className="py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-700">
                                <tr className="border-b">
                                    <td className="py-4"><input type="checkbox" /></td>
                                    <td className="py-4 flex items-center gap-3">
                                        <div>
                                            <p className="font-medium">Olivia Rhye</p>
                                            <p className="text-gray-500">@olivia</p>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="flex items-center text-green-600 font-medium gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            Active
                                        </span>
                                    </td>
                                    <td className="py-4">Product Designer</td>
                                    <td className="py-4">olivia@untitledui.com</td>
                                    <td className="py-4 flex gap-2">
                                        <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-lg">Design</span>
                                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg">Product</span>
                                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded-lg">Marketing</span>
                                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">+4</span>
                                    </td>
                                    <td className="py-4 text-gray-400">
                                        <div className='flex gap-3'>
                                            <button className="hover:text-gray-600"><Pencil size={18}/></button>
                                            <button className="hover:text-red-600"><Trash size={18}/></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <div className="bg-white shadow-sm rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Empleados</h2>
                            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">100 users</span>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm text-gray-500">
                                    <th className="py-3"><input type="checkbox" /></th>
                                    <th className="py-3">Name</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Role</th>
                                    <th className="py-3">Email address</th>
                                    <th className="py-3">Teams</th>
                                    <th className="py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-700">
                                <tr className="border-b">
                                    <td className="py-4"><input type="checkbox" /></td>
                                    <td className="py-4 flex items-center gap-3">
                                        <div>
                                            <p className="font-medium">Olivia Rhye</p>
                                            <p className="text-gray-500">@olivia</p>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="flex items-center text-green-600 font-medium gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            Active
                                        </span>
                                    </td>
                                    <td className="py-4">Product Designer</td>
                                    <td className="py-4">olivia@untitledui.com</td>
                                    <td className="py-4 flex gap-2">
                                        <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-lg">Design</span>
                                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg">Product</span>
                                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded-lg">Marketing</span>
                                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">+4</span>
                                    </td>
                                    <td className="py-4 text-gray-400">
                                        <div className='flex gap-3'>
                                            <button className="hover:text-gray-600"><Pencil size={18}/></button>
                                            <button className="hover:text-red-600"><Trash size={18}/></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Modal de Planes */}
            {showPlans && !selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-50 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-xl">
                            <h2 className="text-2xl font-bold text-gray-900">Elige tu plan</h2>
                            <button 
                                onClick={() => setShowPlans(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {planes.map((plan) => (
                                    <PlanCard
                                        key={plan.categoria}
                                        title={plan.categoria}
                                        subtitle={`Plan ${plan.categoria.toLowerCase()}`}
                                        planData={plan}
                                        buttonText="Seleccionar"
                                        onButtonClick={() => handlePlanSelect(plan)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de PayPal */}
            {selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-md w-full p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Confirmar pago</h2>
                            <button 
                                onClick={closePlanModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <p className="text-gray-600 text-sm mb-2">Plan seleccionado</p>
                            <h3 className="text-xl font-bold text-black mb-3">{selectedPlan.categoria}</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Monto a pagar:</span>
                                <span className="text-2xl font-bold text-black">${selectedPlan.precio} USD</span>
                            </div>
                        </div>

                        <div id="paypal-button-container" className="mb-4"></div>

                        <button 
                            onClick={closePlanModal}
                            disabled={loading}
                            className="w-full px-6 py-3 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                        >
                            {loading ? 'Procesando...' : 'Cancelar'}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default DashboardCompany 