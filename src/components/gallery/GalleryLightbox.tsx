import React, { useEffect, useRef, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import type { GalleryItem } from '@/data/gallery'

export interface GalleryLightboxProps {
  items: GalleryItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
  triggerElementRef?: React.RefObject<HTMLElement | null>
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  triggerElementRef,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  const currentItem = items[currentIndex]

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1)
    } else {
      onNavigate(items.length - 1)
    }
  }, [currentIndex, items.length, onNavigate])

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1)
    } else {
      onNavigate(0)
    }
  }, [currentIndex, items.length, onNavigate])

  // Body scroll lock & focus management
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    const triggerEl = triggerElementRef?.current

    return () => {
      document.body.style.overflow = previousOverflow
      clearTimeout(timer)
      // Return focus to triggering element
      triggerEl?.focus()
    }
  }, [isOpen, triggerElementRef])

  // Keyboard navigation & trap
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'Tab') {
        // Focus trap
        if (!dialogRef.current) return
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleNext, handlePrev, onClose])

  if (!isOpen || !currentItem) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      aria-describedby="lightbox-caption"
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-opacity duration-200 motion-reduce:transition-none"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-slate-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-slate-950/70 text-white z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800/60">
              {currentIndex + 1} of {items.length}
            </span>
            <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
              {currentItem.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] h-11 w-11 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Image Display Area with Navigation Arrows */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[280px] sm:min-h-[420px] max-h-[65vh]">
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            className="max-h-[65vh] w-auto max-w-full object-contain mx-auto select-none"
          />

          {/* Previous Button */}
          <button
            ref={previousButtonRef}
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Next Button */}
          <button
            ref={nextButtonRef}
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Bottom Caption & Information Panel */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t border-white/10 text-white">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
            <div className="space-y-1">
              <h3 id="lightbox-title" className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentItem.title}
              </h3>
              <p id="lightbox-caption" className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {currentItem.caption}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1 sm:mt-0">
              <ZoomIn className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              <span>ANRCAS Visual Archive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
