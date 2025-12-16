import RegistroUsuarioForm from '@/components/RegistroUsuarioForm'

export default function RegisterCoderPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Registrar Nuevo Usuario</h1>
        <p className="text-gray-600 mt-2">Completa el formulario para registrar un nuevo administrador o empleado</p>
      </div>
      
      <RegistroUsuarioForm />
    </div>
  )
}
