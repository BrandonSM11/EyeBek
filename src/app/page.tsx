import GenericButton from '@/components/GenericButton/GenericButton'
import PlanCard from '@/components/Plancard/PlanCard'
import Image from 'next/image'
import React from 'react'

const Home = () => {
    return (
        <>
            <section className='flex gap-10 justify-center items-center p-10'>
                <div className='textHome '>
                    <div className=' w-[600px] flex flex-col gap-8'>
                        <div className=' w-full'>
                            <h1 className='text-5xl lg:text-7xl font-black text-black leading-tight tracking-tight'>Sistema de Asistencias con Reconocimiento Facial</h1>
                        </div>
                        <div>
                            <p className='text-lg lg:text-xl text-gray-600 leading-relaxed'>Automatiza el control de asistencias de tu empresa con tecnología de reconocimiento facial avanzada. Seguro, rápido y confiable.</p>
                        </div>
                        <div>
                            <GenericButton type='button' textButton='Ver planes' size='none' className='w-[200px]' variant='black' />

                        </div>
                        <div></div>
                    </div>
                </div>
                <div className='imageHome'>
                    <Image className='rounded-xl' src={"https://res.cloudinary.com/dmd8gc4pa/image/upload/v1764937002/home_1_vlwyot.jpg"} width={700} height={400} alt='' />
                </div>
            </section>

            <section className=' flex flex-col justify-center items-center mt-30 gap-10 '>
                <div className=''>
                    <div className='text-center'><h2 className='text-4xl lg:text-6xl font-black text-black mb-6'>Planes y Precios</h2></div>
                    <div className='text-lg lg:text-xl text-gray-600 leading-relaxed'>Elige el plan que mejor se adapte a las necesidades de tu empresa. Simple, transparente y escalable.</div>
                </div>
                <div className='flex gap-20'>
                    <PlanCard subtitle='Ejemplo' title='Plan' className='bg-linear-to-b from-white to-gray-50 rounded-3xl p-8 lg:p-10 relative transition-all hover:shadow-2xl hover:-translate-y-2  shadow-2xl'/>
                    <PlanCard subtitle='Ejemplo' className='bg-linear-to-b from-white to-gray-50 rounded-3xl p-8 lg:p-10 relative transition-all hover:shadow-2xl hover:-translate-y-2 border-4 border-black shadow-2xl'/>
                </div>
            </section>
        </>
    )
}

export default Home