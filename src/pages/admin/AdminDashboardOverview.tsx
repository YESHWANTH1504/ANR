import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import {

  GraduationCap,

  Mail,

  BookOpen,

  Newspaper,

  ArrowRight,

  AlertCircle,

  Eye,

  Settings,

} from 'lucide-react'

import { adminService } from '@/api/services/adminService'

import type { DashboardStats, AdmissionsEnquiry, ContactMessage } from '@/api/types'



export const AdminDashboardOverview: React.FC = () => {

  const [stats, setStats] = useState<DashboardStats | null>(null)

  const [recentEnquiries, setRecentEnquiries] = useState<AdmissionsEnquiry[]>([])

  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)
  const [reloadTrigger, setReloadTrigger] = useState(0)



  useEffect(() => {

    let ignore = false

    const fetchData = async () => {

      try {

        const [statsData, enquiriesData, messagesData] = await Promise.all([

          adminService.getDashboardStats(),

          adminService.getEnquiries(undefined, undefined),

          adminService.getContactMessages(undefined, undefined),

        ])

        if (!ignore) {

          setStats(statsData)

          setRecentEnquiries(enquiriesData.slice(0, 5))

          setRecentMessages(messagesData.slice(0, 5))

        }

      } catch (err) {

        if (!ignore) {

          setError(err instanceof Error ? err.message : 'Failed to load dashboard metrics')

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

  }, [reloadTrigger])



  if (loading) {

    return (

      <div className="flex items-center justify-center min-h-[400px]">

        <div className="flex flex-col items-center gap-2">

          <div className="h-8 w-8 border-3 border-[#0C4DA2] border-t-transparent rounded-full animate-spin" />

          <div className="text-xs font-semibold text-slate-500">Loading Dashboard Metrics...</div>

        </div>

      </div>

    )

  }



  return (

    <div className="space-y-8">

      {/* Page Title & Status Header */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">

        <div>

          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#082046] tracking-tight">

            Institutional Dashboard Overview

          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">

            Real-time status of applicant registrations, student enquiries, academic programmes, and campus notices.

          </p>

        </div>



        <div className="flex items-center gap-2.5">

          <Link

            to="/admin/settings"

            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"

          >

            <Settings className="h-3.5 w-3.5 text-slate-500" />

            <span>Update Banner</span>

          </Link>

          <button

            onClick={() => setReloadTrigger((prev) => prev + 1)}

            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#082046] text-white text-xs font-bold hover:bg-[#0C4DA2] transition-colors shadow-2xs cursor-pointer"

          >

            <span>Refresh Metrics</span>

          </button>

        </div>

      </div>



      {error && (

        <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-900 text-xs flex items-center gap-3">

          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />

          <span>{error}</span>

        </div>

      )}



      {/* KPI Metrics Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Enquiries Card */}

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">

          <div className="flex items-center justify-between">

            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Admissions Enquiries</span>

            <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#0C4DA2] flex items-center justify-center">

              <GraduationCap className="h-4 w-4" />

            </div>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-3xl font-extrabold text-[#082046]">{stats?.total_enquiries ?? 0}</span>

            {stats && stats.new_enquiries > 0 && (

              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">

                {stats.new_enquiries} New

              </span>

            )}

          </div>

          <Link

            to="/admin/enquiries"

            className="inline-flex items-center gap-1 text-xs font-bold text-[#0C4DA2] hover:underline"

          >

            <span>Triage enquiries</span>

            <ArrowRight className="h-3 w-3" />

          </Link>

        </div>



        {/* Contact Messages Card */}

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">

          <div className="flex items-center justify-between">

            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Messages</span>

            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">

              <Mail className="h-4 w-4" />

            </div>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-3xl font-extrabold text-[#082046]">{stats?.total_messages ?? 0}</span>

            {stats && stats.new_messages > 0 && (

              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">

                {stats.new_messages} New

              </span>

            )}

          </div>

          <Link

            to="/admin/messages"

            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"

          >

            <span>Review inbox</span>

            <ArrowRight className="h-3 w-3" />

          </Link>

        </div>



        {/* Programmes Card */}

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">

          <div className="flex items-center justify-between">

            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Programmes Active</span>

            <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">

              <BookOpen className="h-4 w-4" />

            </div>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-3xl font-extrabold text-[#082046]">{stats?.active_programmes ?? 0}</span>

            <span className="text-xs text-slate-500">of {stats?.total_programmes ?? 0} listed</span>

          </div>

          <Link

            to="/admin/programmes"

            className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:underline"

          >

            <span>Manage programmes</span>

            <ArrowRight className="h-3 w-3" />

          </Link>

        </div>



        {/* News & Events Card */}

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">

          <div className="flex items-center justify-between">

            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">News &amp; Circulars</span>

            <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">

              <Newspaper className="h-4 w-4" />

            </div>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-3xl font-extrabold text-[#082046]">{stats?.published_news ?? 0}</span>

            <span className="text-xs text-slate-500">published ({stats?.total_news ?? 0} total)</span>

          </div>

          <Link

            to="/admin/news"

            className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:underline"

          >

            <span>Publish circular</span>

            <ArrowRight className="h-3 w-3" />

          </Link>

        </div>

      </div>



      {/* Two Column Layout: Recent Enquiries & Recent Messages */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Recent Admissions Enquiries */}

        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">

          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">

            <div className="flex items-center gap-2">

              <GraduationCap className="h-4 w-4 text-[#082046]" />

              <h2 className="font-bold text-sm text-[#082046]">Latest Admissions Enquiries</h2>

            </div>

            <Link to="/admin/enquiries" className="text-xs font-bold text-[#0C4DA2] hover:underline">

              View All ({stats?.total_enquiries ?? 0})

            </Link>

          </div>



          <div className="divide-y divide-slate-100">

            {recentEnquiries.length === 0 ? (

              <div className="p-8 text-center text-xs text-slate-400">No admissions enquiries recorded yet.</div>

            ) : (

              recentEnquiries.map((enq) => (

                <div key={enq.id} className="p-4 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-3">

                  <div className="space-y-1">

                    <div className="flex items-center gap-2">

                      <span className="font-bold text-xs text-slate-800">{enq.applicant_name}</span>

                      <span

                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${

                          enq.status === 'New'

                            ? 'bg-amber-100 text-amber-800'

                            : enq.status === 'Contacted'

                            ? 'bg-blue-100 text-blue-800'

                            : 'bg-slate-100 text-slate-700'

                        }`}

                      >

                        {enq.status}

                      </span>

                    </div>

                    <div className="text-[11px] text-slate-500">

                      {enq.programme_name || 'General Admission'} • {enq.phone}

                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1 italic">"{enq.message}"</p>

                  </div>

                  <Link

                    to={`/admin/enquiries?id=${enq.id}`}

                    className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 shrink-0"

                    title="View details"

                  >

                    <Eye className="h-4 w-4" />

                  </Link>

                </div>

              ))

            )}

          </div>

        </div>



        {/* Recent Contact Submissions */}

        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">

          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">

            <div className="flex items-center gap-2">

              <Mail className="h-4 w-4 text-[#082046]" />

              <h2 className="font-bold text-sm text-[#082046]">Latest Contact Submissions</h2>

            </div>

            <Link to="/admin/messages" className="text-xs font-bold text-[#0C4DA2] hover:underline">

              View All ({stats?.total_messages ?? 0})

            </Link>

          </div>



          <div className="divide-y divide-slate-100">

            {recentMessages.length === 0 ? (

              <div className="p-8 text-center text-xs text-slate-400">No contact messages received yet.</div>

            ) : (

              recentMessages.map((msg) => (

                <div key={msg.id} className="p-4 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-3">

                  <div className="space-y-1">

                    <div className="flex items-center gap-2">

                      <span className="font-bold text-xs text-slate-800">{msg.sender_name}</span>

                      <span

                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${

                          msg.status === 'New'

                            ? 'bg-emerald-100 text-emerald-800'

                            : 'bg-slate-100 text-slate-700'

                        }`}

                      >

                        {msg.status}

                      </span>

                    </div>

                    <div className="text-[11px] text-slate-500">

                      <strong>Subject:</strong> {msg.subject} • {msg.email}

                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1 italic">"{msg.message}"</p>

                  </div>

                  <Link

                    to={`/admin/messages?id=${msg.id}`}

                    className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 shrink-0"

                    title="View details"

                  >

                    <Eye className="h-4 w-4" />

                  </Link>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  )

}

