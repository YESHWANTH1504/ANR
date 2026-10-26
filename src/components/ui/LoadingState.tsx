import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading academic records...',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('flex flex-col items-center justify-center p-8 text-center', className)}
      {...props}
    >
      <Loader2
        className={cn('animate-spin text-[var(--color-secondary)] mb-3', sizeClasses[size])}
        strokeWidth={2}
      />
      <p className="text-sm font-medium text-[var(--color-text-secondary)]">{message}</p>
      <span className="sr-only">Loading</span>
    </div>
  )
}
