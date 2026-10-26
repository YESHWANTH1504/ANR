import React from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  variant?:
    | 'canvas'
    | 'card'
    | 'subtle'
    | 'collegiate'
    | 'navy'
    | 'obsidian'
    | 'pale-blue'
    | 'off-white'
    | 'ivory'
    | 'paper'
    | 'sand'
    | 'ink'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const variantClasses = {
  canvas: 'bg-[var(--color-background)] text-[var(--color-text)]',
  card: 'bg-[var(--color-surface)] text-[var(--color-text)] border-y border-[var(--color-border)]',
  subtle: 'bg-[var(--color-surface-subtle)] text-[var(--color-text)] border-y border-[var(--color-border-subtle)]',
  collegiate: 'bg-[#0C4DA2] text-white',
  navy: 'bg-[#08326B] text-white',
  obsidian: 'bg-[#0D0D0D] text-white',
  'pale-blue': 'bg-[#EFF6FF] text-[#0D0D0D] border-y border-[#DBEAFE]',
  'off-white': 'bg-[#F8FAFC] text-[#0D0D0D]',
  ivory: 'bg-[var(--color-ivory)] text-[var(--color-ink)] border-y border-[var(--color-border)]',
  paper: 'bg-[var(--color-paper)] text-[var(--color-ink)]',
  sand: 'bg-[var(--color-sand)] text-[var(--color-ink)] border-y border-[var(--color-border)]',
  ink: 'bg-[#0D0D0D] text-white',
}

const paddingClasses = {
  none: 'py-0',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-20 md:py-32',
}

export const Section: React.FC<SectionProps> = ({
  as: Component = 'section',
  variant = 'canvas',
  padding = 'lg',
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'relative w-full overflow-hidden transition-colors',
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
