import {
  Palette,
  User,
  Code,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Globe,
  Award,
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { Translations } from '../i18n/types'

export type SectionId =
  | 'style'
  | 'personal'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'languages'
  | 'extras'

export interface SectionConfig {
  id: SectionId
  labelKey: keyof Translations
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
}

export const SECTIONS: SectionConfig[] = [
  { id: 'style', labelKey: 'section.style', icon: Palette },
  { id: 'personal', labelKey: 'section.personal', icon: User },
  { id: 'skills', labelKey: 'section.skills', icon: Code },
  { id: 'experience', labelKey: 'section.experience', icon: Briefcase },
  { id: 'projects', labelKey: 'section.projects', icon: FolderOpen },
  { id: 'education', labelKey: 'section.education', icon: GraduationCap },
  { id: 'languages', labelKey: 'section.languages', icon: Globe },
  { id: 'extras', labelKey: 'section.extras', icon: Award },
]
