import React from 'react'
import { cn } from '@/lib/utils'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  label?: string
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  className,
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block h-full w-[1px] bg-[var(--color-border)] self-stretch', className)}
        {...props}
      />
    )
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn('relative my-6 flex items-center', className)}
        {...props}
      >
        <div className="flex-grow border-t border-[var(--color-border)]" />
        <span className="mx-4 flex-shrink text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          {label}
        </span>
        <div className="flex-grow border-t border-[var(--color-border)]" />
      </div>
    )
  }

  return (
    <hr
      className={cn('my-6 border-0 border-t border-[var(--color-border)] w-full', className)}
      {...props}
    />
  )
}
