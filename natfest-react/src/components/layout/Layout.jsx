import React from 'react'
import { Outlet } from 'react-router-dom'
import SkipLink from '../common/SkipLink'
import Header from './Header'
import Footer from './Footer'
import CountdownTimer from '../countdown/CountdownTimer'
import LineupBanner from '../banner/LineupBanner'
import CookieBanner from '../cookie/CookieBanner'
import PageViewTracker from '../analytics/PageViewTracker'
import useSanityQuery from '../../hooks/useSanityQuery'

const COUNTDOWN_QUERY = `*[_type == "siteSettings"][0]{ eventDate, countdownLabel }`

function Layout() {
  const { data } = useSanityQuery(COUNTDOWN_QUERY)

  const countdownDate = data?.eventDate || null
  const countdownLabel = data?.countdownLabel || 'Natfest 2027'

  return (
    <>
      <PageViewTracker />
      <SkipLink />
      <Header />
      <div className="secondary-header">
        <CountdownTimer targetDate={countdownDate} label={countdownLabel} />
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
