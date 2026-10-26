import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, AlertCircle, Loader2, ArrowLeft, Shield } from 'lucide-react'
import logoImg from '@/assets/logo.png'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { adminService } from '@/api/services/adminService'
import { COLLEGE_INFO } from '@/data/college'

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError('Please provide both administrator email and password.')
      return
    }

    setIsSubmitting(true)
    try {
      await adminService.login(email.trim(), password)
      navigate('/admin', { replace: true })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials or server unavailable.'
      setError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-[#0C4DA2]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-[#E4B316]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Site Link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to College Website</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <img
          src={logoImg}
          alt="ANRCAS Seal"
          className="mx-auto h-16 w-16 object-contain drop-shadow-md mb-3"
        />
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Administrative Portal
        </h1>
        <p className="mt-1 text-xs text-slate-400 font-medium">
          {COLLEGE_INFO.name} • Institutional Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-xl shadow-2xl border border-slate-200">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-[#082046] text-xs font-semibold mb-6">
            <Shield className="h-4 w-4 text-[#0C4DA2] shrink-0" />
            <span>Authorized Faculty &amp; Registry Personnel Only</span>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <Input
              id="admin-email"
              type="email"
              label="Administrator Email"
              placeholder="admin@anrcas.edu.in"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />

            <Input
              id="admin-password"
              type="password"
              label="Password"
              placeholder="••••••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                rightIcon={
                  isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-[#E4B316]" />
                  )
                }
                className="w-full bg-[#082046] hover:bg-[#0C4DA2] text-white font-bold cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? 'AUTHENTICATING...' : 'SIGN IN TO DASHBOARD'}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              For security reasons, administrator account registration is strictly managed via CLI bootstrap procedures.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
