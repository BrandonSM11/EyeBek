"use client"
import React from 'react';


interface GenericButtonProps {
  textButton: string;
  type: "submit" | "button";
  onClick?: () => void;
  //size none if you want to use a custom size with the “className” prop
  size: "lg" | "md" | "sm" | "full" | "none";
  className?: string;
  variant: "black" | "white";
  icon?: React.ReactNode;
  disabled?: boolean;
}

const GenericButton = ({ textButton, type, onClick, size, className, variant, icon, disabled }: GenericButtonProps) => {

  const sizeButton = {
    "lg": "w-lg",
    "md": "w-md",
    "sm": "w-sm",
    "full": "w-full",
    "none": "w-auto"
  }

  const variantButton = {
    "black": "px-6 py-3 transition-all duration-300 font-semibold shadow-md hover:shadow-lg bg-black text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100",
    "white": "px-6 py-3 transition-all duration-300 font-semibold shadow-md hover:shadow-lg bg-white text-black border border-gray-200 hover:border-gray-400 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
  }

  return (
    <button
      className={`rounded-xl flex items-center justify-center gap-2 ${sizeButton[size]} ${className} ${variantButton[variant]}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {textButton}
    </button>
  )
}

export default GenericButton