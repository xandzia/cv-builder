import { memo } from 'react'
import type { CVData, PhotoFilterType, SectionVisibility } from '../../../types/cv'
import type { DerivedColors } from '../../../utils/color'
import { TEXT_DARK, TEXT_MED, TEXT_LIGHT } from '../../../utils/color'
import { formatDate, toHref } from '../../../utils/format'
import { BulletList } from '../CVBulletList'

interface Props {
  data: CVData
  photoFilter: PhotoFilterType
  colors: DerivedColors
  visibility: SectionVisibility
}

function SectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h3 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: accent, margin: '0 0 6px', paddingBottom: '3px', borderBottom: `1px solid ${accent}25` }}>
      {children}
    </h3>
  )
}

export default memo(function MinimalPreview({ data, photoFilter, colors, visibility }: Props) {
  const { personal, skillGroups, experience, projects, education, languages, certifications, interests } = data
  const { ACCENT, ACCENT_LIGHT } = colors

  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', padding: '28px 32px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        {personal.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${ACCENT}` }}>
              <img
                src={personal.photo}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: photoFilter !== 'none' ? 'grayscale(1)' : 'none' }}
              />
            </div>
          </div>
        )}
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: ACCENT, margin: 0, letterSpacing: '-0.5px' }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '14px', color: TEXT_MED, margin: '2px 0 0' }}>
          {personal.jobTitle || 'Job Title'}
        </p>
        {visibility.contact && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '8px', fontSize: '10.5px', color: TEXT_LIGHT }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>·  {personal.phone}</span>}
            {personal.location && <span>·  {personal.location}</span>}
            {personal.linkedin && <a href={toHref(personal.linkedin)} style={{ color: ACCENT_LIGHT, textDecoration: 'none' }}>·  {personal.linkedin}</a>}
            {personal.github && <a href={toHref(personal.github)} style={{ color: ACCENT_LIGHT, textDecoration: 'none' }}>·  {personal.github}</a>}
          </div>
        )}
      </div>

      {/* Summary */}
      {visibility.summary && personal.summary && (
        <p style={{ fontSize: '11.5px', color: TEXT_MED, lineHeight: 1.5, margin: '0 0 14px', textAlign: 'center', maxWidth: '540px', marginLeft: 'auto', marginRight: 'auto' }}>
          {personal.summary}
        </p>
      )}

      {/* Skills */}
      {visibility.skills && skillGroups.some((g) => g.skills.length > 0) && (
        <div style={{ marginBottom: '14px' }}>
          <SectionTitle accent={ACCENT}>Skills</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {skillGroups.flatMap((g) => g.skills).map((skill, j) => (
              <span key={j} style={{ padding: '2.5px 7px', fontSize: '10px', backgroundColor: `${ACCENT}0A`, color: ACCENT, borderRadius: '3px', fontWeight: 500, border: `1px solid ${ACCENT}20` }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {visibility.experience && experience.some((e) => e.position || e.company) && (
        <div style={{ marginBottom: '14px' }}>
          <SectionTitle accent={ACCENT}>Experience</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {experience.map((item) => (item.position || item.company) && (
              <div key={item.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '12.5px', color: TEXT_DARK }}>{item.position}</span>
                    <span style={{ fontSize: '11.5px', color: TEXT_MED }}> — {item.company}{item.location && `, ${item.location}`}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: TEXT_LIGHT, whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                    {formatDate(item.startDate)}{(item.endDate || item.isCurrent) && ` - ${item.isCurrent ? 'Present' : formatDate(item.endDate)}`}
                  </span>
                </div>
                <BulletList accent={ACCENT} items={item.bullets} fontSize="11px" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {visibility.education && education.some((e) => e.degree || e.institution) && (
        <div style={{ marginBottom: '14px' }}>
          <SectionTitle accent={ACCENT}>Education</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {education.filter((e) => e.degree || e.institution).map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '12.5px', color: TEXT_DARK }}>{item.degree}</span>
                  <span style={{ fontSize: '11.5px', color: TEXT_MED }}> — {item.institution}</span>
                </div>
                <span style={{ fontSize: '10px', color: TEXT_LIGHT, fontStyle: 'italic' }}>
                  {item.startDate}{item.endDate && ` - ${item.endDate}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {visibility.projects && projects.some((p) => p.name) && (
        <div style={{ marginBottom: '14px' }}>
          <SectionTitle accent={ACCENT}>Projects</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {projects.map((item) => item.name && (
              <div key={item.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '12.5px', color: TEXT_DARK }}>{item.name}</span>
                    {item.techStack && <span style={{ color: TEXT_LIGHT, fontStyle: 'italic', fontSize: '10.5px' }}> — {item.techStack}</span>}
                  </div>
                  {item.link && <a href={toHref(item.link)} style={{ fontSize: '10px', color: ACCENT_LIGHT, textDecoration: 'none' }}>{item.link}</a>}
                </div>
                <BulletList accent={ACCENT} items={item.bullets} fontSize="11px" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom row */}
      <div style={{ display: 'flex', gap: '20px', marginTop: 'auto' }}>
        {visibility.certifications && certifications.filter(Boolean).length > 0 && (
          <div style={{ flex: 1 }}>
            <SectionTitle accent={ACCENT}>Certifications</SectionTitle>
            {certifications.filter(Boolean).map((cert, i) => (
              <div key={i} style={{ fontSize: '10.5px', color: TEXT_MED }}>{cert}</div>
            ))}
          </div>
        )}
        {visibility.languages && languages.some((l) => l.language) && (
          <div style={{ flex: 1 }}>
            <SectionTitle accent={ACCENT}>Languages</SectionTitle>
            {languages.map((l) => l.language && (
              <div key={l.id} style={{ fontSize: '10.5px' }}>
                <span style={{ fontWeight: 600, color: TEXT_DARK }}>{l.language}</span>
                {l.level && <span style={{ color: ACCENT_LIGHT, fontStyle: 'italic', marginLeft: '4px' }}>— {l.level}</span>}
              </div>
            ))}
          </div>
        )}
        {visibility.interests && interests.filter(Boolean).length > 0 && (
          <div style={{ flex: 1 }}>
            <SectionTitle accent={ACCENT}>Interests</SectionTitle>
            <div style={{ fontSize: '10.5px', color: TEXT_MED }}>{interests.filter(Boolean).join(' · ')}</div>
          </div>
        )}
      </div>
    </div>
  )
})
