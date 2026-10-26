import React from 'react'
import { cn } from '@/lib/utils'

export interface SectionEyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'blue' | 'gold' | 'navy' | 'obsidian' | 'white'
  hasPip?: boolean
  children: React.ReactNode
}

const variantClasses = {
  blue: 'text-[#0C4DA2]',
  gold: 'text-[#E4B316]',
  navy: 'text-[#08326B]',
  obsidian: 'text-[#0D0D0D]',
  white: 'text-white',
}

const pipClasses = {
  blue: 'bg-[#0C4DA2]',
  gold: 'bg-[#E4B316]',
  navy: 'bg-[#08326B]',
  obsidian: 'bg-[#0D0D0D]',
  white: 'bg-white',
}

export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({
  variant = 'blue',
  hasPip = true,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-extrabold uppercase tracking-widest select-none',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {hasPip && (
        <span
          className={cn('inline-block h-2 w-2 rounded-full shrink-0', pipClasses[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </div>
  )
}
