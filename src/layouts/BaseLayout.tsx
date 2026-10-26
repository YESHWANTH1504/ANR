import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import { FloatingCTABar } from '@/components/navigation/FloatingCTABar'

export const BaseLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-slate-800">
      {/* Global Academic Header & Navigation */}
      <Header />

      {/* Main Page Content Landmark */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>

      {/* SRMIST Style Fixed Side CTAs & Drawer */}
      <FloatingCTABar />

      {/* Global Academic Footer */}
      <Footer />
    </div>
  )
}

