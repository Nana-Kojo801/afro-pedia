import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'amber'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 cursor-pointer',
        size === 'sm' && 'px-4 py-1.5 text-sm',
        size === 'md' && 'px-6 py-2.5 text-sm',
        size === 'lg' && 'px-8 py-3.5 text-base',
        variant === 'primary' && 'bg-terracotta text-white hover:bg-terracotta-dark shadow-sm hover:shadow-md',
        variant === 'outline' && 'border-2 border-terracotta text-terracotta bg-transparent hover:bg-terracotta hover:text-white',
        variant === 'ghost' && 'bg-transparent text-brown-mid hover:bg-ivory-dark hover:text-mahogany',
        variant === 'amber' && 'bg-amber text-mahogany hover:bg-amber-light shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
