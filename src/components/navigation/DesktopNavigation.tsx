import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MAIN_NAV_ITEMS } from '@/data/navigation'
import { NavigationDropdown } from './NavigationDropdown'
import { cn } from '@/lib/utils'

export interface DesktopNavigationProps {
  className?: string
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ className }) => {
  const location = useLocation()

  return (
    <nav
      aria-label="Primary institutional navigation"
      className={cn('hidden nav:flex items-center gap-1 xl:gap-1.5 2xl:gap-2 h-full', className)}
    >
      {MAIN_NAV_ITEMS.map((item, index) => {
        // Dropdown link if it has children
        if (item.children && item.children.length > 0) {
          return <NavigationDropdown key={index} item={item} />
        }

        // Direct navigation link
        const isActive =
          item.href === '/'
            ? location.pathname === '/'
            : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={index}
            to={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative inline-flex items-center gap-1.5 px-2 xl:px-2.5 2xl:px-3.5 py-2 text-[14px] xl:text-[14.5px] 2xl:text-[15.5px] font-bold tracking-tight transition-colors duration-150 rounded cursor-pointer whitespace-nowrap shrink-0',
              'hover:text-[#0C4DA2] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#082046]',
              isActive
                ? 'text-[#082046] font-extrabold'
                : 'text-slate-800 hover:text-[#082046]'
            )}
          >
            <span>{item.label}</span>

            {item.badge && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#E4B316] text-[#082046] font-extrabold text-[11px] uppercase tracking-wide">
                {item.badge}
              </span>
            )}

            {/* Active Gold Underline Bar */}
            {isActive && (
              <span
                className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#E4B316] rounded-full"
                aria-hidden="true"
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

