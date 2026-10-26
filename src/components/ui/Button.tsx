import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'collegiate' | 'gold' | 'navy' | 'outline' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantClasses = {
  primary:
    'bg-[#0C4DA2] text-white hover:bg-[#08326B] active:bg-[#05224D] shadow-sm border border-transparent group',
  collegiate:
    'bg-[#0C4DA2] text-white hover:bg-[#08326B] active:bg-[#05224D] shadow-sm border border-transparent group',
  gold:
    'bg-[#E4B316] text-[#0D0D0D] font-bold hover:bg-[#C99B0E] active:bg-[#B58B0C] shadow-sm border border-transparent group',
  navy:
    'bg-[#08326B] text-white hover:bg-[#0C4DA2] active:bg-[#05224D] shadow-sm border border-transparent group',
  secondary:
    'bg-transparent text-[#0D0D0D] border border-slate-300 hover:bg-slate-100 hover:border-slate-800 active:bg-slate-200 shadow-xs group',
  outline:
    'bg-transparent text-[#0C4DA2] border border-[#0C4DA2] hover:bg-[#EFF6FF] active:bg-[#DBEAFE] group',
  accent:
    'bg-[#E4B316] text-[#0D0D0D] font-bold hover:bg-[#C99B0E] active:bg-[#B58B0C] shadow-sm border border-transparent group',
  ghost:
    'bg-transparent text-[#0D0D0D] hover:bg-black/5 active:bg-black/10 border border-transparent group',
}

const sizeClasses = {
  sm: 'text-[13px] h-8.5 px-3.5 gap-1.5 rounded-[var(--radius-md)]',
  md: 'text-[15px] h-10.5 px-4.5 gap-2 rounded-[var(--radius-md)]',
  lg: 'text-[16px] h-12.5 px-6 gap-2.5 rounded-[var(--radius-lg)]',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 select-none cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C4DA2]',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 arrow-nudge">{rightIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
