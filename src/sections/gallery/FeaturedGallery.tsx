import React from 'react'
import { ZoomIn, Camera, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { H2, EditorialLabel } from '@/components/ui/Typography'
import { getFeaturedGalleryItem, type GalleryItem } from '@/data/gallery'

export interface FeaturedGalleryProps {
  onOpenLightbox: (item: GalleryItem, triggerElement?: HTMLElement) => void
}

export const FeaturedGallery: React.FC<FeaturedGalleryProps> = ({ onOpenLightbox }) => {
  const featured = getFeaturedGalleryItem()

  return (
    <Section
      variant="card"
      padding="lg"
      id="featured-visual"
      className="border-b border-[var(--color-border)] bg-white"
    >
      <Container size="wide">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-8 space-y-2">
          <EditorialLabel className="text-[var(--color-primary)]">
            Featured Photograph
          </EditorialLabel>
          <H2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Campus Perspective
          </H2>
        </div>

        {/* Large Editorial Visual Card */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-slate-50/50 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Column (Clickable Button to open Lightbox) */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] bg-slate-950 overflow-hidden group">
              <button
                type="button"
                onClick={(e) => onOpenLightbox(featured, e.currentTarget)}
                aria-label={`Enlarge featured photograph: ${featured.title}`}
                className="absolute inset-0 w-full h-full text-left cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--color-secondary)]"
              >
                <img
                  src={featured.src}
                  alt={featured.alt}
                  loading="eager"
                  className="h-full w-full object-cover object-center group-hover:scale-103 motion-reduce:transform-none transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/85 via-[var(--color-primary-dark)]/20 to-transparent"
                  aria-hidden="true"
                />

                {/* Hover Pill Affordance */}
                <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/20">
                  <ZoomIn className="h-5 w-5" aria-hidden="true" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/50 backdrop-blur-xs text-xs font-semibold tracking-wider uppercase border border-white/20">
                    <Sparkles className="h-3 w-3 text-amber-300" aria-hidden="true" />
                    Featured Institutional Archive
                  </span>
                </div>
              </button>
            </div>

            {/* Editorial Context Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="accent" size="sm">
                    {featured.category}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">
                    Archival Record
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] font-serif leading-tight">
                  {featured.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {featured.caption}
                </p>

                <div className="pt-2 text-xs text-slate-500">
                  <p>
                    <span className="font-semibold text-slate-700">Location: </span>
                    Vadamavandal Road, Thiruvannamalai District, Tamil Nadu
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Camera className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  Authentic Campus Record
                </span>

                <Button
                  variant="primary"
                  size="md"
                  onClick={(e) => onOpenLightbox(featured, e.currentTarget)}
                  leftIcon={<ZoomIn className="h-4 w-4" />}
                >
                  View Full Image
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
