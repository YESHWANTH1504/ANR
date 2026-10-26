import React, { useState, useEffect, useCallback } from 'react'
import {
  Search,
  Trash2,
  Save,
  X,
  Phone,
  Mail,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { adminService } from '@/api/services/adminService'
import type { AdmissionsEnquiry } from '@/api/types'

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<AdmissionsEnquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionsEnquiry | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')
  const [editStatus, setEditStatus] = useState('')

  const loadEnquiries = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminService.getEnquiries(statusFilter || undefined, searchQuery || undefined)
      setEnquiries(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch enquiries')
    } finally {
      setLoading(false)
    }
  }, [statusFilter, searchQuery])

  useEffect(() => {
    loadEnquiries()
  }, [loadEnquiries])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadEnquiries()
  }

  const openTriageModal = (enquiry: AdmissionsEnquiry) => {
    setSelectedEnquiry(enquiry)
    setAdminNotes(enquiry.admin_notes || '')
    setEditStatus(enquiry.status)
  }

  const handleSaveTriage = async () => {
    if (!selectedEnquiry) return
    setIsUpdating(true)
    try {
      const updated = await adminService.updateEnquiry(selectedEnquiry.id, {
        status: editStatus,
        admin_notes: adminNotes,
      })
      setEnquiries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
      setSelectedEnquiry(updated)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update enquiry status')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return
    try {
      await adminService.deleteEnquiry(id)
      setEnquiries((prev) => prev.filter((e) => e.id !== id))
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete record')
    }
  }

  const statusOptions = ['New', 'Contacted', 'In Progress', 'Closed']

  return (
    <div className="space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#082046]">Admissions Enquiries Triage</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage applicant submissions, assign contact status, and log registry notes.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <form onSubmit={handleSearch} className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0C4DA2]"
          />
        </form>

        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          <button
            onClick={() => setStatusFilter('')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              statusFilter === '' ? 'bg-[#082046] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({enquiries.length})
          </button>
          {statusOptions.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#082046] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table of Enquiries */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading admissions records...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No admissions enquiries match the selected criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Programme</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div>{enq.applicant_name}</div>
                      <div className="text-[10px] font-mono text-slate-400">#{enq.id.slice(0, 8).toUpperCase()}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div>{enq.phone}</div>
                      <div className="text-slate-400 text-[11px]">{enq.email}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {enq.programme_name || 'General Admission'}
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          enq.status === 'New'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : enq.status === 'In Progress'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openTriageModal(enq)}
                        className="px-2.5 py-1 rounded bg-blue-50 text-[#0C4DA2] hover:bg-blue-100 font-bold text-[11px] cursor-pointer"
                      >
                        Triage / Notes
                      </button>
                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Triage Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-[#082046] text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Enquiry Details &amp; Triage</h3>
                <div className="text-[11px] text-amber-300 font-mono">Ref: #{selectedEnquiry.id.slice(0, 8).toUpperCase()}</div>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Applicant Info */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-sm text-slate-800">{selectedEnquiry.applicant_name}</div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="h-3.5 w-3.5 text-[#E4B316]" />
                  <span>{selectedEnquiry.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-3.5 w-3.5 text-[#E4B316]" />
                  <span>{selectedEnquiry.email}</span>
                </div>
                {selectedEnquiry.programme_name && (
                  <div className="font-medium text-slate-800 pt-1">
                    Programme Interest: <strong>{selectedEnquiry.programme_name}</strong>
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Applicant Query</label>
                <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-800 italic leading-relaxed">
                  "{selectedEnquiry.message}"
                </div>
              </div>

              {/* Status Select */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Processing Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Internal Admin Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Internal Registry Notes</label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record call logs, counseling discussions, or fee payment reminders here..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleSaveTriage}
                disabled={isUpdating}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#082046] hover:bg-[#0C4DA2] text-white text-xs font-bold cursor-pointer disabled:opacity-60"
              >
                {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
