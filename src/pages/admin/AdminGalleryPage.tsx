import React, { useState, useEffect, useCallback } from 'react'
import {
  Plus,
  Trash2,
  X,
  AlertCircle,
  Loader2,
  Upload,
  Star,
} from 'lucide-react'
import { adminService } from '@/api/services/adminService'
import type { GalleryItem } from '@/api/types'

export const AdminGalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    category: 'Campus Grounds',
    image_url: '',
    alt_text: '',
    caption: '',
    is_featured: false,
    display_order: 1,
    is_published: true,
  })

  const loadGallery = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminService.getAllGallery()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gallery')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGallery()
  }, [loadGallery])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingFile(true)
    try {
      const result = await adminService.uploadImage(file)
      setFormData((prev) => ({
        ...prev,
        image_url: result.url,
      }))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to upload image file')
    } finally {
      setUploadingFile(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.image_url.trim()) {
      alert('Please provide a title and an image file/URL.')
      return
    }

    setIsSaving(true)
    try {
      const created = await adminService.createGalleryItem({
        ...formData,
        alt_text: formData.alt_text.trim() || formData.title.trim(),
        caption: formData.caption.trim() || formData.title.trim(),
      })
      setItems((prev) => [created, ...prev])
      setModalOpen(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add gallery photo')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return
    try {
      await adminService.deleteGalleryItem(id)
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete gallery item')
    }
  }

  const categories = [
    'Campus Grounds',
    'Academic Life',
    'Technology Labs',
    'Sports & Athletics',
    'Campus Culture',
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#082046]">Campus Gallery Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage authenticated campus photographs, category tags, captions, and featured placements.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              title: '',
              category: 'Campus Grounds',
              image_url: '',
              alt_text: '',
              caption: '',
              is_featured: false,
              display_order: items.length + 1,
              is_published: true,
            })
            setModalOpen(true)
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#082046] hover:bg-[#0C4DA2] text-white text-xs font-bold cursor-pointer shadow-xs"
        >
          <Plus className="h-4 w-4 text-[#E4B316]" />
          <span>Add Photo</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid of Gallery Photos */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
          Loading campus gallery...
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
          No gallery items found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between">
              <div>
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.alt_text}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback placeholder display
                      ;(e.target as HTMLElement).style.display = 'none'
                    }}
                  />
                  {item.is_featured && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-400 text-[#082046] font-bold text-[10px] flex items-center gap-1 shadow">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0C4DA2]">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{item.caption}</p>
                </div>
              </div>

              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span
                  className={`text-[10px] font-bold ${
                    item.is_published ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {item.is_published ? 'Published' : 'Hidden'}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload / Add Photo Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-[#082046] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add Campus Photograph</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-white/10 text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Photo Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Laboratory Workshop"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Campus Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Source (Upload or URL) */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <label className="block font-bold text-slate-700 uppercase">Image File or URL</label>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs">
                    <Upload className="h-3.5 w-3.5 text-[#0C4DA2]" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadingFile && <Loader2 className="h-4 w-4 animate-spin text-[#0C4DA2]" />}
                </div>

                <div className="text-[11px] text-slate-500">Or specify an absolute asset path:</div>
                <input
                  type="text"
                  required
                  placeholder="/assets/campus_main.webp or /uploads/..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Editorial Caption</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Accompanying narrative description..."
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="gal-featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="h-4 w-4 rounded text-[#0C4DA2]"
                  />
                  <label htmlFor="gal-featured" className="font-bold text-slate-700">
                    Featured
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="gal-published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="h-4 w-4 rounded text-[#0C4DA2]"
                  />
                  <label htmlFor="gal-published" className="font-bold text-slate-700">
                    Published
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#082046] hover:bg-[#0C4DA2] text-white font-bold cursor-pointer disabled:opacity-60"
                >
                  {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Save Photo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
