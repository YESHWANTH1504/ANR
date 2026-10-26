import React from 'react'
import { cn } from '@/lib/utils'
import { SectionEyebrow } from './SectionEyebrow'

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  eyebrow?: string
  eyebrowVariant?: 'blue' | 'gold' | 'navy' | 'obsidian' | 'white'
  title: React.ReactNode
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4'
  description?: React.ReactNode
  hasDivider?: boolean
  dividerColor?: 'gold' | 'blue' | 'white'
  align?: 'left' | 'center' | 'right'
  serif?: boolean
  inverted?: boolean
  action?: React.ReactNode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  eyebrowVariant = 'blue',
  title,
  titleAs: TitleTag = 'h2',
  description,
  hasDivider = true,
  dividerColor = 'gold',
  align = 'left',
  serif = true,
  inverted = false,
  action,
  className,
  ...props
}) => {
  const isCentered = align === 'center'
  const isRight = align === 'right'

  const dividerBg = {
    gold: 'bg-[#E4B316]',
    blue: 'bg-[#0C4DA2]',
    white: 'bg-white',
  }[dividerColor]

  return (
    <div
      className={cn(
        'space-y-4',
        isCentered && 'text-center mx-auto max-w-3xl',
        isRight && 'text-right ml-auto max-w-3xl',
        !isCentered && !isRight && 'text-left max-w-3xl',
        className
      )}
      {...props}
    >
      {eyebrow && (
        <SectionEyebrow
          variant={inverted ? 'gold' : eyebrowVariant}
          className={cn(isCentered && 'justify-center', isRight && 'justify-end')}
        >
          {eyebrow}
        </SectionEyebrow>
      )}

      <TitleTag
        className={cn(
          'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]',
          inverted ? 'text-white' : 'text-slate-900',
          serif ? 'font-serif' : 'font-sans'
        )}
      >
        {title}
      </TitleTag>

      {hasDivider && (
        <div
          className={cn(
            'h-1 w-16 rounded-full',
            dividerBg,
            isCentered && 'mx-auto',
            isRight && 'ml-auto'
          )}
          aria-hidden="true"
        />
      )}

      {description && (
        <div
          className={cn(
            'text-base sm:text-lg leading-relaxed pt-1',
            inverted ? 'text-stone-200' : 'text-slate-600'
          )}
        >
          {typeof description === 'string' ? <p>{description}</p> : description}
        </div>
      )}

      {action && (
        <div
          className={cn(
            'pt-3 flex flex-wrap items-center gap-3',
            isCentered && 'justify-center',
            isRight && 'justify-end'
          )}
        >
          {action}
        </div>
      )}
    </div>
  )
}
