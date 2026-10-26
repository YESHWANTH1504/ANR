import React from 'react'
import { cn } from '@/lib/utils'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  serif?: boolean
}

export const H1: React.FC<HeadingProps> = ({
  as: Component = 'h1',
  serif = true,
  className,
  children,
  ...props
}) => (
  <Component
    className={cn(
      'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]',
      serif ? 'font-serif' : 'font-sans',
      className
    )}
    {...props}
  >
    {children}
  </Component>
)

export const H2: React.FC<HeadingProps> = ({
  as: Component = 'h2',
  serif = true,
  className,
  children,
  ...props
}) => (
  <Component
    className={cn(
      'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]',
      serif ? 'font-serif' : 'font-sans',
      className
    )}
    {...props}
  >
    {children}
  </Component>
)

export const H3: React.FC<HeadingProps> = ({
  as: Component = 'h3',
  serif = true,
  className,
  children,
  ...props
}) => (
  <Component
    className={cn(
      'text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-snug',
      serif ? 'font-serif' : 'font-sans',
      className
    )}
    {...props}
  >
    {children}
  </Component>
)

export const H4: React.FC<HeadingProps> = ({
  as: Component = 'h4',
  serif = false,
  className,
  children,
  ...props
}) => (
  <Component
    className={cn(
      'text-lg sm:text-xl font-bold tracking-tight text-slate-900',
      serif ? 'font-serif' : 'font-sans',
      className
    )}
    {...props}
  >
    {children}
  </Component>
)

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType
}

export const TextLead: React.FC<TextProps> = ({ as: Component = 'p', className, children, ...props }) => (
  <Component
    className={cn(
      'text-lg sm:text-xl lg:text-[21px] font-normal leading-relaxed text-slate-700',
      className
    )}
    {...props}
  >
    {children}
  </Component>
)

export const TextBody: React.FC<TextProps> = ({ as: Component = 'p', className, children, ...props }) => (
  <Component
    className={cn(
      'text-base sm:text-[17px] font-normal leading-relaxed text-slate-700',
      className
    )}
    {...props}
  >
    {children}
  </Component>
)

export const TextSmall: React.FC<TextProps> = ({ as: Component = 'p', className, children, ...props }) => (
  <Component
    className={cn(
      'text-sm sm:text-[15px] font-normal leading-normal text-slate-600',
      className
    )}
    {...props}
  >
    {children}
  </Component>
)

export const EditorialLabel: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
  ...props
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#0C4DA2]',
      className
    )}
    {...props}
  >
    {children}
  </span>
)
