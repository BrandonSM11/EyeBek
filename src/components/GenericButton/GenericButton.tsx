"use client"
import React from 'react';

interface GenericButtonProps {
  textButton: string;
  type: "submit" | "button";
  onClick?: () => void;
  size: "lg" | "md" | "sm" | "full" | "none";
  className?: string;
  variant: "black" | "white" | "outline" | "ghost";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const GenericButton = ({ 
  textButton, 
  type, 
  onClick, 
  size, 
  className, 
  variant,
  icon,
  iconPosition = "right"
}: GenericButtonProps) => {

  const sizeButton = {
    "lg": "px-10 py-5 text-lg",
    "md": "px-8 py-4 text-base",
    "sm": "px-6 py-3 text-sm",
    "full": "w-full px-8 py-4 text-base",
    "none": ""
  }

  const variantButton = {
    "black": "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl",
    "white": "bg-white text-black hover:bg-violet-500 hover:text-white shadow-lg hover:shadow-xl",
    "outline": "border-2 border-gray-200 bg-transparent hover:border-black",
    "ghost": "border border-white/20 bg-transparent hover:bg-white/10"
  }

  return (
    <button 
      className={`
        group
        rounded-2xl 
        font-semibold 
        transition-all 
        duration-300 
        hover:scale-105
        flex 
        items-center 
        justify-center 
        gap-2
        ${sizeButton[size]} 
        ${variantButton[variant]}
        ${className}
      `} 
      type={type} 
      onClick={onClick}
    >
      {icon && iconPosition === "left" && (
        <span className="group-hover:-translate-x-1 transition-transform">{icon}</span>
      )}
      {textButton}
      {icon && iconPosition === "right" && (
        <span className="group-hover:translate-x-1 transition-transform">{icon}</span>
      )}
    </button>
  )
}

export default GenericButton;
