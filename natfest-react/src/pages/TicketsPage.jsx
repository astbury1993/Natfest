import useSanityQuery from '../hooks/useSanityQuery'
import styles from '../styles/TicketsPage.module.css'

const TICKETS_QUERY = `*[_type == "ticketsPage"][0]{
  heading,
  announcement,
  eventDate,
  eventTime,
  eventLocation,
  includes,
  pricing,
  socialLinks,
  notice
}`

function TicketsPage() {
  const { data, loading } = useSanityQuery(TICKETS_QUERY)

  if (loading) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    )
  }

  const heading = data?.heading || 'Natfest ticket sales announcement! 🎫'
  const announcement = data?.announcement || 'On sale Saturday 27th September for Natfest 2026'
  const eventDate = data?.eventDate || '27/06/26'
  const eventTime = data?.eventTime || '11:00 – 23:30'
  const eventLocation = data?.eventLocation || 'Sileby, Leicestershire'
  const includes = data?.includes || ['Live music', 'Food vendors', 'Licensed bar', 'Raffle', 'Face painting', 'Bouncy castles', 'Competitions']
  const pricing = data?.pricing || [
    { label: 'Adults', price: '£30' },
    { label: 'Children (5–16)', price: '£15' },
    { label: 'Under 5s', price: 'FREE' },
  ]
  const socialLinks = data?.socialLinks || [
    { platform: 'Instagram', url: 'https://www.instagram.com/Natfest2026' },
    { platform: 'Facebook', url: 'https://www.facebook.com/groups/936096755035843' },
  ]
  const notice = data?.notice || 'This is an invite-only event. No tickets available on the gate.'

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>{heading}</h1>

      <div className={styles.card}>
        <p className={styles.announcement}>{announcement}</p>

        <div className={styles.details}>
          <p><strong>Date:</strong> {eventDate}</p>
          <p><strong>Time:</strong> {eventTime}</p>
          <p><strong>Location:</strong> {eventLocation}</p>
        </div>

        <div className={styles.includes}>
          <h2>What&apos;s Included</h2>
          <ul className={styles.includesList}>
            {includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.pricing}>
          <h2>Pricing</h2>
          <ul className={styles.priceList}>
            {pricing.map((tier, i) => (
              <li key={i}>
                <span className={styles.priceLabel}>{tier.label}</span>
                <span className={styles.priceValue}>{tier.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.social}>
          <h2>Follow Us</h2>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>

        <p className={styles.notice}>{notice}</p>
      </div>
    </div>
  )
}

export default TicketsPage
