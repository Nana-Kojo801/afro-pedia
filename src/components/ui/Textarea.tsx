import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'flex min-h-24 w-full rounded-lg border border-ivory-dark bg-ivory px-3.5 py-2.5 text-sm text-mahogany placeholder:text-brown-light focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all',
        className
      )}
      {...props}
    />
  )
}
