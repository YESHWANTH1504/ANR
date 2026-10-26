import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'collegiate'
    | 'gold'
    | 'navy'
    | 'obsidian'
    | 'pale-blue'
    | 'neutral'
    | 'outline'
    | 'success'
  size?: 'sm' | 'md'
}

const variantClasses = {
  primary: 'bg-[#0C4DA2] text-white border-transparent font-medium',
  collegiate: 'bg-[#0C4DA2] text-white border-transparent font-medium',
  gold: 'bg-[#E4B316] text-[#0D0D0D] border-transparent font-bold',
  navy: 'bg-[#08326B] text-white border-transparent font-medium',
  obsidian: 'bg-[#0D0D0D] text-white border-transparent font-medium',
  'pale-blue': 'bg-[#EFF6FF] text-[#0C4DA2] border-[#BFDBFE] font-semibold',
  secondary: 'bg-[#FEF9E7] text-[#854D0E] border-[#FDE68A] font-semibold',
  accent: 'bg-[#E4B316] text-[#0D0D0D] border-transparent font-bold',
  neutral: 'bg-slate-100 text-slate-800 border-slate-200 font-medium',
  outline: 'bg-transparent text-[#0D0D0D] border-slate-300 font-medium',
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium',
}

const sizeClasses = {
  sm: 'text-xs px-2.5 py-0.5 rounded-[var(--radius-sm)] tracking-wider',
  md: 'text-[13px] px-3 py-1 rounded-[var(--radius-md)] tracking-wide',
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-bold border uppercase tracking-wider',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
