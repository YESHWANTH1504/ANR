import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import type { NavItem } from '@/data/navigation'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export interface MobileNavigationItemProps {
  item: NavItem
  onClose: () => void
}

export const MobileNavigationItem: React.FC<MobileNavigationItemProps> = ({ item, onClose }) => {
  const location = useLocation()
  const hasChildren = Boolean(item.children && item.children.length > 0)

  // Auto-expand if a child route is currently active
  const isChildActive = item.children?.some(
    (child) => location.pathname === child.href || location.pathname.startsWith(`${child.href}/`)
  )
  const isDirectActive =
    item.href === '/'
      ? location.pathname === '/'
      : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)

  const [isExpanded, setIsExpanded] = useState(isChildActive)

  const itemId = `mobile-nav-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  if (hasChildren) {
    return (
      <div className="border-b border-slate-100 last:border-b-0">
        <button
          type="button"
          id={`${itemId}-btn`}
          aria-expanded={isExpanded}
          aria-controls={`${itemId}-panel`}
          onClick={() => setIsExpanded((prev) => !prev)}
          className={cn(
            'flex w-full min-h-[50px] items-center justify-between py-3.5 px-4.5 text-left font-bold text-[16px] sm:text-[17px] tracking-tight transition-colors cursor-pointer',
            isChildActive ? 'text-[#082046] bg-blue-50/50' : 'text-slate-800 hover:bg-slate-50',
            'focus-visible:outline-2 focus-visible:outline-[#082046]'
          )}
        >
          <div className="flex items-center gap-2">
            <span>{item.label}</span>
            {item.badge && (
              <Badge variant="accent" size="sm" className="bg-[#E4B316] text-[#082046] font-bold text-xs">
                {item.badge}
              </Badge>
            )}
          </div>
          <ChevronDown
            className={cn(
              'h-4.5 w-4.5 text-slate-400 transition-transform duration-200',
              isExpanded && 'rotate-180 text-[#082046]'
            )}
            aria-hidden="true"
          />
        </button>

        {isExpanded && (
          <div
            id={`${itemId}-panel`}
            role="region"
            aria-labelledby={`${itemId}-btn`}
            className="bg-slate-50/80 py-1.5 pl-4 pr-3 space-y-1 border-t border-slate-100"
          >
            {item.children?.map((subItem, index) => {
              const isActive =
                location.pathname === subItem.href ||
                location.pathname.startsWith(`${subItem.href}/`)

              return (
                <Link
                  key={index}
                  to={subItem.href}
                  onClick={onClose}
                  className={cn(
                    'flex flex-col justify-center min-h-[46px] py-2.5 px-3.5 text-[14px] sm:text-[15px] font-semibold rounded-[var(--radius-sm)] transition-colors',
                    isActive
                      ? 'text-[#082046] bg-white font-bold border-l-2 border-[#082046] shadow-xs'
                      : 'text-slate-700 hover:text-[#082046] hover:bg-white/80'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{subItem.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
                    )}
                  </div>
                  {subItem.description && (
                    <p className="mt-0.5 text-[12.5px] text-slate-500 font-normal line-clamp-1 leading-snug">
                      {subItem.description}
                    </p>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <Link
        to={item.href}
        onClick={onClose}
        aria-current={isDirectActive ? 'page' : undefined}
        className={cn(
          'flex min-h-[50px] items-center justify-between py-3.5 px-4.5 font-bold text-[16px] sm:text-[17px] tracking-tight transition-colors',
          isDirectActive
            ? 'text-[#082046] bg-blue-50/50 border-l-2 border-[#082046]'
            : 'text-slate-800 hover:bg-slate-50',
          'focus-visible:outline-2 focus-visible:outline-[#082046]'
        )}
      >
        <span>{item.label}</span>
        {item.badge && (
          <Badge variant="accent" size="sm" className="bg-[#E4B316] text-[#082046] font-bold text-xs">
            {item.badge}
          </Badge>
        )}
      </Link>
    </div>
  )
}

