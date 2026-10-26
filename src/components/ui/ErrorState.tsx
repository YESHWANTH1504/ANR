import React from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  message?: string
  onRetry?: () => void
  retryLabel?: string
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this section. Please try again or contact the college office.',
  onRetry,
  retryLabel = 'Try Again',
  className,
  ...props
}) => {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-[var(--radius-lg)] border border-red-200 bg-red-50/60 text-slate-800',
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-[var(--color-error)] mb-4">
        <AlertCircle className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <h4 className="text-base font-bold text-red-900">{title}</h4>
      <p className="mt-1.5 text-sm text-red-700 max-w-md leading-relaxed">{message}</p>
      {onRetry && (
        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
            className="border-red-300 text-red-900 hover:bg-red-100/60"
          >
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
