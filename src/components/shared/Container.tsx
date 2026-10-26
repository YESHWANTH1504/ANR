import React from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  size?: 'narrow' | 'editorial' | 'default' | 'wide' | 'full'
}

const sizeClasses = {
  narrow: 'max-w-4xl',         // ~896px for focused forms / reading
  editorial: 'max-w-5xl',      // ~1024px for long-form narrative
  default: 'max-w-7xl',        // ~1280px standard collegiate container
  wide: 'max-w-[1388px]',      // ~1388px exact SRMIST collegiate reference width
  full: 'max-w-none',
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  size = 'default',
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
