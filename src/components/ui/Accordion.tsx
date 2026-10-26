import React, { createContext, useContext, useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionContextValue {
  expandedItems: Set<string>
  toggleItem: (value: string) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
}

export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  defaultValue,
  className,
  children,
  ...props
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    if (!defaultValue) return new Set()
    if (Array.isArray(defaultValue)) return new Set(defaultValue)
    return new Set([defaultValue])
  })

  const toggleItem = (value: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        if (type === 'single') {
          next.clear()
        }
        next.add(value)
      }
      return next
    })
  }

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem }}>
      <div className={cn('divide-y divide-[var(--color-border)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white overflow-hidden', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItemContext = createContext<{ value: string; isExpanded: boolean; triggerId: string; contentId: string } | null>(null)

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  const context = useContext(AccordionContext)
  if (!context) throw new Error('AccordionItem must be used within an Accordion')

  const id = useId()
  const triggerId = `${id}-trigger`
  const contentId = `${id}-content`
  const isExpanded = context.expandedItems.has(value)

  return (
    <AccordionItemContext.Provider value={{ value, isExpanded, triggerId, contentId }}>
      <div className={cn('group', className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  const itemContext = useContext(AccordionItemContext)
  const rootContext = useContext(AccordionContext)
  if (!itemContext || !rootContext) throw new Error('AccordionTrigger must be used inside AccordionItem')

  const { isExpanded, triggerId, contentId, value } = itemContext

  return (
    <h3 className="m-0 flex">
      <button
        id={triggerId}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={() => rootContext.toggleItem(value)}
        className={cn(
          'flex flex-1 items-center justify-between py-4 px-5 text-left text-sm md:text-base font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)]',
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200',
            isExpanded && 'rotate-180 text-[var(--color-secondary)]'
          )}
          aria-hidden="true"
        />
      </button>
    </h3>
  )
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  className,
  children,
  ...props
}) => {
  const itemContext = useContext(AccordionItemContext)
  if (!itemContext) throw new Error('AccordionContent must be used inside AccordionItem')

  const { isExpanded, triggerId, contentId } = itemContext

  if (!isExpanded) return null

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={cn('px-5 pb-5 pt-1 text-sm text-[var(--color-text-secondary)] leading-relaxed', className)}
      {...props}
    >
      {children}
    </div>
  )
}
