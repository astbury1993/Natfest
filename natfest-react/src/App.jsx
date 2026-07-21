import React, { lazy, Suspense, useMemo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/common/ErrorBoundary'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const LineupPage = lazy(() => import('./pages/LineupPage'))
const LineupYearPage = lazy(() => import('./pages/LineupYearPage'))
const VendorsPage = lazy(() => import('./pages/VendorsPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const TicketsPage = lazy(() => import('./pages/TicketsPage'))
const FaqsPage = lazy(() => import('./pages/FaqsPage'))
const PartnersPage = lazy(() => import('./pages/PartnersPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'))

function PageSuspense({ children }) {
  return (
    <Suspense fallback={<div className="page-loading">Loading...</div>}>
      {children}
    </Suspense>
  )
}

function App() {
  const router = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <ErrorBoundary><PageSuspense><HomePage /></PageSuspense></ErrorBoundary> },
        { path: 'about', element: <ErrorBoundary><PageSuspense><AboutPage /></PageSuspense></ErrorBoundary> },
        { path: 'lineup', element: <ErrorBoundary><PageSuspense><LineupPage /></PageSuspense></ErrorBoundary> },
        { path: 'lineup/:year', element: <ErrorBoundary><PageSuspense><LineupYearPage /></PageSuspense></ErrorBoundary> },
        { path: 'vendors', element: <ErrorBoundary><PageSuspense><VendorsPage /></PageSuspense></ErrorBoundary> },
        { path: 'gallery', element: <ErrorBoundary><PageSuspense><GalleryPage /></PageSuspense></ErrorBoundary> },
        { path: 'tickets', element: <ErrorBoundary><PageSuspense><TicketsPage /></PageSuspense></ErrorBoundary> },
        { path: 'faqs', element: <ErrorBoundary><PageSuspense><FaqsPage /></PageSuspense></ErrorBoundary> },
        { path: 'partners', element: <ErrorBoundary><PageSuspense><PartnersPage /></PageSuspense></ErrorBoundary> },
        { path: 'privacy', element: <ErrorBoundary><PageSuspense><PrivacyPolicyPage /></PageSuspense></ErrorBoundary> },
        { path: 'cookies', element: <ErrorBoundary><PageSuspense><CookiePolicyPage /></PageSuspense></ErrorBoundary> },
      ],
    },
  ]), [])

  return <RouterProvider router={router} />
}

export default App
