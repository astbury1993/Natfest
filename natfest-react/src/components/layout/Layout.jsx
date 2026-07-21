import React from 'react'
import { Outlet } from 'react-router-dom'
import SkipLink from '../common/SkipLink'
import Header from './Header'
import Footer from './Footer'
import CountdownTimer from '../countdown/CountdownTimer'
import LineupBanner from '../banner/LineupBanner'
import CookieBanner from '../cookie/CookieBanner'
import PageViewTracker from '../analytics/PageViewTracker'
import { EVENT_DATE } from '../../lib/constants'

function Layout() {
  return (
    <>
      <PageViewTracker />
      <SkipLink />
      <Header />
      <div className="secondary-header">
        <CountdownTimer targetDate={EVENT_DATE} />
        {/* LineupBanner hidden until 2027 acts are added */}
        {/* <LineupBanner /> */}
      </div>
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}

export default Layout
