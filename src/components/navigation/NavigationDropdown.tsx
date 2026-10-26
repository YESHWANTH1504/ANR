import React, { useRef, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import type { NavItem } from '@/data/navigation'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { cn } from '@/lib/utils'

export interface NavigationDropdownProps {
  item: NavItem
  className?: string
}

export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({ item, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const itemLinksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  const subItems = item.children || []

  // Determine if any child route is currently active
  const isChildActive = subItems.some(
    (child) => location.pathname === child.href || location.pathname.startsWith(`${child.href}/`)
  )

  useOutsideClick(containerRef, () => setIsOpen(false), isOpen)

  // Clear pending timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 120)
  }

  const openMenu = (focusFirst = false) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsOpen(true)
    if (focusFirst) {
      requestAnimationFrame(() => {
        itemLinksRef.current[0]?.focus()
      })
    }
  }

  const closeMenu = (restoreFocus = true) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsOpen(false)
    if (restoreFocus) {
      triggerRef.current?.focus()
    }
  }

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu(true)
    } else {
      openMenu(false)
    }
  }

  // Handle trigger button key presses
  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        toggleMenu()
        break
      case 'ArrowDown':
        e.preventDefault()
        openMenu(true)
        break
      case 'ArrowUp':
        e.preventDefault()
        setIsOpen(true)
        requestAnimationFrame(() => {
          itemLinksRef.current[subItems.length - 1]?.focus()
        })
        break
      case 'Escape':
        if (isOpen) {
          e.preventDefault()
          closeMenu(true)
        }
        break
    }
  }

  // Handle keyboard navigation inside the menu
  const handleItemKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (index < subItems.length - 1) {
          itemLinksRef.current[index + 1]?.focus()
        } else {
          itemLinksRef.current[0]?.focus()
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (index > 0) {
          itemLinksRef.current[index - 1]?.focus()
        } else {
          itemLinksRef.current[subItems.length - 1]?.focus()
        }
        break
      case 'Home':
        e.preventDefault()
        itemLinksRef.current[0]?.focus()
        break
      case 'End':
        e.preventDefault()
        itemLinksRef.current[subItems.length - 1]?.focus()
        break
      case 'Escape':
        e.preventDefault()
        closeMenu(true)
        break
      case 'Tab':
        if (e.shiftKey && index === 0) {
          e.preventDefault()
          closeMenu(true)
        } else if (!e.shiftKey && index === subItems.length - 1) {
          setIsOpen(false)
        }
        break
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false)
    }
  }

  const dropdownId = `dropdown-menu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      className={cn('relative inline-flex items-center h-full', className)}
    >
      <button
        ref={triggerRef}
        type="button"
        id={`${dropdownId}-trigger`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={dropdownId}
        onClick={toggleMenu}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          'relative inline-flex items-center gap-1.5 px-2 xl:px-2.5 2xl:px-3.5 py-2 text-[14px] xl:text-[14.5px] 2xl:text-[15.5px] font-bold tracking-tight transition-colors duration-150 rounded cursor-pointer whitespace-nowrap shrink-0',
          'hover:text-[#0C4DA2] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#082046]',
          isOpen || isChildActive
            ? 'text-[#082046] font-extrabold'
            : 'text-slate-800 hover:text-[#082046]'
        )}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200 text-slate-400 shrink-0',
            isOpen && 'rotate-180 text-[#082046]'
          )}
          aria-hidden="true"
        />

        {/* Active Route Gold Underline Indicator */}
        {isChildActive && (
          <span
            className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#E4B316] rounded-full"
            aria-hidden="true"
          />
        )}
      </button>

      {/* Dropdown Menu Panel with invisible hover bridge */}
      {isOpen && (
        <div
          ref={menuRef}
          id={dropdownId}
          role="menu"
          aria-labelledby={`${dropdownId}-trigger`}
          className={cn(
            'absolute top-full left-0 z-50 min-w-[340px] max-w-sm rounded-[var(--radius-md)] bg-white py-2 shadow-xl border border-slate-200 border-t-2 border-t-[#082046] animate-in fade-in-50 duration-150',
            'before:absolute before:-top-2 before:left-0 before:right-0 before:h-2' // Invisible hover bridge
          )}
        >
          <div className="relative z-10 divide-y divide-slate-100">
            {subItems.map((subItem, index) => {
              const isActive =
                location.pathname === subItem.href ||
                location.pathname.startsWith(`${subItem.href}/`)

              return (
                <Link
                  key={index}
                  ref={(el) => {
                    itemLinksRef.current[index] = el
                  }}
                  to={subItem.href}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => setIsOpen(false)}
                  onKeyDown={(e) => handleItemKeyDown(e, index)}
                  className={cn(
                    'group block px-4.5 py-3 transition-colors duration-150 outline-none',
                    'hover:bg-slate-50 focus-visible:bg-blue-50/70 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#082046]',
                    isActive && 'bg-blue-50/50 font-semibold'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'text-[14px] sm:text-[14.5px] font-bold tracking-tight transition-colors',
                        isActive
                          ? 'text-[#082046]'
                          : 'text-slate-800 group-hover:text-[#0C4DA2]'
                      )}
                    >
                      {subItem.label}
                    </span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-[#E4B316]" aria-hidden="true" />
                    )}
                  </div>
                  {subItem.description && (
                    <p className="mt-1 text-[12.5px] text-slate-500 font-normal line-clamp-1 leading-snug">
                      {subItem.description}
                    </p>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

