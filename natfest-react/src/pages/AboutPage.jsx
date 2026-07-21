import React from 'react'
import useSanityQuery from '../hooks/useSanityQuery'
import LorosLetter from '../components/about/LorosLetter'
import TeamMember from '../components/about/TeamMember'
import styles from '../styles/AboutPage.module.css'

const TEAM_MEMBERS_QUERY = `*[_type == "teamMember"] | order(displayOrder asc) { _id, name, bio, "photoUrl": photo.asset->url, displayOrder }`
const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] { lorosLetterIntro, lorosLetterFull }`

function AboutPage() {
  const {
    data: teamMembers,
    loading: teamLoading,
    error: teamError,
  } = useSanityQuery(TEAM_MEMBERS_QUERY)

  const {
    data: siteSettings,
    loading: settingsLoading,
    error: settingsError,
  } = useSanityQuery(SITE_SETTINGS_QUERY)

  const isLoading = teamLoading || settingsLoading

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeading}>About Us</h1>

      {/* LOROS Letter Section */}
      <section className={styles.lorosSection}>
        {settingsLoading && (
          <p className={styles.loadingMessage}>Loading letter content...</p>
        )}

        {settingsError && !siteSettings && (
          <p className={styles.errorMessage}>
            The LOROS letter content could not be loaded. Please try again later.
          </p>
        )}

        {siteSettings && siteSettings.lorosLetterIntro && (
          <LorosLetter
            intro={siteSettings.lorosLetterIntro}
            fullContent={siteSettings.lorosLetterFull}
          />
        )}
      </section>

      {/* Team Members Section */}
      <section className={styles.teamSection}>
        <h2 className={styles.sectionHeading}>Meet the Team</h2>

        {teamLoading && (
          <p className={styles.loadingMessage}>Loading team members...</p>
        )}

        {teamError && !teamMembers && (
          <p className={styles.errorMessage}>
            Team member content could not be loaded. Please try again later.
          </p>
        )}

        {teamMembers && teamMembers.length > 0 && (
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <TeamMember
                key={member._id}
                name={member.name}
                bio={member.bio}
                photoUrl={member.photoUrl}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default AboutPage
