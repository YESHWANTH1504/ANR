import React, { useState, useEffect, useCallback } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { adminService } from '@/api/services/adminService'
import type { NewsArticle } from '@/api/types'

export const AdminNewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Notice',
    summary: '',
    content: '',
    publication_date: 'Recent',
    is_published: true,
  })

  const loadNews = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminService.getAllNews()
      setNews(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news articles')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadNews()
  }, [loadNews])

  const openAddModal = () => {
    setEditingArticle(null)
    setFormData({
      title: '',
      slug: '',
      category: 'Notice',
      summary: '',
      content: '',
      publication_date: 'Recent',
      is_published: true,
    })
    setModalOpen(true)
  }

  const openEditModal = (article: NewsArticle) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      slug: article.slug,
      category: article.category,
      summary: article.summary,
      content: article.content || '',
      publication_date: article.publication_date,
      is_published: article.is_published,
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.slug.trim() || !formData.summary.trim()) {
      alert('Please fill in title, slug, and summary.')
      return
    }

    setIsSaving(true)
    try {
      if (editingArticle) {
        const updated = await adminService.updateNews(editingArticle.id, formData)
        setNews((prev) => prev.map((n) => (n.id === updated.id ? updated : n)))
      } else {
        const created = await adminService.createNews(formData)
        setNews((prev) => [created, ...prev])
      }
      setModalOpen(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save news article')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return
    try {
      await adminService.deleteNews(id)
      setNews((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete article')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#082046]">News, Events &amp; Circulars Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish institutional bulletins, seminar reports, NSS activities, and student notices.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#082046] hover:bg-[#0C4DA2] text-white text-xs font-bold cursor-pointer shadow-xs"
        >
          <Plus className="h-4 w-4 text-[#E4B316]" />
          <span>Publish Article</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading articles...</div>
        ) : news.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No news articles published yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Date Tag</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {news.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 max-w-md">
                      <div className="truncate">{article.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">/news/{article.slug}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {article.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{article.publication_date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          article.is_published
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {article.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(article)}
                        className="p-1 rounded text-blue-600 hover:bg-blue-50 cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-[#082046] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {editingArticle ? 'Edit Article / Circular' : 'Create Article / Circular'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-white/10 text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Headline Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NSS Unit Completes Seven-Day Special Camp"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="nss-camp-2026"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                  >
                    <option value="Notice">Notice</option>
                    <option value="Event">Event</option>
                    <option value="Camp">Camp</option>
                    <option value="Academics">Academics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Short Summary (Brief)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="One or two sentences summarizing the announcement..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Full Article Content</label>
                <textarea
                  rows={4}
                  placeholder="Comprehensive event details, participating faculty officers, and outcomes..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Publication Date Label</label>
                <input
                  type="text"
                  placeholder="Recent or e.g. 15 March 2026"
                  value={formData.publication_date}
                  onChange={(e) => setFormData({ ...formData, publication_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="news-published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="h-4 w-4 rounded text-[#0C4DA2]"
                />
                <label htmlFor="news-published" className="font-bold text-slate-700">
                  Published (Uncheck to keep as private Draft)
                </label>
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
                  <span>{editingArticle ? 'Save Changes' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
