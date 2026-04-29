import { memo } from 'react'
import type { CVData, PhotoFilterType, SectionVisibility } from '../../../types/cv'
import type { DerivedColors } from '../../../utils/color'
import CVPhoto from '../CVPhoto'
import CVContactInfo from '../CVContactInfo'
import CVSkillsPreview from '../CVSkillsPreview'
import CVLanguagesPreview from '../CVLanguagesPreview'
import CVInterestsPreview from '../CVInterestsPreview'
import CVHeaderBanner from '../CVHeaderBanner'
import CVExperienceSection from '../CVExperienceSection'
import CVEducationSection from '../CVEducationSection'
import CVProjectsSection from '../CVProjectsSection'
import CVCertificationsSection from '../CVCertificationsSection'

interface Props {
  data: CVData
  photoFilter: PhotoFilterType
  colors: DerivedColors
  visibility: SectionVisibility
}

export default memo(function TwoColumnPreview({ data, photoFilter, colors, visibility }: Props) {
  const { personal, skillGroups, experience, projects, education, languages, certifications, interests } = data
  const { ACCENT, ACCENT_LIGHT, SIDEBAR_BG } = colors

  return (
    <>
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: '33%',
          backgroundColor: SIDEBAR_BG,
          padding: '0 20px 16px 20px',
          flexShrink: 0,
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '6px 0 0 6px',
        }}
      >
        <CVPhoto photo={personal.photo} accent={ACCENT} photoFilter={photoFilter} />
        {visibility.contact && <CVContactInfo personal={personal} accent={ACCENT} />}
        {visibility.skills && <CVSkillsPreview skillGroups={skillGroups} accent={ACCENT} />}
        {visibility.languages && <CVLanguagesPreview languages={languages} accent={ACCENT} accentLight={ACCENT_LIGHT} />}
        {visibility.interests && <CVInterestsPreview interests={interests} accent={ACCENT} />}
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', borderRadius: '0 6px 6px 0' }}>
        <CVHeaderBanner personal={personal} accent={ACCENT} showSummary={visibility.summary} />
        <div style={{ padding: '14px 24px 18px', flex: 1, overflow: 'hidden' }}>
          {visibility.experience && <CVExperienceSection experience={experience} accent={ACCENT} />}
          {visibility.education && <CVEducationSection education={education} accent={ACCENT} />}
          {visibility.projects && <CVProjectsSection projects={projects} accent={ACCENT} accentLight={ACCENT_LIGHT} />}
          {visibility.certifications && <CVCertificationsSection certifications={certifications} accent={ACCENT} />}
        </div>
      </div>
    </>
  )
})
