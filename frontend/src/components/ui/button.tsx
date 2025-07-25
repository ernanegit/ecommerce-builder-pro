﻿import * as React from "react"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "destructive"
    size?: "default" | "sm" | "lg"
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
    ghost: "hover:bg-gray-100 text-gray-900",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  }
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className || ''}`}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }