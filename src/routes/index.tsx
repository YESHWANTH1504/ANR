import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { BaseLayout } from '@/layouts/BaseLayout'
import { HomePage } from '@/pages/HomePage'
import { LoadingState } from '@/components/ui/LoadingState'

// Code-split secondary routes for optimized production bundle performance
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const AcademicsPage = lazy(() => import('@/pages/AcademicsPage').then((m) => ({ default: m.AcademicsPage })))
const DepartmentsPage = lazy(() => import('@/pages/DepartmentsPage').then((m) => ({ default: m.DepartmentsPage })))
const ProgrammesPage = lazy(() => import('@/pages/ProgrammesPage').then((m) => ({ default: m.ProgrammesPage })))
const ProgrammeDetailPage = lazy(() => import('@/pages/ProgrammeDetailPage').then((m) => ({ default: m.ProgrammeDetailPage })))
const AdmissionsPage = lazy(() => import('@/pages/AdmissionsPage').then((m) => ({ default: m.AdmissionsPage })))
const CampusLifePage = lazy(() => import('@/pages/CampusLifePage').then((m) => ({ default: m.CampusLifePage })))
const FacilitiesPage = lazy(() => import('@/pages/FacilitiesPage').then((m) => ({ default: m.FacilitiesPage })))
const PlacementsPage = lazy(() => import('@/pages/PlacementsPage').then((m) => ({ default: m.PlacementsPage })))
const NewsPage = lazy(() => import('@/pages/NewsPage').then((m) => ({ default: m.NewsPage })))
const GalleryPage = lazy(() => import('@/pages/GalleryPage').then((m) => ({ default: m.GalleryPage })))
const BlogPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const LeadershipPage = lazy(() => import('@/pages/LeadershipPage').then((m) => ({ default: m.LeadershipPage })))
const NewsDetailPage = lazy(() => import('@/pages/NewsDetailPage').then((m) => ({ default: m.NewsDetailPage })))
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))
const PlaceholderRoute = lazy(() => import('@/pages/PlaceholderRoute').then((m) => ({ default: m.PlaceholderRoute })))
const DesignSystemPage = lazy(() => import('@/pages/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage })))

// Protected Administrator Portal Routes
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })))
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })))
const AdminDashboardOverview = lazy(() => import('@/pages/admin/AdminDashboardOverview').then((m) => ({ default: m.AdminDashboardOverview })))
const AdminEnquiriesPage = lazy(() => import('@/pages/admin/AdminEnquiriesPage').then((m) => ({ default: m.AdminEnquiriesPage })))
const AdminMessagesPage = lazy(() => import('@/pages/admin/AdminMessagesPage').then((m) => ({ default: m.AdminMessagesPage })))
const AdminProgrammesPage = lazy(() => import('@/pages/admin/AdminProgrammesPage').then((m) => ({ default: m.AdminProgrammesPage })))
const AdminDepartmentsPage = lazy(() => import('@/pages/admin/AdminDepartmentsPage').then((m) => ({ default: m.AdminDepartmentsPage })))
const AdminNewsPage = lazy(() => import('@/pages/admin/AdminNewsPage').then((m) => ({ default: m.AdminNewsPage })))
const AdminGalleryPage = lazy(() => import('@/pages/admin/AdminGalleryPage').then((m) => ({ default: m.AdminGalleryPage })))
const AdminSettingsPage = lazy(() => import('@/pages/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })))

const RouteFallback: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center p-8">
    <LoadingState message="Loading collegiate content..." size="md" />
  </div>
)

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* All Application Routes Render Inside BaseLayout with Global Header */}
        <Route element={<BaseLayout />}>
          {/* Root Route: Phase 3 ANRCAS Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Dedicated Route for Phase 1 Design System Showcase & Component Explorer */}
          <Route path="/design-system" element={<DesignSystemPage />} />

          {/* Phase 4: About ANRCAS */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />

          {/* Phase 5: Academics & Academic Departments */}
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          {/* Phase 6: Programmes & Programme Detail Pages */}
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route path="/programmes/:slug" element={<ProgrammeDetailPage />} />
          {/* Phase 7: Admissions */}
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/admission" element={<AdmissionsPage />} />
          {/* Phase 8: Campus Life & Facilities */}
          <Route path="/campus-life" element={<CampusLifePage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route
            path="/committees"
            element={<PlaceholderRoute title="Committees & Governance" phaseNumber={4} />}
          />
          <Route path="/contact" element={<ContactPage />} />

          {/* Dedicated 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Administrator Portal Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardOverview />} />
          <Route path="dashboard" element={<AdminDashboardOverview />} />
          <Route path="enquiries" element={<AdminEnquiriesPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="programmes" element={<AdminProgrammesPage />} />
          <Route path="departments" element={<AdminDepartmentsPage />} />
          <Route path="news" element={<AdminNewsPage />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
