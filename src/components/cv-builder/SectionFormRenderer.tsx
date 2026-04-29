import type { CVData, PhotoFilterType, SectionVisibility } from '../../types/cv'
import type { TemplateId } from '../../types/templates'
import type { SectionId } from '../../config/cvSections'
import PersonalInfoForm from '../form/PersonalInfoForm'
import SkillsForm from '../form/SkillsForm'
import ExperienceForm from '../form/ExperienceForm'
import ProjectsForm from '../form/ProjectsForm'
import EducationForm from '../form/EducationForm'
import LanguagesForm from '../form/LanguagesForm'
import ExtrasForm from '../form/ExtrasForm'
import ColorPicker from '../form/ColorPicker'
import PhotoFilter from '../form/PhotoFilter'
import SectionVisibilityToggles from '../form/SectionVisibilityToggles'
import TemplatePicker from '../form/TemplatePicker'

interface Props {
  activeSection: SectionId | null
  cv: CVData
  update: <K extends keyof CVData>(key: K, value: CVData[K]) => void
  accentColor: string
  setAccentColor: (color: string) => void
  photoFilter: PhotoFilterType
  setPhotoFilter: (filter: PhotoFilterType) => void
  visibility: SectionVisibility
  onToggleVisibility: (key: keyof SectionVisibility) => void
  template: TemplateId
  setTemplate: (template: TemplateId) => void
}

export default function SectionFormRenderer({
  activeSection,
  cv,
  update,
  accentColor,
  setAccentColor,
  photoFilter,
  setPhotoFilter,
  visibility,
  onToggleVisibility,
  template,
  setTemplate,
}: Props) {
  switch (activeSection) {
    case 'style':
      return (
        <div className="space-y-4">
          <TemplatePicker value={template} onChange={setTemplate} accentColor={accentColor} />
          <ColorPicker value={accentColor} onChange={setAccentColor} />
          <PhotoFilter value={photoFilter} onChange={setPhotoFilter} accentColor={accentColor} />
          <SectionVisibilityToggles visibility={visibility} onToggle={onToggleVisibility} />
        </div>
      )
    case 'personal':
      return <PersonalInfoForm data={cv.personal} onChange={(d) => update('personal', d)} />
    case 'skills':
      return <SkillsForm data={cv.skillGroups} onChange={(d) => update('skillGroups', d)} />
    case 'experience':
      return <ExperienceForm data={cv.experience} onChange={(d) => update('experience', d)} />
    case 'projects':
      return <ProjectsForm data={cv.projects} onChange={(d) => update('projects', d)} />
    case 'education':
      return <EducationForm data={cv.education} onChange={(d) => update('education', d)} />
    case 'languages':
      return <LanguagesForm data={cv.languages} onChange={(d) => update('languages', d)} />
    case 'extras':
      return (
        <ExtrasForm
          certifications={cv.certifications}
          interests={cv.interests}
          onCertificationsChange={(d) => update('certifications', d)}
          onInterestsChange={(d) => update('interests', d)}
        />
      )
    default:
      return null
  }
}
