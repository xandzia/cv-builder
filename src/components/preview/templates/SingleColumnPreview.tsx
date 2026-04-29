import { memo } from 'react'
import type { CVData, PhotoFilterType, SectionVisibility } from '../../../types/cv'
import type { DerivedColors } from '../../../utils/color'
import { TEXT_DARK, TEXT_MED, TEXT_LIGHT } from '../../../utils/color'
import { formatDate, toHref } from '../../../utils/format'
import { MainSectionTitle } from '../CVSectionTitle'
import { BulletList } from '../CVBulletList'

interface Props {
  data: CVData
  photoFilter: PhotoFilterType
  colors: DerivedColors
  visibility: SectionVisibility
}

export default memo(function SingleColumnPreview({ data, photoFilter, colors, visibility }: Props) {
  const { personal, skillGroups, experience, projects, education, languages, certifications, interests } = data
  const { ACCENT, ACCENT_LIGHT } = colors

  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
      {/* Header: Photo + Name + Contact inline */}
      <div style={{ display: 'flex', gap: '20px', padding: '20px 24px 14px', alignItems: 'center', borderBottom: `2px solid ${ACCENT}` }}>
        {personal.photo && (
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${ACCENT}`, flexShrink: 0 }}>
            <img
              src={personal.photo}
              alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                filter: photoFilter !== 'none' ? 'grayscale(1)' : 'none',
              }}
            />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: ACCENT, margin: 0 }}>
            {personal.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '14px', fontWeight: 500, color: TEXT_MED, margin: '2px 0 0' }}>
            {personal.jobTitle || 'Job Title'}
          </p>
          {visibility.contact && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px', fontSize: '11px', color: TEXT_LIGHT }}>
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
              {personal.linkedin && <a href={toHref(personal.linkedin)} style={{ color: ACCENT_LIGHT, textDecoration: 'none' }}>{personal.linkedin}</a>}
              {personal.github && <a href={toHref(personal.github)} style={{ color: ACCENT_LIGHT, textDecoration: 'none' }}>{personal.github}</a>}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '14px 24px 18px', flex: 1, overflow: 'hidden' }}>
        {/* Summary */}
        {visibility.summary && personal.summary && (
          <div style={{ marginBottom: '14px' }}>
            <MainSectionTitle accent={ACCENT}>Summary</MainSectionTitle>
            <p style={{ fontSize: '12px', color: TEXT_MED, lineHeight: 1.5, margin: 0 }}>{personal.summary}</p>
          </div>
        )}

        {/* Skills */}
        {visibility.skills && skillGroups.some((g) => g.skills.length > 0) && (
          <div style={{ marginBottom: '14px' }}>
            <MainSectionTitle accent={ACCENT}>Tech Stack</MainSectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skillGroups.flatMap((g) => g.skills).map((skill, j) => (
                <span key={j} style={{ display: 'inline-block', padding: '3px 7px', fontSize: '10.5px', backgroundColor: `${ACCENT}0F`, color: ACCENT, borderRadius: '3px', fontWeight: 500 }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {visibility.experience && experience.some((e) => e.position || e.company) && (
          <div style={{ marginBottom: '14px' }}>
            <MainSectionTitle accent={ACCENT}>Work Experience</MainSectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {experience.map((item) => (item.position || item.company) && (
                <div key={item.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '13px', color: TEXT_DARK }}>{item.position}</span>
                      <span style={{ fontSize: '12px', color: TEXT_MED }}> — {item.company}{item.location && `, ${item.location}`}</span>
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
        {visibility.education && (education.degree || education.institution) && (
          <div style={{ marginBottom: '14px' }}>
            <MainSectionTitle accent={ACCENT}>Education</MainSectionTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '13px', color: TEXT_DARK }}>{education.degree}</span>
                <span style={{ fontSize: '12px', color: TEXT_MED }}> — {education.institution}</span>
              </div>
              <span style={{ fontSize: '10px', color: TEXT_LIGHT, fontStyle: 'italic' }}>
                {education.startDate}{education.endDate && ` - ${education.endDate}`}
              </span>
            </div>
          </div>
        )}

        {/* Projects */}
        {visibility.projects && projects.some((p) => p.name) && (
          <div style={{ marginBottom: '14px' }}>
            <MainSectionTitle accent={ACCENT}>Projects</MainSectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {projects.map((item) => item.name && (
                <div key={item.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '13px', color: TEXT_DARK }}>{item.name}</span>
                      {item.techStack && <span style={{ color: TEXT_LIGHT, fontStyle: 'italic', fontSize: '11px' }}> — {item.techStack}</span>}
                    </div>
                    {item.link && <a href={toHref(item.link)} style={{ fontSize: '10px', color: ACCENT_LIGHT, textDecoration: 'none' }}>{item.link}</a>}
                  </div>
                  <BulletList accent={ACCENT} items={item.bullets} fontSize="11px" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom row: Certifications, Languages, Interests */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {visibility.certifications && certifications.filter(Boolean).length > 0 && (
            <div style={{ flex: 1 }}>
              <MainSectionTitle accent={ACCENT}>Certifications</MainSectionTitle>
              {certifications.filter(Boolean).map((cert, i) => (
                <div key={i} style={{ fontSize: '11px', color: TEXT_MED }}>{cert}</div>
              ))}
            </div>
          )}
          {visibility.languages && languages.some((l) => l.language) && (
            <div style={{ flex: 1 }}>
              <MainSectionTitle accent={ACCENT}>Languages</MainSectionTitle>
              {languages.map((l) => l.language && (
                <div key={l.id} style={{ fontSize: '11px' }}>
                  <span style={{ fontWeight: 600, color: TEXT_DARK }}>{l.language}</span>
                  {l.level && <span style={{ color: ACCENT_LIGHT, fontStyle: 'italic', marginLeft: '4px' }}>— {l.level}</span>}
                </div>
              ))}
            </div>
          )}
          {visibility.interests && interests.filter(Boolean).length > 0 && (
            <div style={{ flex: 1 }}>
              <MainSectionTitle accent={ACCENT}>Interests</MainSectionTitle>
              <div style={{ fontSize: '11px', color: TEXT_MED }}>{interests.filter(Boolean).join(' · ')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})
