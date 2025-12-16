'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import RegistroUsuarioForm from '@/components/RegistroUsuarioForm';

export default function EditCoderPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const coderId = searchParams.get('id');
    const userRole = searchParams.get('role') || 'coder';

    const handleSuccess = () => {
        // Redirigir después de la actualización exitosa
        setTimeout(() => {
            router.push('/dashboard_company');
        }, 2000);
    };

    if (!coderId) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">Error: ID de usuario no proporcionado</p>
                </div>
            </div>
        );
    }

    const isAdmin = userRole === 'administrator';

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Editar {isAdmin ? 'Administrador' : 'Coder'}
                </h1>
                <p className="text-gray-600 mt-2">
                    Actualiza la información del {isAdmin ? 'administrador' : 'coder'}
                </p>
            </div>

            <RegistroUsuarioForm
                isEditMode={true}
                coderId={coderId}
                onSuccess={handleSuccess}
                userType={userRole}
            />
        </div>
    );
}
