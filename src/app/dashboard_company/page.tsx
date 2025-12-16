"use client"
import GenericButton from '@/components/GenericButton/GenericButton'
import { Pencil, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Usuario {
  _id: string
  name: string
  email: string
  document: string
  phone: string
  photo: string
  role: string
  status: boolean
  createdAt: string
}

export const page = () => {
  const [admins, setAdmins] = useState<Usuario[]>([])
  const [coders, setCoders] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
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

    fetchUsuarios()
  }, [])

  const handleCreateUser = () => {
    router.push('/dashboard_company/register_coder')
  }

  const getStatusColor = (status: boolean) => {
    return status ? 'text-green-600' : 'text-red-600'
  }

  const getStatusBg = (status: boolean) => {
    return status ? 'bg-green-500' : 'bg-red-500'
  }

  const UserTableRow = ({ user }: { user: Usuario }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-4"><input type="checkbox" className="w-4 h-4" /></td>
      <td className="py-4 px-4 flex items-center gap-3">
        <div>
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-gray-500 text-sm">{user.document}</p>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className={`flex items-center ${getStatusColor(user.status)} font-medium gap-1`}>
          <span className={`w-2 h-2 ${getStatusBg(user.status)} rounded-full`}></span>
          {user.status ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td className="py-4 px-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full capitalize">
          {user.role}
        </span>
      </td>
      <td className="py-4 px-4 text-gray-700">{user.email}</td>
      <td className="py-4 px-4 text-gray-700">{user.phone}</td>
      <td className="py-4 px-4 text-gray-400">
        <div className='flex gap-3'>
          <button className="hover:text-blue-600"><Pencil size={18} /></button>
          <button className="hover:text-red-600"><Trash size={18} /></button>
        </div>
      </td>
    </tr>
  )

    return (

        <>
            <section className='p-6 flex flex-col gap-6'>

                <div className='bg-white shadow-sm rounded-xl p-6 flex justify-between'>
                    <p className='text-lg font-semibold text-gray-900'>Total usuarios: <span className='text-white bg-black rounded-md p-1'>{admins.length + coders.length}</span></p>
                    <p className='text-lg font-semibold text-gray-900'>Administradores: <span className='text-white bg-black rounded-md p-1'>{admins.length}</span></p>
                    <p className='text-lg font-semibold text-gray-900'>Coders: <span className='text-white bg-black rounded-md p-1'>{coders.length}</span></p>
                </div>

                <div className=' flex mt-10 justify-end gap-3 '>
                    <GenericButton 
                      textButton="📋 Ver Asistencias"  
                      variant="blue" 
                      size="none" 
                      type="button" 
                      className="w-[200px]"
                      onClick={() => router.push('/dashboard_company/attendance')}
                    />
                    <GenericButton 
                      textButton="Registrar Coder"  
                      variant="black" 
                      size="none" 
                      type="button" 
                      className="w-[200px]"
                      onClick={handleCreateUser}
                    />
                </div>

                {/* Administradores */}
                <div>
                    <div className="bg-white shadow-sm rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Administradores</h2>
                            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                              {admins.length} usuarios
                            </span>
                        </div>

                        {loading ? (
                          <p className="text-center text-gray-500 py-8">Cargando administradores...</p>
                        ) : admins.length === 0 ? (
                          <p className="text-center text-gray-500 py-8">No hay administradores registrados</p>
                        ) : (
                          <table className="w-full">
                              <thead>
                                  <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                                      <th className="py-3 px-4"><input type="checkbox" className="w-4 h-4" /></th>
                                      <th className="py-3 px-4">Nombre</th>
                                      <th className="py-3 px-4">Estado</th>
                                      <th className="py-3 px-4">Rol</th>
                                      <th className="py-3 px-4">Email</th>
                                      <th className="py-3 px-4">Teléfono</th>
                                      <th className="py-3 px-4">Acciones</th>
                                  </tr>
                              </thead>
                              <tbody className="text-sm text-gray-700">
                                  {admins.map((admin) => (
                                    <UserTableRow key={admin._id} user={admin} />
                                  ))}
                              </tbody>
                          </table>
                        )}
                    </div>
                </div>

                {/* Coders */}
                <div>
                    <div className="bg-white shadow-sm rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Coders</h2>
                            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                              {coders.length} usuarios
                            </span>
                        </div>

                        {loading ? (
                          <p className="text-center text-gray-500 py-8">Cargando coders...</p>
                        ) : coders.length === 0 ? (
                          <p className="text-center text-gray-500 py-8">No hay coders registrados</p>
                        ) : (
                          <table className="w-full">
                              <thead>
                                  <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                                      <th className="py-3 px-4"><input type="checkbox" className="w-4 h-4" /></th>
                                      <th className="py-3 px-4">Nombre</th>
                                      <th className="py-3 px-4">Estado</th>
                                      <th className="py-3 px-4">Rol</th>
                                      <th className="py-3 px-4">Email</th>
                                      <th className="py-3 px-4">Teléfono</th>
                                      <th className="py-3 px-4">Acciones</th>
                                  </tr>
                              </thead>
                              <tbody className="text-sm text-gray-700">
                                  {coders.map((coder) => (
                                    <UserTableRow key={coder._id} user={coder} />
                                  ))}
                              </tbody>
                          </table>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
