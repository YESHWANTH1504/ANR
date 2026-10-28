import React, { useState, useEffect } from 'react'
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Radio,
  Phone,
  Mail,
  Building,
} from 'lucide-react'
import { adminService } from '@/api/services/adminService'

export const AdminSettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Local state for common institutional fields
  const [form, setForm] = useState({
    campus_notice: '',
    primary_phone: '',
    landline: '',
    email: '',
    admissions_active: 'true',
    affiliation: '',
  })

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      try {
        const items = await adminService.getAllSettings()
        if (!ignore) {
          const map: Record<string, string> = {}
          for (const item of items) {
            map[item.key] = item.value
          }
          setForm({
            campus_notice:
              map['campus_notice'] ||
              'ADMISSIONS 2026–2027: Application portals active for UG & PG Degree Programmes.',
            primary_phone: map['primary_phone'] || '+91 8939804020',
            landline: map['landline'] || '04182-247518',
            email: map['email'] || 'admin@anrcas.edu.in',
            admissions_active: map['admissions_active'] || 'true',
            affiliation: map['affiliation'] || 'Affiliated to Thiruvalluvar University, Vellore',
          })
          setError(null)
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Failed to load site settings')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveSuccess(false)
    setError(null)

    try {
      await Promise.all([
        adminService.updateSetting('campus_notice', form.campus_notice, 'Top banner broadcast alert'),
        adminService.updateSetting('primary_phone', form.primary_phone, 'Main helpline'),
        adminService.updateSetting('landline', form.landline, 'Administrative landline'),
        adminService.updateSetting('email', form.email, 'Official correspondence email'),
        adminService.updateSetting('admissions_active', form.admissions_active, 'Intake active flag'),
        adminService.updateSetting('affiliation', form.affiliation, 'University affiliation'),
      ])
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 4000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-3 border-[#0C4DA2] border-t-transparent rounded-full animate-spin" />
          <div className="text-xs font-semibold text-slate-500">Loading Institutional Settings...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="font-serif text-2xl font-bold text-[#082046]">Approved Site Settings &amp; Broadcasts</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure verified contact information, affiliations, and live campus notification tickers visible across the public website.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {saveSuccess && (
        <div className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Institutional settings updated successfully! Public website tickers updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
        {/* Live Broadcast Ticker Alert */}
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 space-y-3">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-[#0C4DA2] animate-pulse" />
            <h2 className="font-bold text-xs uppercase tracking-wider text-[#082046]">
              Live Homepage Broadcast Notice
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            This message appears in the collegiate blue ticker banner at the top of the homepage Hero Section.
          </p>
          <textarea
            rows={2}
            required
            value={form.campus_notice}
            onChange={(e) => setForm({ ...form, campus_notice: e.target.value })}
            className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
            placeholder="e.g. ADMISSIONS 2026–2027: Application portals active for UG & PG Degree Programmes."
          />
        </div>

        {/* Contact Coordinates */}
        <div className="space-y-4">
          <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700">Official Contact Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Primary Mobile Helpline</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={form.primary_phone}
                  onChange={(e) => setForm({ ...form, primary_phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Administrative Landline</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={form.landline}
                  onChange={(e) => setForm({ ...form, landline: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Official Desk Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">University Affiliation</label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={form.affiliation}
                  onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0C4DA2] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Admissions Intake Status */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
          <label className="block font-bold text-xs uppercase tracking-wider text-slate-700">
            Admissions Intake Operational Status
          </label>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="admissions_active"
                value="true"
                checked={form.admissions_active === 'true'}
                onChange={(e) => setForm({ ...form, admissions_active: e.target.value })}
                className="text-[#0C4DA2]"
              />
              <span>Admissions Active (Open Intake)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="admissions_active"
                value="false"
                checked={form.admissions_active === 'false'}
                onChange={(e) => setForm({ ...form, admissions_active: e.target.value })}
                className="text-[#0C4DA2]"
              />
              <span>Admissions Closed (Intake Finalized)</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#082046] hover:bg-[#0C4DA2] text-white text-xs font-bold cursor-pointer disabled:opacity-60 shadow-xs"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 text-[#E4B316]" />}
            <span>Save Public Settings</span>
          </button>
        </div>
      </form>
    </div>
  )
}
