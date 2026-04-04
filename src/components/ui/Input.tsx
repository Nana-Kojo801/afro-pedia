import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'flex w-full rounded-lg border border-ivory-dark bg-ivory px-3.5 py-2.5 text-sm text-mahogany placeholder:text-brown-light focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta disabled:cursor-not-allowed disabled:opacity-50 transition-all',
        className
      )}
      {...props}
    />
  )
}
