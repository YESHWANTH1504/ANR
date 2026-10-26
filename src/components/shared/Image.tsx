import React, { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'auto' | '1/1' | '4/3' | '16/9' | '3/2' | '21/9'
  fallbackSrc?: string
  fallbackLabel?: string
  containerClassName?: string
}

const aspectRatioClasses = {
  auto: '',
  '1/1': 'aspect-square',
  '4/3': 'aspect-4/3',
  '16/9': 'aspect-video',
  '3/2': 'aspect-3/2',
  '21/9': 'aspect-21/9',
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = 'ANRCAS institution visual',
  aspectRatio = 'auto',
  fallbackSrc,
  fallbackLabel = 'Image placeholder',
  containerClassName,
  className,
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (fallbackSrc && src !== fallbackSrc) {
      // attempt fallback
      setHasError(false)
    } else {
      setHasError(true)
    }
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--color-surface-subtle)]',
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-slate-200/80" />
      )}

      {/* Fallback View if missing or broken */}
      {hasError || !src ? (
        <div className="flex h-full min-h-[140px] w-full flex-col items-center justify-center p-4 text-center text-[var(--color-text-muted)] bg-slate-100 border border-[var(--color-border)]">
          <ImageOff className="h-8 w-8 mb-2 opacity-50" strokeWidth={1.5} />
          <span className="text-xs font-medium uppercase tracking-wider">{fallbackLabel}</span>
          <span className="text-xs opacity-75 mt-0.5 max-w-[200px] truncate">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      )}
    </div>
  )
}
