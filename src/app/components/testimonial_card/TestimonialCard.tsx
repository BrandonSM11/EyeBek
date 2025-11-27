import React from 'react'
import { Quote } from 'lucide-react';

export const TestimonialCard = () => {

    const testimonial = {
        name: "John Doe",
        role: "CEO at Company",
        photo: "/path/to/photo.jpg",
        text: "EyeBek ha transformado completamente nuestro proceso de control de asistencias. La precisión del reconocimiento facial es impresionante y hemos eliminado por completo el problema de fichajes fraudulentos."
    }


    return (
        <div className='flex gap-5  bg-white rounded-3xl p-8 lg:p-10 border-2 border-gray-200 hover:shadow-2xl transition-all hover:border-black'>
            <div>
                <div className='w-[75px] h-[75px] bg-black rounded-xl text-white flex justify-center items-center'>
                    foto
                </div>
            </div>
            <div className='flex flex-col '>
                <div><Quote className='text-gray-300' size={50}/></div>
                <div className='text-gray-700'>{testimonial.text}</div>
                <div className='mt-5'><span className='font-bold'>{testimonial.name}</span>  •  <span className='text-gray-700'>{testimonial.role}</span> </div>
            </div>
        </div>
    )
}
