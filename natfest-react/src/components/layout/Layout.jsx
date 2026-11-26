import React from 'react'
import { Outlet } from 'react-router-dom'
import SkipLink from '../common/SkipLink'
import Header from './Header'
import Footer from './Footer'
import CountdownTimer from '../countdown/CountdownTimer'
import LineupBanner from '../banner/LineupBanner'
import SiteBanner from '../banner/SiteBanner'
import CookieBanner from '../cookie/CookieBanner'
import PageViewTracker from '../analytics/PageViewTracker'
import useSanityQuery from '../../hooks/useSanityQuery'

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{ eventDate, countdownLabel, bannerEnabled, bannerText, bannerEndDate, promoEyebrow, promoHeading, promoText, promoButtonLabel, promoButtonLink }`

function Layout() {
  const { data } = useSanityQuery(SITE_SETTINGS_QUERY)

  const countdownDate = data?.eventDate || null
  const countdownLabel = data?.countdownLabel || 'Natfest 2027'

  return (
    <>
      <PageViewTracker />
      <SkipLink />
      <SiteBanner
        enabled={data?.bannerEnabled}
        text={data?.bannerText}
        endDate={data?.bannerEndDate}
      />
      <Header />
      <div className="secondary-header">
        <CountdownTimer targetDate={countdownDate} label={countdownLabel} />
        {/* LineupBanner hidden until 2027 acts are added */}
        {/* <LineupBanner /> */}
      </div>
      <main id="main-content">
        {/* Site Settings shared with pages (e.g. HomePage promo card) */}
        <Outlet context={{ siteSettings: data }} />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}

export default Layout
