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
import type { Programme, Department } from '@/api/types'

export const AdminProgrammesPage: React.FC = () => {
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProg, setEditingProg] = useState<Programme | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    degree: '',
    level: 'UG',
    department_id: '',
    duration_years: 3,
    description: '',
    admission_info: '',
    display_order: 1,
    is_active: true,
  })

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [progs, depts] = await Promise.all([
        adminService.getAllProgrammes(),
        adminService.getAllDepartments(),
      ])
      setProgrammes(progs)
      setDepartments(depts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch programmes')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const openAddModal = () => {
    setEditingProg(null)
    setFormData({
      name: '',
      slug: '',
      degree: '',
      level: 'UG',
      department_id: departments[0]?.id || '',
      duration_years: 3,
      description: '',
      admission_info: '',
      display_order: programmes.length + 1,
      is_active: true,
    })
    setModalOpen(true)
  }

  const openEditModal = (prog: Programme) => {
    setEditingProg(prog)
    setFormData({
      name: prog.name,
      slug: prog.slug,
      degree: prog.degree,
      level: prog.level,
      department_id: prog.department_id,
      duration_years: prog.duration_years,
      description: prog.description,
      admission_info: prog.admission_info || '',
      display_order: prog.display_order,
      is_active: prog.is_active,
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.slug.trim() || !formData.department_id) {
      alert('Please fill in programme name, slug, and associated department.')
      return
    }

    setIsSaving(true)
    try {
      if (editingProg) {
        const updated = await adminService.updateProgramme(editingProg.id, formData)
        setProgrammes((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      } else {
        const created = await adminService.createProgramme(formData)
        setProgrammes((prev) => [...prev, created])
      }
      setModalOpen(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save programme')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this academic programme?')) return
    try {
      await adminService.deleteProgramme(id)
      setProgrammes((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete programme')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#082046]">Academic Programmes Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure degree programmes, syllabi descriptions, intake durations, and active display status.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#082046] hover:bg-[#0C4DA2] text-white text-xs font-bold cursor-pointer shadow-xs"
        >
          <Plus className="h-4 w-4 text-[#E4B316]" />
          <span>Add Programme</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Programmes Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading programmes...</div>
        ) : programmes.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No programmes added yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Programme</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Degree &amp; Level</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {programmes.map((prog) => (
                  <tr key={prog.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div>{prog.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">/programmes/{prog.slug}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {prog.department_name || departments.find((d) => d.id === prog.department_id)?.name || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{prog.degree}</span>
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                        {prog.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{prog.duration_years} Years</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          prog.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {prog.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(prog)}
                        className="p-1 rounded text-blue-600 hover:bg-blue-50 cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(prog.id)}
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

      {/* Modal for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-[#082046] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {editingProg ? 'Edit Academic Programme' : 'Add New Programme'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-white/10 text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Programme Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Sc Computer Science"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. computer-science"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Degree Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Bachelor of Science (B.Sc)"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Degree Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                  >
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Duration (Years)</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={formData.duration_years}
                    onChange={(e) => setFormData({ ...formData, duration_years: parseInt(e.target.value) || 3 })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Department</label>
                  <select
                    required
                    value={formData.department_id}
                    onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.code} - {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Curricular Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline foundational and advanced competencies covered in this degree..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Admission Eligibility</label>
                <input
                  type="text"
                  placeholder="e.g. Higher Secondary (+2) with Mathematics / Computer Science."
                  value={formData.admission_info}
                  onChange={(e) => setFormData({ ...formData, admission_info: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="prog-active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 rounded text-[#0C4DA2]"
                />
                <label htmlFor="prog-active" className="font-bold text-slate-700">
                  Active (Display publicly on website)
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
                  <span>{editingProg ? 'Save Changes' : 'Create Programme'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
