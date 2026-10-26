import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ApplyButtonProps {
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  showIcon?: boolean
  onClick?: () => void
}

const sizeClasses = {
  sm: 'text-xs h-8.5 px-3.5 gap-1.5 rounded-[var(--radius-sm)]',
  md: 'text-xs sm:text-[14px] h-10 px-4.5 gap-2 rounded-[var(--radius-sm)]',
  lg: 'text-[15px] sm:text-[16px] h-12 px-6.5 gap-2.5 rounded-[var(--radius-sm)]',
}

export const ApplyButton: React.FC<ApplyButtonProps> = ({
  size = 'md',
  fullWidth = false,
  className,
  showIcon = true,
  onClick,
}) => {
  return (
    <Link
      to="/admissions"
      onClick={onClick}
      aria-label="Apply Now for Admissions at ANRCAS"
      className={cn(
        'group inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 select-none cursor-pointer',
        'bg-[#E4B316] text-[#0D0D0D] hover:bg-[#D4A30B] active:bg-[#C29309]',
        'shadow-xs hover:shadow-sm',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C4DA2]',
        fullWidth && 'w-full',
        sizeClasses[size],
        className
      )}
    >
      <span>Apply Now</span>
      {showIcon && (
        <ArrowRight className="h-4 w-4 arrow-nudge" aria-hidden="true" />
      )}
    </Link>
  )
}
