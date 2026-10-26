import React, { useMemo } from 'react'
import { ZoomIn, Inbox, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Reveal } from '@/components/shared/Reveal'
import { GALLERY_ITEMS, type GalleryItem, getGalleryCategories } from '@/data/gallery'
import { GalleryFilters } from './GalleryFilters'

export interface GalleryCollectionProps {
  items?: GalleryItem[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  onOpenLightbox: (item: GalleryItem, triggerElement: HTMLElement) => void
}

export const GalleryCollection: React.FC<GalleryCollectionProps> = ({
  items = GALLERY_ITEMS,
  selectedCategory,
  onSelectCategory,
  onOpenLightbox,
}) => {
  const categories = useMemo(() => getGalleryCategories(), [])

  // Item counts per category
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: items.length }
    items.forEach((item) => {
      map[item.category] = (map[item.category] || 0) + 1
    })
    return map
  }, [items])

  // Filter items
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return items
    return items.filter((item) => item.category === selectedCategory)
  }, [items, selectedCategory])

  // Asymmetric grid layout spans for up to 6 items
  const getGridSpan = (index: number, total: number) => {
    if (total <= 3) return 'lg:col-span-4'
    switch (index % 6) {
      case 0:
        return 'lg:col-span-8' // Large image
      case 1:
        return 'lg:col-span-4' // Smaller image 1
      case 2:
        return 'lg:col-span-4' // Smaller image 2
      case 3:
        return 'lg:col-span-8' // Wide image
      case 4:
        return 'lg:col-span-6' // Two-column image A
      case 5:
        return 'lg:col-span-6' // Two-column image B
      default:
        return 'lg:col-span-4'
    }
  }

  const getAspect = (index: number, total: number) => {
    if (total <= 3) return 'aspect-[4/3]'
    switch (index % 6) {
      case 0:
        return 'aspect-[16/10]'
      case 1:
        return 'aspect-[4/3]'
      case 2:
        return 'aspect-[4/3]'
      case 3:
        return 'aspect-[16/9]'
      case 4:
      case 5:
        return 'aspect-[16/10]'
      default:
        return 'aspect-[4/3]'
    }
  }

  return (
    <section id="collection" className="py-20 lg:py-28 bg-[var(--color-ivory)] border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header with Category Filters */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[var(--color-border)] pb-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
                <span className="h-px w-6 bg-[var(--color-gold)]" />
                <span>Photographic Collection</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-ink)] tracking-tight leading-[1.12]">
                Campus Visual Archive.
              </h2>
              <p className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed">
                Curated documentation of collegiate infrastructure, laboratory sessions, and co-curricular student life at ANRCAS.
              </p>
            </div>

            <GalleryFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
              counts={counts}
            />
          </div>
        </Reveal>

        {/* Collection Grid or Empty State */}
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={<Inbox className="h-8 w-8 text-slate-400" />}
            title="No Photographs in this Category"
            description="There are currently no published photographs under this filter. Please choose 'All' to review the full collection."
            action={
              <button
                type="button"
                onClick={() => onSelectCategory('All')}
                className="text-xs font-bold text-[var(--color-ink)] hover:text-[var(--color-anrcas-blue)] hover:underline cursor-pointer"
              >
                Reset Filter to All
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {filteredItems.map((item, index) => {
              const spanClass = getGridSpan(index, filteredItems.length)
              const aspectClass = getAspect(index, filteredItems.length)

              return (
                <div key={item.id} className={`${spanClass}`}>
                  <Reveal delay={(index % 3) * 80} className="h-full">
                    <button
                      type="button"
                      onClick={(e) => onOpenLightbox(item, e.currentTarget)}
                      aria-label={`Open photo viewer for ${item.title}`}
                      className="group relative w-full h-full border border-[var(--color-border)] bg-[var(--color-ink)] overflow-hidden cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[var(--color-anrcas-blue)] block shadow-xs hover:border-[var(--color-ink)] transition-colors"
                    >
                      <div className={`relative ${aspectClass} w-full overflow-hidden`}>
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          className="h-full w-full object-cover object-center group-hover:scale-[1.04] motion-reduce:transform-none transition-transform duration-700 filter brightness-95"
                        />

                        {/* Subtle Editorial Gradient Overlay */}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity"
                          aria-hidden="true"
                        />

                        {/* Hover View Affordance */}
                        <div className="absolute top-4 right-4 h-9 w-9 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                          <ZoomIn className="h-4 w-4" aria-hidden="true" />
                        </div>

                        {/* Bottom Tag & Title */}
                        <div className="absolute bottom-4 left-4 right-4 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-light)]">
                              {item.category}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span>Enlarge</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </span>
                          </div>

                          <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-normal leading-snug text-white">
                            {item.title}
                          </h3>

                          {item.caption && (
                            <p className="text-xs text-stone-300 mt-1 line-clamp-2 font-light opacity-90">
                              {item.caption}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  </Reveal>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
