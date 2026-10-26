import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  GraduationCap,
  Mail,
  BookOpen,
  Building2,
  Newspaper,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'
import logoImg from '@/assets/logo.png'
import { adminService } from '@/api/services/adminService'
import type { AdminUser } from '@/api/types'

export const AdminLayout: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(adminService.getCurrentUser())
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('anrcas_admin_token')
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }

    adminService
      .getMe()
      .then((user) => {
        setCurrentUser(user)
        setIsVerifying(false)
      })
      .catch(() => {
        adminService.logout()
        navigate('/admin/login', { replace: true })
      })
  }, [navigate])

  const handleLogout = async () => {
    await adminService.logout()
    navigate('/admin/login', { replace: true })
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Admissions Enquiries', href: '/admin/enquiries', icon: GraduationCap },
    { label: 'Contact Messages', href: '/admin/messages', icon: Mail },
    { label: 'Programmes', href: '/admin/programmes', icon: BookOpen },
    { label: 'Departments', href: '/admin/departments', icon: Building2 },
    { label: 'News & Events', href: '/admin/news', icon: Newspaper },
    { label: 'Campus Gallery', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ]

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <div className="text-sm font-semibold tracking-wider text-slate-300">Verifying Administrative Access...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Navbar */}
      <header className="lg:hidden bg-[#082046] text-white px-4 py-3 flex items-center justify-between border-b border-blue-900 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <img src={logoImg} alt="ANRCAS Seal" className="h-8 w-8 object-contain" />
          <div>
            <div className="font-serif font-bold text-sm leading-tight">ANRCAS Admin</div>
            <div className="text-[10px] text-amber-300 font-medium">Registry Portal</div>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white"
          aria-label="Toggle navigation"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#082046] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header Brand */}
          <div className="p-5 border-b border-blue-900/60 hidden lg:flex items-center gap-3">
            <img src={logoImg} alt="ANRCAS Seal" className="h-10 w-10 object-contain drop-shadow" />
            <div>
              <div className="font-serif font-bold text-base leading-tight text-white">ANRCAS Admin</div>
              <div className="text-[11px] font-bold text-amber-300 tracking-wider uppercase">Portal Management</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            {navItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? location.pathname === '/admin' || location.pathname === '/admin/dashboard'
                  : location.pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'bg-[#0C4DA2] text-white shadow-xs font-bold'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User Footer Profile & Action Controls */}
        <div className="p-4 border-t border-blue-900/60 space-y-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5 bg-black/20 rounded-lg text-xs">
            <div className="h-8 w-8 rounded-full bg-amber-400 text-[#082046] flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser?.name?.[0] || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-white truncate text-xs">{currentUser?.name || 'Administrator'}</div>
              <div className="text-[10px] text-slate-300 truncate">{currentUser?.email}</div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded bg-white/10 hover:bg-white/15 text-[11px] font-semibold text-slate-200"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded bg-red-950/60 hover:bg-red-900/80 text-[11px] font-semibold text-red-200 border border-red-800/40 cursor-pointer"
            >
              <LogOut className="h-3 w-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* Main Admin Content View */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
