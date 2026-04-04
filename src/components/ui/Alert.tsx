import { cn } from '@/lib/utils'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'error' | 'success'
}

const icons = {
  default: Info,
  error: AlertTriangle,
  success: CheckCircle,
}

export function Alert({ className, variant = 'default', children, ...props }: AlertProps) {
  const Icon = icons[variant]
  return (
    <div
      role="alert"
      className={cn(
        'relative flex gap-3 w-full rounded-xl border p-4 text-sm',
        variant === 'default' && 'border-ivory-dark bg-ivory text-brown-mid',
        variant === 'error' && 'border-red-200 bg-red-50 text-red-800',
        variant === 'success' && 'border-terracotta/30 bg-terracotta/5 text-terracotta',
        className
      )}
      {...props}
    >
      <Icon size={16} className="flex-shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  )
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('font-semibold mb-0.5', className)} {...props} />
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm opacity-90', className)} {...props} />
}
