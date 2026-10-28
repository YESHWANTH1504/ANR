import React, { useEffect, useState, useRef } from 'react'
import {
  GalleryHero,
  FeaturedGallery,
  GalleryCollection,
  GalleryContext,
  GalleryCTA,
} from '@/sections/gallery'
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox'
import { GALLERY_ITEMS, type GalleryItem } from '@/data/gallery'
import { publicService } from '@/api/services/publicService'

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Gallery | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })

    publicService
      .getGallery()
      .then((data) => {
        if (data && data.length > 0) {
          setItems(
            data.map((g) => ({
              id: g.id,
              title: g.title,
              category: g.category as GalleryItem['category'],
              src: g.image_url,
              alt: g.alt_text,
              caption: g.caption,
              featured: g.is_featured,
            }))
          )
        }
      })
      .catch(() => {
        // Fall back gracefully to verified initial gallery
      })

    return () => {
      document.title = originalTitle
    }
  }, [])

  const handleOpenLightbox = (item: GalleryItem, triggerEl?: HTMLElement) => {
    const idx = items.findIndex((i) => i.id === item.id)
    setCurrentImageIndex(idx !== -1 ? idx : 0)
    triggerRef.current = triggerEl || (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    setLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    setLightboxOpen(false)
  }

  const handleNavigateLightbox = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="w-full">
      {/* SECTION 1: Gallery Hero */}
      <GalleryHero />

      {/* SECTION 2: Featured Visual */}
      <FeaturedGallery onOpenLightbox={handleOpenLightbox} />

      {/* SECTION 3: Gallery Collection with Category Filters */}
      <GalleryCollection
        items={items}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* SECTION 5: Gallery Institutional Context */}
      <GalleryContext />

      {/* SECTION 6: Closing Institutional CTA */}
      <GalleryCTA />

      {/* SECTION 4: Image Viewer / Lightbox Modal */}
      <GalleryLightbox
        items={items}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
        triggerElementRef={triggerRef}
      />
    </div>
  )
}
