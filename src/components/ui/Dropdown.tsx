import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { cn } from '@/lib/utils'

interface DropdownContextValue {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

export interface DropdownProps {
  children: React.ReactNode
  className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)

  useOutsideClick(containerRef, close, isOpen)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={containerRef} className={cn('relative inline-block text-left', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export interface DropdownTriggerProps {
  children: React.ReactNode
  className?: string
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children, className }) => {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('DropdownTrigger must be used inside Dropdown')

  return (
    <div
      onClick={context.toggle}
      aria-haspopup="menu"
      aria-expanded={context.isOpen}
      className={cn('inline-flex cursor-pointer', className)}
    >
      {children}
    </div>
  )
}

export interface DropdownMenuProps {
  children: React.ReactNode
  align?: 'left' | 'right'
  className?: string
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  align = 'left',
  className,
}) => {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('DropdownMenu must be used inside Dropdown')

  if (!context.isOpen) return null

  return (
    <div
      role="menu"
      className={cn(
        'absolute z-50 mt-2 min-w-[200px] rounded-[var(--radius-lg)] bg-white py-1.5 shadow-[var(--shadow-overlay)] ring-1 ring-black/5 focus:outline-none border border-[var(--color-border)]',
        align === 'right' ? 'right-0' : 'left-0',
        className
      )}
    >
      {children}
    </div>
  )
}

export interface DropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  disabled?: boolean
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  className,
  disabled = false,
}) => {
  const context = useContext(DropdownContext)

  const handleClick = () => {
    if (disabled) return
    onClick?.()
    context?.close()
  }

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'w-full text-left px-4 py-2 text-xs md:text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-secondary-light)] hover:text-[var(--color-secondary-dark)] focus:bg-[var(--color-secondary-light)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  )
}
