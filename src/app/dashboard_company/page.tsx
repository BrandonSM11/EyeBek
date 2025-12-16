"use client"

import PlanCard from '@/components/Plancard/PlanCard'
import GenericButton from '@/components/GenericButton/GenericButton'
import { Pencil, Trash, ClipboardList, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Plan {
  categoria: string
  precio: number
  descripcion: string[]
  tiempo: string
}

interface Usuario {
  _id: string
  name: string
  document: string
  status: boolean
  role: string
  email: string
  phone: string
}

export const Page = () => {
  const [admins, setAdmins] = useState<Usuario[]>([])
  const [coders, setCoders] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const router = useRouter()

  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/register')
      const data = await response.json()

      if (data.success) {
        setAdmins(data.admins || [])
        setCoders(data.coders || [])
      }
    } catch (error) {
      console.error('Error al traer usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleCreateUser = () => {
    router.push('/dashboard_company/register_coder')
  }

  const handleEdit = (userId: string, userRole: string) => {
    router.push(`/dashboard_company/edit_coder?id=${userId}&role=${userRole}`)
  }

  const handleDelete = async (userId: string, userName: string, userRole: string) => {
    if (confirm(`¿Estás seguro de eliminar a ${userName}?`)) {
      try {
        setDeleting(userId)

        // Endpoint según rol
        const endpoint = userRole === 'administrator'
          ? `/api/admin/${userId}`
          : `/api/coder/${userId}`

        const response = await fetch(endpoint, {
          method: 'DELETE',
        })

        if (response.ok) {
          // Actualizar estado
          setAdmins(prev => prev.filter(admin => admin._id !== userId))
          setCoders(prev => prev.filter(coder => coder._id !== userId))
          showNotification(`${userName} eliminado exitosamente`, 'success')
        } else {
          showNotification('Error al eliminar usuario', 'error')
        }
      } catch (error) {
        console.error('Error:', error)
        showNotification('Error de conexión', 'error')
      } finally {
        setDeleting(null)
      }
    }
  }


  const getStatusColor = (status: boolean) => {
    return status ? 'text-green-600' : 'text-red-600'
  }

  const getStatusBg = (status: boolean) => {
    return status ? 'bg-green-600' : 'bg-red-600'
  }



  const UserTableRow = ({ user, onEdit, onDelete }: {
    user: Usuario,
    onEdit: (id: string, role: string) => void,
    onDelete: (id: string, name: string, role: string) => void
  }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4">
        <div>
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-gray-500 text-sm">{user.document}</p>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className={`inline-flex items-center ${getStatusColor(user.status)} font-medium gap-1.5`}>
          <span className={`w-2 h-2 ${getStatusBg(user.status)} rounded-full`}></span>
          {user.status ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td className="py-4 px-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full capitalize font-medium">
          {user.role}
        </span>
      </td>
      <td className="py-4 px-4 text-gray-700">{user.email}</td>
      <td className="py-4 px-4 text-gray-700">{user.phone}</td>
      <td className="py-4 px-4">
        <div className='flex gap-2'>
          <button
            onClick={() => onEdit(user._id, user.role)}
            className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
            title="Editar usuario"
            disabled={deleting === user._id}
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(user._id, user.name, user.role)}
            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all disabled:opacity-50"
            title="Eliminar usuario"
            disabled={deleting === user._id}
          >
            {deleting === user._id ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full"></span>
            ) : (
              <Trash size={18} />
            )}
          </button>
        </div>
      </td>
    </tr>
  )

  // Tabla reutilizable
  const UserTable = ({ users, userType }: { users: Usuario[], userType: string }) => (
    <div className="bg-white shadow-sm rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{userType}</h2>
        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
          {users.length} {users.length === 1 ? 'usuario' : 'usuarios'}
        </span>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-8">Cargando {userType.toLowerCase()}...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No hay {userType.toLowerCase()} registrados</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                <th className="py-3 px-4 font-medium">Nombre</th>
                <th className="py-3 px-4 font-medium">Estado</th>
                <th className="py-3 px-4 font-medium">Rol</th>
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium">Teléfono</th>
                <th className="py-3 px-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {users.map((user) => (
                <UserTableRow
                  key={user._id}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  return (

    <>
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className={`px-6 py-4 rounded-lg shadow-lg ${notification.type === 'success'
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
            }`}>
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <section className='p-6 flex flex-col gap-6'>
        <div className='bg-white shadow-sm rounded-xl p-6 flex justify-between items-center'>
          <div className="flex gap-8">
            <div>
              <p className='text-sm text-gray-500 mb-1'>Total usuarios</p>
              <p className='text-2xl font-bold text-gray-900'>{admins.length + coders.length}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500 mb-1'>Administradores</p>
              <p className='text-2xl font-bold text-gray-900'>{admins.length}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500 mb-1'>Coders</p>
              <p className='text-2xl font-bold text-gray-900'>{coders.length}</p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className='flex justify-end gap-3'>
          <GenericButton
            textButton="Ver Asistencias"
            icon={<ClipboardList size={20} />}
            variant="black"
            size="none"
            type="button"
            className="w-auto px-6"
            onClick={() => router.push('/dashboard_company/attendance')}
          />
          <GenericButton
            textButton="Registrar Usuario"
            icon={<UserPlus size={20} />}
            variant="black"
            size="none"
            type="button"
            className="w-auto px-6"
            onClick={handleCreateUser}
          />
        </div>

        <UserTable users={admins} userType="Administradores" />

        <UserTable users={coders} userType="Coders" />
      </section>
    </>
  )
}

export default Page;