import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'amber' | 'muted'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide',
        variant === 'default' && 'bg-terracotta text-white',
        variant === 'outline' && 'border border-terracotta text-terracotta bg-transparent',
        variant === 'amber' && 'bg-amber text-mahogany',
        variant === 'muted' && 'bg-ivory-dark text-brown-mid',
        className
      )}
    >
      {children}
    </span>
  )
}
